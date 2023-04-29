import { PageProps } from "https://deno.land/x/fresh@1.1.5/server.ts";
import { ResponseStats } from "../routes/callback.tsx";
import { useState } from "https://esm.sh/preact@10.13.1/hooks";
import { TopSongs } from "../types/songs.ts";
import { TopArtists } from "../types/artists.ts";

export default function Home(props: PageProps<ResponseStats>) {
  const { user, top_songs, top_artists } = props.data;
  const [timeSpan, setTimeSpan] = useState("short");
  const [showArtists, setShowArtists] = useState(false);

  const getTopItemsByTimeSpan = (
    arr: TopSongs[] | TopArtists[],
    timeSpan: string,
  ) => {
    switch (timeSpan) {
      case "short":
        return arr[0];
      case "mid":
        return arr[1];
      case "long":
        return arr[2];
      default:
        return arr[0];
    }
  };

  const topSongs = getTopItemsByTimeSpan(top_songs, timeSpan) as TopSongs;
  const topArtists = getTopItemsByTimeSpan(top_artists, timeSpan) as TopArtists;

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white bg-black">
      <div className="mb-5">
        <h1 className="text-3xl font-bold mb-2 text-white">
          {user.display_name}'s Top Tracks and Artists
        </h1>
        <div className="flex justify-center">
          <button
            onClick={() => setTimeSpan("short")}
            className={`py-2 px-4 text-sm font-medium rounded-full mx-1 ${
              timeSpan === "short"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            short
          </button>
          <button
            onClick={() => setTimeSpan("mid")}
            className={`py-2 px-4 text-sm font-medium rounded-full mx-1 ${
              timeSpan === "mid"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            mid
          </button>
          <button
            onClick={() => setTimeSpan("long")}
            className={`py-2 px-4 text-sm font-medium rounded-full mx-1 ${
              timeSpan === "long"
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            long
          </button>
          <button
            onClick={() => setShowArtists(!showArtists)}
            className={`py-2 px-4 text-sm font-medium rounded-full mx-1 ${
              showArtists ? "bg-pink-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {showArtists ? "Artists" : "Tracks"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {showArtists
          ? (
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Top Artists</h2>
              {topArtists.items.map((artist) => (
                <div
                  key={artist.id}
                  className="p-4 bg-gray-900 rounded-lg mb-4 flex items-center"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      className="mr-4"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-medium text-white">
                      <a href={artist.external_urls.spotify} target="_blank">
                        {artist.name}
                      </a>
                    </div>
                    <div className="text-gray-300 mb-2 text-white">
                      {artist.genres.join(", ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          : (
            <div>
              <h2 className="text-xl font-bold mb-2 text-white">Top Tracks</h2>
              {topSongs.items.map((song) => (
                <div
                  key={song.id}
                  className="p-4 bg-gray-900 rounded-lg mb-4 flex items-center"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={song.album.images[0].url}
                      alt={song.name}
                      className="mr-4"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-lg font-medium text-white">
                      <a href={song.external_urls.spotify} target="_blank">
                        {song.name}
                      </a>
                    </div>
                    <div className="text-gray-300 mb-2 text-white">
                      <a
                        href={song.artists[0].external_urls.spotify}
                        target="_blank"
                      >
                        {song.artists[0].name}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
