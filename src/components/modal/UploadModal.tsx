"use client";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import useUploadModal from "@/hooks/useUploadModal";
import FormTemplate from "../form/FormTemplate";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CustomTextField from "../inputs/CustomTextField";
import FileInput from "../inputs/FileInput";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { gradientGenerator } from "@/utils/gradientGenerator";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import Loader from "../loader/Loader";
const UploadModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useUploadModal();
  const { register, reset, handleSubmit, formState, getValues, setValue } =
    useForm<FieldValues>({
      defaultValues: {
        singer: "",
        title: "",
        song: null,
        image: null,
      },
    });
  const handler = (open?: boolean) => {
    if (!!!open) {
      reset();
      onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("missing fields!");
        return;
      }
      const uniqID = uniqid();
      // upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setLoading(false);
        toast.error("failed to upload the song!");
        console.log(songError);
        return;
      }
      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setLoading(false);
        toast.error("failed to upload the image!");
        console.log(imageError);
        return;
      }
      // create a record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          title: values.title,
          user_id: user.id,
          color_theme: gradientGenerator(),
          singer: values.singer,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setLoading(false);
        toast.error(supabaseError.message);
        console.log(supabaseError);
        return;
      }
      // if everything went good
      toast.success("song added successfuly!");
      router.refresh();
      setLoading(false);
      reset();
      onClose();
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      open={isOpen}
      setOpen={handler}
      dialog={{ title: "Upload your song" }}
    >
      {isLoading ? (
        <Loader message="uploading the song" />
      ) : (
        <FormTemplate
          onSubmit={handleSubmit(onSubmit)}
          onReset={reset}
          actions={{
            reset: {
              disabled: isLoading,
              label: "reset form",
              onClick: reset,
            },
            submit: {
              disabled: isLoading,
              label: "upload song",
            },
          }}
        >
          <CustomTextField
            register={register}
            label="singer name"
            name="singer"
            disabled={isLoading}
            type="text"
            onchange={(e) => {
              setValue("singer", e.target.value);
            }}
          />
          <CustomTextField
            register={register}
            label="song title"
            name="title"
            disabled={isLoading}
            type="text"
            onchange={(e) => {
              setValue("title", e.target.value);
            }}
          />
          <FileInput
            accept=".mp3"
            name="song"
            register={register}
            label="song"
            disabled={isLoading}
          />
          <FileInput
            accept="image/*"
            name="image"
            register={register}
            label="cover image"
            disabled={isLoading}
          />
        </FormTemplate>
      )}
    </CustomModal>
  );
};

export default UploadModal;
