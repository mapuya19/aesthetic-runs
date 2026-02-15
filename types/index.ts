export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Waypoint {
  lat: number;
  lng: number;
}

export interface Step {
  label: string;
  description?: string;
}

export interface Route {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  distance: number;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
  imageUrl?: string;
  waypoints: Waypoint[];
  steps: Step[];
  createdAt: string;
  updatedAt: string;
}
