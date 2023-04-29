import { generateRandomString, stringifyQuery } from "./utilities.ts";

const CLIENT_ID: string = Deno.env.get("CLIENT_ID")!;
const CLIENT_SECRET: string = Deno.env.get("CLIENT_SECRET")!;
const REDIRECT_URI: string = Deno.env.get("REDIRECT_URI")!;
const SCOPES: string = Deno.env.get("SCOPES")!; // user-top-read

export interface authCredentials {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export function getAuthURL(): Response {
  const state = generateRandomString(16);

  return Response.redirect(
    "https://accounts.spotify.com/authorize?" +
      stringifyQuery({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
        state: state,
      }),
  );
}

export function getAuthCredentials(code: string): Promise<authCredentials> {
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: stringifyQuery({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  })
    .then((response) => response.json());
}

// unused!
class spotifyClient {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REDIRECT_URI: string;
  SCOPES: string;
  credentials?: authCredentials;

  constructor(
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    REDIRECT_URI: string,
    SCOPES: string,
  ) {
    this.CLIENT_ID = CLIENT_ID;
    this.CLIENT_SECRET = CLIENT_SECRET;
    this.REDIRECT_URI = REDIRECT_URI;
    this.SCOPES = SCOPES;
  }

  /// Generates a URL to authenticate the client
  generateAuthURL(): Response {
    const state = generateRandomString(16);

    return Response.redirect(
      "https://accounts.spotify.com/authorize?" +
        stringifyQuery({
          response_type: "code",
          client_id: this.CLIENT_ID,
          scope: this.SCOPES,
          redirect_uri: this.REDIRECT_URI,
          state: state,
        }),
    );
  }

  /// Authenticates the client with the given code
  authenticate(code: string) {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
      body: stringifyQuery({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.credentials = data;
      });
  }
}
