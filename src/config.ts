const API_BASE_URL_DEV = "http://localhost:8000";

export const AppConfig = {
  apiBaseUrl:
    (process.env.EXPO_PUBLIC_API_BASE_URL as string | undefined) ||
    API_BASE_URL_DEV,
  getUrl(path: string): string {
    const trimmed = path.startsWith("/") ? path.slice(1) : path;

    return `${this.apiBaseUrl}/${trimmed}`;
  },
};
