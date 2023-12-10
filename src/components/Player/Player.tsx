"use client";
import { AppBar, Paper, Toolbar } from "@mui/material";
import React, { ReactNode } from "react";
import useGetSongById from "@/hooks/getSongById";
import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSongURL";
import PlayerContent from "./PlayerContent";
import { useUser } from "@/hooks/useUser";
const Player = ({ children }: { children: ReactNode }) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const { user } = useUser();
  const songURL = useLoadSong(song!);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    if (currentIndex + 1 === player.ids.length) {
      player.setId(player.ids[0]);
    } else {
      const nextIndex = player.ids[currentIndex + 1];
      player.setId(nextIndex);
    }
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    if (currentIndex === 0) {
      player.setId(player.ids[player.ids.length - 1]);
    } else {
      const previousIndex = player.ids[currentIndex - 1];
      player.setId(previousIndex);
    }
  };
  return (
    <AppBar position="fixed" color="secondary" sx={{ top: "auto", bottom: 0 }}>
      <Paper
        className="col-span-12 min-w-full text-text"
        sx={{ paddingBottom: 0, background: "rgba(0 0 0 /.4)" }}
      >
        {children}
      </Paper>
      {!!song && !!player.activeId && (
        <Toolbar sx={{ maxHeight: { xs: "50px", md: "50px" } }}>
          <PlayerContent
            song={song}
            songURL={songURL}
            user={user}
            key={songURL}
            onNext={onPlayNext}
            onPrev={onPlayPrevious}
          />
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Player;
