import { TopArtists } from "../types/artists.ts";
import { TopSongs } from "../types/songs.ts";
import { User } from "../types/user.ts";

export function getTopSongs(
  token: string,
  limit: number,
  offset: number,
  time_range: string,
): Promise<TopSongs> {
  return fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${time_range}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
}

export function getTopArtists(
  token: string,
  limit: number,
  offset: number,
  time_range: string,
): Promise<TopArtists> {
  return fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=${limit}&offset=${offset}&time_range=${time_range}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
}

export function getUserInfo(token: string): Promise<User> {
  return fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}
