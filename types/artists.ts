export interface TopArtists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: artist[];
}

export interface artist {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface shortArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
