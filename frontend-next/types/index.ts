export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  result: {
    id: string;
    email: string;
    createdAt: string;
  };
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
  waypoints: Waypoint[];
  steps: Step[];
  createdAt: string;
  updatedAt: string;
}

export interface RoutesResponse {
  message: string;
  routes: Route[];
}

export interface RouteResponse {
  message: string;
  route: Route;
}
