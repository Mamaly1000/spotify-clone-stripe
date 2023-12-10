"use client";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Volume from "./Volume";
import { Song } from "@/types/song";
import { User } from "@supabase/auth-helpers-nextjs";
import LikeButton from "../inputs/LikeButton";
import useLoadImage from "@/hooks/useLoadImage";
import cover from "@/assets/cover.jpg";
import PlayerNavigation from "./PlayerNavigation";
import useSound from "use-sound";

const PlayerContent = ({
  song,
  songURL,
  user,
  onNext,
  onPrev,
}: {
  onPrev: () => void;
  onNext: () => void;
  song: Song;
  songURL: string;
  user: User | null;
}) => {
  const [volume, setVol] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const imageURL = useLoadImage(song);
  const [play, { pause, sound }] = useSound(songURL, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };
  const toggleVolume = () => {
    setVol(volume === 0 ? 1 : 0);
  };

  return (
    <Stack
      display="flex"
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={"row"}
      minWidth={"100%"}
    >
      <Stack
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"start"}
        gap={2}
      >
        <Avatar
          src={imageURL || cover.src}
          sx={{
            minWidth: 45,
            maxWidth: 45,
            minHeight: 45,
            maxHeight: 45,
            borderRadius: 1,
          }}
        />
        <Typography fontSize={15} component="h4">
          {song.title}
        </Typography>
        /{" "}
        <Typography fontSize={14} component="h5">
          {song.singer}
        </Typography>
        <LikeButton className="mr-2" song={song} />
      </Stack>
      <PlayerNavigation
        handlePlay={handlePlay}
        onNext={onNext}
        onPrev={onPrev}
        isPlaying={isPlaying}
      />
      <Volume
        toggleVolume={toggleVolume}
        value={volume}
        onChange={(vol) => setVol(vol)}
      />
    </Stack>
  );
};

export default PlayerContent;
