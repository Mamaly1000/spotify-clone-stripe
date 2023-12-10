import { Slider, Stack } from "@mui/material";
import React from "react";
import CustomButton from "../inputs/Button";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { PauseRounded, PlayArrow } from "@mui/icons-material";

const PlayerNavigation = ({
  onNext,
  onPrev,
  handlePlay,
  isPlaying,
}: {
  isPlaying: boolean;
  onNext: () => void;
  onPrev: () => void;
  handlePlay: () => void;
}) => {
  return (
    <Stack
      display="flex"
      alignItems={"center"}
      gap={2}
      justifyContent={"space-between"}
      flexDirection={"row"}
    >
      <CustomButton onClick={onPrev} buttonType="icon" aria-label="previous">
        <SkipPreviousIcon />
      </CustomButton>
      <CustomButton
        sx={{ background: "var(--primary-color) !important" }}
        buttonType="icon"
        color="primary"
        onClick={handlePlay}
      >
        {isPlaying ? (
          <PauseRounded />
        ) : (
          <PlayArrow color="primary" sx={{ fill: "#ffffff !important" }} />
        )}
      </CustomButton>
      <CustomButton onClick={onNext} buttonType="icon" aria-label="next">
        <SkipNextIcon />
      </CustomButton>
    </Stack>
  );
};

export default PlayerNavigation;
