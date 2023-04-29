import { getAuthURL } from "../helpers/auth.ts";

export function handler(): Response {
  return getAuthURL();
}
