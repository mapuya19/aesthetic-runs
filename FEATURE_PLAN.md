# Feature Plan: Route Segment Highlighting

## Overview
Highlight the specific segment of the route on the map that corresponds to the currently active step in the RouteStepper.

## Current State
- Steps are independent from waypoints in the database
- Map shows the full route with a single blue line
- RouteStepper tracks active step but doesn't communicate with MapView

## Required Changes

### 1. Database Schema
Add `waypoint_index` to steps table to associate each step with a waypoint:

```sql
ALTER TABLE steps ADD COLUMN waypoint_index INTEGER;
```

Update seed data to map steps to waypoints:
- Step 1 → Waypoint 0 (or use route origin if no waypoint)
- Step 2 → Waypoint 1
- Step 3 → Waypoint 2
- etc.

### 2. Type Updates

```typescript
// types/index.ts
export interface Step {
  label: string;
  description?: string;
  waypointIndex?: number; // New field
}
```

### 3. API Updates

```typescript
// lib/routes.ts
const transformRoute = (r: Record<string, unknown>): Route => ({
  // ... existing fields
  steps: ((r.steps as Record<string, unknown>[]) || [])
    .sort((a, b) => (a.order_num as number) - (b.order_num as number))
    .map((s) => ({
      label: s.label as string,
      description: (s.description as string | null) || undefined,
      waypointIndex: s.waypoint_index as number | undefined, // New
    })),
  // ...
});
```

### 4. Component Architecture

#### MapView Component
Add `activeStepIndex` prop:
- Highlight the segment from `waypoints[activeStepIndex-1]` to `waypoints[activeStepIndex]`
- For step 1: highlight from `originLat/originLng` to `waypoints[0]`
- For step N: highlight from `waypoints[N-2]` to `waypoints[N-1]`

Implementation:
```typescript
// Add a highlighted layer
const highlightedGeoJson = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'LineString' as const,
    coordinates: getHighlightedSegmentCoordinates(route, activeStepIndex),
  },
};

const highlightedLayerStyle = {
  id: 'highlighted-segment',
  type: 'line' as const,
  paint: {
    'line-color': '#22c55e', // Green for active segment
    'line-width': 8,
    'line-opacity': 1,
  },
};

// Dim the rest of the route
const dimmedLayerStyle = {
  id: 'route-line-dimmed',
  type: 'line' as const,
  paint: {
    'line-color': '#3b82f6',
    'line-width': 4,
    'line-opacity': 0.3, // Dimmed
  },
};
```

#### RouteStepper Component
Add `onStepChange` callback prop to communicate active step:
```typescript
interface RouteStepperProps {
  // ... existing props
  onStepChange?: (stepIndex: number) => void;
}
```

Call `onStepChange(activeStep)` whenever `activeStep` changes (use useEffect).

#### Map Page (app/map/[route]/page.tsx)
Add state for `activeStepIndex`:
```typescript
const [activeStepIndex, setActiveStepIndex] = useState(0);

<RouteStepper
  steps={route.steps}
  distance={route.distance}
  onComplete={handleRouteComplete}
  onStepChange={setActiveStepIndex}
/>

<MapView
  route={route}
  activeStepIndex={activeStepIndex}
/>
```

## Edge Cases to Handle

1. **Step 1**: Highlight from route origin to first waypoint (or skip if no waypoints)
2. **Last step**: Highlight from last waypoint to destination
3. **Route with no waypoints**: Just highlight origin to destination for active step
4. **More steps than waypoints**: Cycle through waypoints or cap at waypoints.length
5. **Step without waypoint association**: Fall back to calculating segment by distance

## Implementation Order

1. Add `waypoint_index` column to steps table (migration)
2. Update seed.sql with waypoint associations
3. Update types (Step interface)
4. Update transformRoute in lib/routes.ts
5. Update RouteStepper to accept and call onStepChange
6. Update MapView to accept activeStepIndex and render highlighted segment
7. Update map page to manage activeStepIndex state and pass to both components

## Benefits
- Users can see exactly which part of the route they're currently navigating
- Better visual connection between steps and map
- More immersive running experience

## Technical Notes
- Use useEffect in MapView to re-highlight when activeStepIndex changes
- Consider adding flyTo() animation to pan map to active segment
- Could add a pulsing effect on the active segment marker
