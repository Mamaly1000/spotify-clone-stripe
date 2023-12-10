import { useSessionContext } from "@supabase/auth-helpers-react";
import { Song } from "@/types/song";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetSongById = (
  id?: string
): {
  isLoading: boolean;
  song: Song | undefined;
} => {
  const { supabaseClient } = useSessionContext();
  const [isLoading, setLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
        setLoading(false);
        return toast.error(error.message);
      }
      setSong(data as Song);
      setLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};
export default useGetSongById;
