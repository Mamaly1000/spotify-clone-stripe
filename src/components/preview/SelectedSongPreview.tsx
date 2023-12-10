"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import liked from "@/assets/liked.png";
import MediaControlCard from "./MusicNavigation";
import LikeButton from "../inputs/LikeButton";
import MainListItem from "../inputs/MainListItem";
import { useRouter } from "next/navigation";
import cover from "@/assets/cover.jpg";
import SongsReviewList from "../list/SongsReviewList";
import { MainPic } from "@/assets/pics";
import OrbitFont from "@/fonts/orbit";
import { FamilyRestroom, LocationCity, Snowshoeing } from "@mui/icons-material";
const SelectedSongPreview = () => {
  const router = useRouter();
  const time = new Date().getHours();
  const times = [
    { active: time >= 0 && time <= 12, label: "good morning" },
    { active: time > 12 && time <= 18, label: "good afternoon" },
    { active: time > 18 && time <= 24, label: "good night" },
  ];

  return (
    <Box
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        minHeight: { xs: "400px", md: "500px" },
        maxHeight: { md: "500px" },

        position: "relative",
        padding: { xs: 1, md: 5 },
        overflowY: { xs: "hidden", md: "hidden" },
        overflowX: "hidden",
        gap: 5,
      }}
    >
      <div className=" absolute aspect-video min-w-full  min-h-[500px] max-h-[500px] md:max-h-none object-contain z-0 bottom-[-10%] start-0 opacity-80 overflow-hidden drop-shadow-2xl">
        <Image
          src={MainPic.src}
          alt={"cover image"}
          fill
          className="drop-shadow-2xl rounded-lg z-0  "
        />
      </div>
      <h1
        className="font-bold capitalize min-w-full text-text text-start text-[4rem] relative z-10 font-orbit"
        style={{
          ...OrbitFont.style,
          textShadow: "0 0 10px var(--text-color)",
        }}
      >
        {times.find((t) => t.active === true)?.label}
      </h1>
      <div className="min-w-full flex flex-wrap items-center justify-start gap-3 relative z-10">
        <MainListItem
          icon={liked.src}
          label="liked songs"
          onclick={() => router.push("/likedsongs")}
          href="/likedsongs"
        />{" "}
        <MainListItem
          icon={liked.src}
          label="newest songs"
          onclick={() => router.push("/newest-songs")}
          href="/newest-songs"
        />
      </div>
      <div className="min-w-full max-w-full overflow-hidden min-h-[300px] hidden md:flex items-center md:items-start justify-center md:justify-start  gap-3 flex-col relative z-0 ">
        <MediaControlCard
          displayLike
          displayInfo
          displayFollowing
          info={[
            {
              title: "singer",
              value: "eminem",
              icon: <Snowshoeing />,
            },
            {
              title: "song",
              value: "killshot",
              icon: <FamilyRestroom />,
            },
            {
              title: "nation",
              value: "america",
              icon: <LocationCity />,
            },
          ]}
        />
      </div>{" "}
    </Box>
  );
};

export default SelectedSongPreview;
