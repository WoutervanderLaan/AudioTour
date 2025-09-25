import type { Coordinates } from "../hooks/useUserLocation";

export type MuseumLocation = {
  id: string;
  name: string;
  coords: Coordinates;
};

export const KNOWN_MUSEUMS: MuseumLocation[] = [
  {
    id: "demo-museum",
    name: "Demo Museum",
    coords: { latitude: 52.36, longitude: 4.8852 }, // Amsterdam demo
  },
];
