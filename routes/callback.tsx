import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import CleanURL from "../islands/clean_url.tsx";
import { authCredentials, getAuthCredentials } from "../helpers/auth.ts";
import { TopSongs } from "../types/songs.ts";
import {
  getTopArtists,
  getTopSongs,
  getUserInfo,
} from "../helpers/spotify_api.ts";
import { TopArtists } from "../types/artists.ts";
import { user } from "../types/user.ts";
import Home from "../islands/main.tsx";

export interface ResponseStats {
  user: user;
  top_songs: TopSongs[];
  top_artists: TopArtists[];
}

export const handler: Handlers<ResponseStats> = {
  async GET(req, ctx) {
    const { code, state } = req.url.split("?")[1].split("&").reduce(
      (acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );
    const credentials: authCredentials = await getAuthCredentials(code);

    const timeRanges = ["short_term", "medium_term", "long_term"];

    const topSongs = await Promise.all(
      timeRanges.map((term) =>
        getTopSongs(credentials.access_token, 20, 0, term)
      ),
    );

    const topArtists = await Promise.all(
      timeRanges.map((term) =>
        getTopArtists(credentials.access_token, 20, 0, term)
      ),
    );

    const user: user = await getUserInfo(credentials.access_token);

    const props: ResponseStats = {
      user,
      top_songs: topSongs,
      top_artists: topArtists,
    };

    return ctx.render(props);
  },
};

export default function Callback(props: PageProps<ResponseStats>) {
  return (
    <>
      <CleanURL />
      <Home {...props} />
    </>
  );
}
