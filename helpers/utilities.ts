export function generateRandomString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function stringifyQuery(obj: Record<string, string>): string {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join("&");
}
