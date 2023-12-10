import { Song } from "@/types/song";
import { Box, Typography } from "@mui/material";
import React from "react";
import SongCard from "../card/SongCard";
import OrbitFont from "@/fonts/orbit";

const SongsList = ({ songs }: { songs?: Song[] | null }) => {
  return (
    <Box
      sx={{
        minWidth: "100%",
        padding: 5,
        display: "flex",
        alignItems: { xs: "center", md: "start" },
        justifyContent: { xs: "center", md: "start" },
        gap: 3,
        maxWidth: "100%",
        flexWrap: "wrap",
      }}
    >
      {songs?.map((song) => {
        return <SongCard songs={songs} key={song.id} song={song} />;
      })}
      {!!!songs ||
        (songs.length === 0 && (
          <Typography
            textTransform={"capitalize"}
            fontFamily={OrbitFont.style.fontFamily}
            fontSize={30}
            component="h1"
            minWidth={"100%"}
            textAlign={"center"}
          >
            unforunately there is no result here!
          </Typography>
        ))}
    </Box>
  );
};

export default SongsList;
