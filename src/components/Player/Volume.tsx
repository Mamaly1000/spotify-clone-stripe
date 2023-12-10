import * as React from "react"; 
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IconButton } from "@mui/material";

export default function Volume({
  value,
  onChange,
  toggleVolume,
}: {
  toggleVolume: () => void;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Stack minWidth={200} spacing={2} direction="row" alignItems="center">
      <IconButton onClick={toggleVolume}>
        <VolumeDown />
      </IconButton>
      <Slider
        aria-label="Volume"
        color="primary"
        value={value}
        onChange={(_e, val) => {
          onChange(typeof val === "object" ? (val[0] as number) : val);
        }}
        max={100}
        min={0}
        valueLabelDisplay={"auto"}
      />
      <VolumeUp />
    </Stack>
  );
}
