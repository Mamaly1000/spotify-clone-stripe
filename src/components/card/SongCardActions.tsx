import { Song } from "@/types/song";
import React from "react";
import CustomButton from "../inputs/Button";
import { PlayArrow } from "@mui/icons-material";
import { twMerge } from "tailwind-merge";
import LikeButton from "../inputs/LikeButton";
const SongCardActions = ({
  song,
  className,
  onClick,
}: {
  onClick: () => void;
  className?: string;
  song?: Song | null;
}) => {
  return (
    <div
      className={twMerge(
        `z-20 group-hover:translate-y-0 translate-y-[100px] group-hover:opacity-100 opacity-0 absolute top-2 end-0  min-w-fit gap-2 flex items-start justify-start flex-wrap px-2  `,
        className
      )}
    >
      <CustomButton onClick={onClick} buttonType="icon">
        <PlayArrow />
      </CustomButton>
      <LikeButton className="" song={song} />
    </div>
  );
};

export default SongCardActions;
