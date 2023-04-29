import { shortArtist } from "./artists.ts";

export interface album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  artists: shortArtist[];
}
