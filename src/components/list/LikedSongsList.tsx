"use client";
import React, { useEffect } from "react";
import SongsList from "./SongsList";
import { Song } from "@/types/song";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";

const LikedSongsList = ({ songs }: { songs: Song[] }) => {
  const { isLoading, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  return !isLoading ? <SongsList songs={songs} /> : <Loader />;
};

export default LikedSongsList;
