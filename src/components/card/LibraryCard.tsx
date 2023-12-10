import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/song";
import { Card, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import cover from "@/assets/cover.jpg";
import CustomButton from "../inputs/Button";
import { PlayArrow } from "@mui/icons-material";

const LibraryCard = ({
  song,
  onClick,
}: {
  onClick: () => void;
  song?: Song | null;
}) => {
  const imagePathname: string = !!song
    ? (useLoadImage(song) as string)
    : cover.src;
  return (
    <Card
      sx={{
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 2,
        background: "var(--secondary-color)",
        borderRadius: "5px",
        ":hover": {
          background: song?.color_theme,
        },
        cursor: "pointer",
        position: "relative",
      }}
      className="drop-shadow-2xl group"
    >
      <div className="relative aspect-video min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px]">
        <Image
          alt={song?.title || ""}
          src={imagePathname}
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-[120px] line-clamp-2 flex flex-col items-start justify-start gap-2 capitalize">
        <Typography
          className="text-[.9rem] font-bold font-orbit"
          component="h4"
        >
          {song?.title}
        </Typography>
        <Typography className="text-[.8rem] " component="h5">
          {song?.singer}
        </Typography>
      </div>
      <CustomButton
        className="group-hover:scale-100 scale-0 transition-all float-right absolute end-2"
        buttonType="icon"
        onClick={onClick}
      >
        <PlayArrow />
      </CustomButton>
    </Card>
  );
};

export default LibraryCard;
