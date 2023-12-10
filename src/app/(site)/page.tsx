import { Box } from "@mui/material";
import CustomHeader from "./Header";
import SelectedSongPreview from "@/components/preview/SelectedSongPreview";
import CustomModal from "@/components/modal/CustomModal";
import getSongs from "@/actions/getSongs";
import SongsList from "@/components/list/SongsList";
export const revalidate = 0;
export default async function Home() {
  const songs = await getSongs();
  return (
    <main className="relative min-w-full max-w-full  flex flex-col bg-gradient-to-b from-primary to-secondary items-start justify-start  min-h-screen overflow-auto max-h-screen">
      <CustomHeader />
      <SelectedSongPreview />
      <SongsList songs={songs} />
    </main>
  );
}
