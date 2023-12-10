import { getLikedSongs } from "@/actions/getLikedSongs";
import React from "react";
import OrbitFont from "@/fonts/orbit";
import Image from "next/image";
import liked from "@/assets/liked.png";
import SongsList from "@/components/list/SongsList";
import LikedSongsList from "@/components/list/LikedSongsList";

export const revalidate = 0;

const LikedSongs = async () => {
  const songs = await getLikedSongs();

  return (
    <div className="relative min-w-full max-w-full   flex flex-col bg-gradient-to-b from-primary to-secondary items-start justify-start  min-h-screen overflow-auto max-h-screen ">
      <div className="min-w-full flex items-center justify-start gap-5 flex-col md:flex-row p-5">
        <div className="relative aspect-video min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]  rounded-lg drop-shadow-2xl ">
          <Image
            src={liked.src}
            alt="liked songs playlist"
            fill
            className="rounded-lg drop-shadow-2xl"
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start gap-1 capitalize">
          <span className="text-[1.2rem] font-bold">playlist</span>
          <h1
            style={{ ...OrbitFont.style, textShadow: "0 0 10px #ffffff" }}
            className="font-bold font-orbit capitalize text-[2.5rem]  "
          >
            Your Liked Songs
          </h1>
        </div>
      </div>
      <LikedSongsList songs={songs} />
    </div>
  );
};

export default LikedSongs;
