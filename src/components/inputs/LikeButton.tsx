"use client";
import React, { useEffect } from "react";
import CustomButton from "./Button";
import { HeartBroken } from "@mui/icons-material";
import { Song } from "@/types/song";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
const LikeButton = ({
  className,
  song,
}: {
  song?: Song | null;
  className?: string;
}) => {
  const [Liked, setLiked] = React.useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const { onOpen } = useAuthModal();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", song?.id)
        .single();

      if (!error && data) {
        setLiked(true);
      }
    };

    if (user) fetchData();
  }, [song, supabaseClient, user?.id]);

  const likeHandler = async () => {
    if (!user) {
      toast.error("please login to your account!");
      onOpen();
    }
    if (user && song) {
      if (Liked) {
        const { error } = await supabaseClient
          .from("liked_songs")
          .delete()
          .eq("user_id", user?.id)
          .eq("song_id", song?.id);

        if (error) {
          console.log(error);
          toast.error(error.message);
        } else {
          toast.success("you disliked!");
          setLiked(false);
        }
      } else {
        const { error } = await supabaseClient.from("liked_songs").insert({
          song_id: song?.id,
          user_id: user?.id,
        });

        if (error) {
          console.log(error);
          toast.error(error.message);
        } else {
          setLiked(true);
          toast.success("thanks for your like!");
        }
      }
    }
    router.refresh();
  };
  return (
    <CustomButton onClick={likeHandler} buttonType="icon">
      {!Liked ? (
        <HeartBroken />
      ) : (
        <FavoriteIcon
          sx={{ fill: "var(--error-color)", stroke: "var(--error-color)" }}
        />
      )}
    </CustomButton>
  );
};

export default LikeButton;
