import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types/song";
import { cookies } from "next/headers";

export const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: likedSongs, error: likedSongsError } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user.id)
    .order("created_at", { ascending: false });

  if (likedSongsError) {
    console.log(likedSongsError.message);
    return [];
  }
  if (!likedSongs) {
    return [];
  }
  return (likedSongs as any).map((data: { songs: any; }) => ({ ...data.songs })) || [];
};
