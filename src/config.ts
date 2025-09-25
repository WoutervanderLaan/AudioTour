// Centralized app configuration
// Prefer EXPO_PUBLIC_ env vars so they are available in the client bundle

export const AppConfig = {
  apiBaseUrl:
    (process.env.EXPO_PUBLIC_API_BASE_URL as string | undefined) ||
    "http://localhost:8000",
};

export function getApiUrl(path: string): string {
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${AppConfig.apiBaseUrl}/${trimmed}`;
}
