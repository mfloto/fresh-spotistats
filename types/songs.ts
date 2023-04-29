import { Album } from "./album.ts";
import { ShortArtist } from "./artists.ts";

export interface Song {
  album: Album;
  artists: ShortArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  //external_ids: { isrc: string }; //This object might contain other ids, such as UPC, EAN, or ISRC.
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
  items: Song[];
}
