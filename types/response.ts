import { TopArtists } from "./artists.ts";
import { TopSongs } from "./songs.ts";

interface response {
  user_name: string;
  top_songs: TopSongs[];
  top_artists: TopArtists[];
}
