"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/song";
import { gradientGenerator } from "@/utils/gradientGenerator";
import { Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import cover from "@/assets/cover.jpg";
import OrbitFont from "@/fonts/orbit";
import { MusicNote } from "@mui/icons-material";
import SongCardActions from "./SongCardActions";
import useOnPlay from "@/hooks/useOnPlay";

const SongCard = ({ song, songs }: { songs?: Song[]; song: Song }) => {
  const imagePath = useLoadImage(song);
  const onPlay = useOnPlay(songs!);
  return (
    <Card
      sx={{
        width: "224px",
        height: "324px",
        borderRadius: "6px",
        background: "var(--secondary-color)",
        color: "inherit",
        padding: "20px",
        overflow: "hidden",
        ":hover": {
          background: song.color_theme,
          cursor: "pointer",
        },
      }}
      className="drop-shadow-2xl group"
    >
      <div className="mx-auto max-w-[182px] max-h-[182px] bg-transparent relative ">
        <div className=" max-w-[182px] max-h-[182px] rounded-lg overflow-hidden relative z-0 flex items-center justify-center">
          <Image
            src={imagePath || cover.src}
            alt={song.title}
            width={182}
            height={182}
            className="object-cover z-0"
          />
          <SongCardActions
            onClick={() => {
              if (song && songs) {
                onPlay(song);
              }
            }}
            song={song}
          />
        </div>
        <div
          className="absolute start-0 top-1 min-w-[20px] min-h-[120px] rounded-lg drop-shadow-2xl "
          style={{ background: song.color_theme || gradientGenerator() }}
        ></div>
        <div
          className="absolute bottom-0 start-0 min-w-full rounded-b-lg min-h-[20px]  z-10"
          style={{ background: song.color_theme || gradientGenerator() }}
        ></div>
      </div>
      <Typography
        component="h4"
        className="px-2 py-1 font-bold capitalize font-orbit text-[1.5rem] whitespace-nowrap line-clamp-1"
        style={OrbitFont.style}
      >
        {song.title}
      </Typography>
      <Typography
        component="h5"
        className="px-2 py-1 capitalize  text-[.9rem]  "
      >
        <MusicNote /> by : {song.singer}
      </Typography>
    </Card>
  );
};

export default SongCard;
