'use client';

import { useRef, useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Source, Layer, MapRef } from 'react-map-gl/mapbox';
import type { Route } from '@/types';

interface PulsingMarkerProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  title?: string;
  children?: React.ReactNode;
}

function PulsingMarker({ color, size = 'md', onClick, title, children }: PulsingMarkerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div
      className={`relative cursor-pointer group ${sizeClasses[size]}`}
      onClick={onClick}
      title={title}
    >
      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
      <div
        className={`relative w-full h-full rounded-full border-4 border-white shadow-elevated transition-transform duration-300 group-hover:scale-125 group-hover:shadow-xl`}
        style={{ backgroundColor: color }}
      >
        {children}
      </div>
    </div>
  );
}

interface MapViewProps {
  route: Route;
  onMarkerClick?: (lat: number, lng: number) => void;
}

export default function MapView({ route, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<number[][] | null>(null);

  const centerLat = (route.originLat + route.destLat) / 2;
  const centerLng = (route.originLng + route.destLng) / 2;

  useEffect(() => {
    const fetchDirections = async () => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token) return;

      const coordinates = [
        [route.originLng, route.originLat],
        ...(route.waypoints || []).map((wp) => [wp.lng, wp.lat]),
        [route.destLng, route.destLat],
      ]
        .map((coord) => coord.join(','))
        .join(';');

      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}?geometries=geojson&access_token=${token}`,
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          setRouteGeometry(data.routes[0].geometry.coordinates);
        }
      } catch (error) {
        console.error('Failed to fetch directions:', error);
      }
    };

    fetchDirections();
  }, [route]);

  const geoJson = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates: routeGeometry || [
        [route.originLng, route.originLat],
        ...(route.waypoints || []).map((wp) => [wp.lng, wp.lat]),
        [route.destLng, route.destLat],
      ],
    },
  };

  const layerStyle = {
    id: 'route-line',
    type: 'line' as const,
    paint: {
      'line-color': '#6366f1',
      'line-width': 5,
      'line-opacity': 0.9,
      'line-blur': 0.5,
    },
  };

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: centerLng,
        latitude: centerLat,
        zoom: 13,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <NavigationControl position="top-right" />

      <Marker longitude={route.originLng} latitude={route.originLat} anchor="bottom">
        <PulsingMarker
          color="#10b981"
          size="lg"
          onClick={() => onMarkerClick?.(route.originLat, route.originLng)}
          title="Start"
        />
      </Marker>

      <Marker longitude={route.destLng} latitude={route.destLat} anchor="bottom">
        <PulsingMarker
          color="#ec4899"
          size="lg"
          onClick={() => onMarkerClick?.(route.destLat, route.destLng)}
          title="End"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </PulsingMarker>
      </Marker>

      {route.waypoints?.map((waypoint, index) => (
        <Marker key={index} longitude={waypoint.lng} latitude={waypoint.lat} anchor="bottom">
          <PulsingMarker
            color="#8b5cf6"
            size="sm"
            onClick={() => onMarkerClick?.(waypoint.lat, waypoint.lng)}
            title={`Waypoint ${index + 1}`}
          />
        </Marker>
      ))}

      <Source id="route-source" type="geojson" data={geoJson}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}
