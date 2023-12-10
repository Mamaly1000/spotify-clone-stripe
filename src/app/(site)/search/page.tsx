import getSongsByTitle from "@/actions/getSongsByTitle";
import React, { FC } from "react";
import CustomHeader from "../Header";
import SongsList from "@/components/list/SongsList";
import OrbitFont from "@/fonts/orbit";
import SearchInput from "@/components/searchInput/SearchInput";
import getSongs from "@/actions/getSongs";

interface SearchPageProps {
  searchParams: {
    title?: string;
  };
}

const page: FC<SearchPageProps> = async ({ searchParams: { title } }) => {
  const searchedSongs = await getSongsByTitle(title);
  const allsongs = await getSongs();
  return (
    <main className="relative min-w-full max-w-full   flex flex-col bg-gradient-to-b from-primary to-secondary items-start justify-start  min-h-screen overflow-auto max-h-screen">
      <CustomHeader />
      <h1
        style={{ ...OrbitFont.style, textShadow: "0 0 10px #ffffff" }}
        className="px-10 pt-5 font-bold font-orbit capitalize text-[2.5rem]  "
      >
        search results
      </h1>
      <SearchInput />
      <SongsList songs={searchedSongs} />
      <h1
        style={{ ...OrbitFont.style, textShadow: "0 0 10px #ffffff" }}
        className="px-10 pt-5 font-bold font-orbit capitalize text-[2.5rem]  "
      >
        you may like
      </h1>
      <SongsList songs={allsongs} />
    </main>
  );
};

export default page;
