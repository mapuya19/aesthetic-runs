'use client';

import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Source, Layer, MapRef } from 'react-map-gl/mapbox';
import type { Route } from '@/types';

interface MapViewProps {
  route: Route;
  onMarkerClick?: (lat: number, lng: number) => void;
}

export default function MapView({ route, onMarkerClick }: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<number[][] | null>(null);

  const centerLat = (route.originLat + route.destLat) / 2;
  const centerLng = (route.originLng + route.destLng) / 2;

  // Fetch directions from Mapbox Directions API
  useEffect(() => {
    const fetchDirections = async () => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token) return;

      // Build coordinates string: origin -> waypoints -> destination
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
      'line-color': '#3b82f6',
      'line-width': 4,
      'line-opacity': 0.8,
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
        <div
          className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onMarkerClick?.(route.originLat, route.originLng)}
          title="Start"
        />
      </Marker>

      <Marker longitude={route.destLng} latitude={route.destLat} anchor="bottom">
        <div
          className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => onMarkerClick?.(route.destLat, route.destLng)}
          title="End"
        />
      </Marker>

      {route.waypoints?.map((waypoint, index) => (
        <Marker key={index} longitude={waypoint.lng} latitude={waypoint.lat} anchor="bottom">
          <div
            className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
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
