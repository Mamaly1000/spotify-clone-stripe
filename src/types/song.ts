export interface Song {
  id: string;
  user_id: string | null;
  color_theme: string | null;
  singer: string;
  title: string;
  song_path: string;
  image_path: string;
}
