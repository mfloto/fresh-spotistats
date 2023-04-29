import { album } from "./album.ts";
import { shortArtist } from "./artists.ts";

export interface song {
  album: album;
  artists: shortArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  //external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface TopSongs {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: song[];
}
