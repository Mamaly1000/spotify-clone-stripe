import { Song } from "@/types/song";
import React from "react";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import toast from "react-hot-toast";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authmodal = useAuthModal();
  const subscriblemodal = useSubscribeModal();
  const { user, subscription } = useUser();
  const onPlay = (song: Song) => {
    if (!user) {
      toast.error("please login to your account");
      return authmodal.onOpen();
    }
    if (!subscription) {
      toast.error("You must have a premium account");
      return subscriblemodal.onOpen();
    }
    if (user && subscription) {
      player.setId(song.id);
      player.setIds(songs.map((song) => song.id));
    }
  };
  return onPlay;
};

export default useOnPlay;
