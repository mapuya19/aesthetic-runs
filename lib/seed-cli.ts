import { supabase } from './supabase'

async function seedRoutes() {
  console.log('🌱 Seeding routes to Supabase...')

  try {
    // Delete existing routes (using delete all to clear everything)
    const { error: deleteError } = await supabase.from('routes').delete().neq('slug', '___')
    if (deleteError) {
      console.error('Error clearing routes:', deleteError)
    } else {
      console.log('✅ Cleared existing routes')
    }

    // Delete existing waypoints
    const { error: deleteWpError } = await supabase.from('waypoints').delete().neq('routeId', '___')
    if (deleteWpError) {
      console.error('Error clearing waypoints:', deleteWpError)
    } else {
      console.log('✅ Cleared existing waypoints')
    }

    // Define sample routes
    const sampleRoutes = [
      {
        slug: 'hudson-river',
        name: 'Hudson River',
        description: 'A scenic run along the Hudson River with stunning waterfront views',
        distance: 5.2,
        originLat: 40.7128,
        originLng: -74.0133,
        destLat: 40.7282,
        destLng: -74.0077,
      },
      {
        slug: 'midtown-east',
        name: 'Midtown East',
        description: 'Urban route through the heart of Midtown Manhattan',
        distance: 3.8,
        originLat: 40.7505,
        originLng: -73.9776,
        destLat: 40.7614,
        destLng: -73.9696,
      },
      {
        slug: 'central-park',
        name: 'Central Park',
        description: 'Iconic loop around the famous Central Park',
        distance: 6.1,
        originLat: 40.7829,
        originLng: -73.9654,
        destLat: 40.8008,
        destLng: -73.9493,
      },
    ]

    const routesWithWaypoints = [
      {
        route: 'hudson-river',
        waypoints: [
          { lat: 40.7128, lng: -74.0133 },
          { lat: 40.7256, lng: -74.0155 },
          { lat: 40.7282, lng: -74.0077 },
        ],
      },
      {
        route: 'midtown-east',
        waypoints: [
          { lat: 40.7505, lng: -73.9776 },
          { lat: 40.7559, lng: -73.9689 },
          { lat: 40.7614, lng: -73.9696 },
        ],
      },
      {
        route: 'central-park',
        waypoints: [
          { lat: 40.7829, lng: -73.9654 },
          { lat: 40.7918, lng: -73.9576 },
          { lat: 40.8008, lng: -73.9493 },
        ],
      },
    ]

    // Insert sample routes (using camelCase column names to match your existing schema)
    const { data: routesData, error: routesError } = await supabase
      .from('routes')
      .insert(sampleRoutes)
      .select()

    if (routesError) {
      console.error('❌ Error seeding routes:', routesError)
      throw routesError
    }

    console.log(`✅ Successfully seeded ${routesData.length} routes!`)

    // Insert waypoints for each route
    for (const routeWp of routesWithWaypoints) {
      const route = routesData.find((r) => r.slug === routeWp.route)
      if (!route) {
        console.error(`Route ${routeWp.route} not found`)
        continue
      }

      const { error: wpError } = await supabase
        .from('waypoints')
        .insert(
          routeWp.waypoints.map((wp) => ({
            route_id: route.id,
            lat: wp.lat,
            lng: wp.lng,
          }))
        )
        .select()

      if (wpError) {
        console.error(`❌ Error inserting waypoints for ${routeWp.route}:`, wpError)
      } else {
        console.log(`✅ Inserted ${routeWp.waypoints.length} waypoints for ${route.name}`)
      }
    }

    console.log('\n📋 Routes seeded:')
    routesData.forEach((route) => {
      console.log(`  - ${route.name} (${route.slug})`)
      console.log(`    ${route.description}`)
      console.log(`    Distance: ${route.distance} miles`)
      console.log(`    Origin: (${route.originLat}, ${route.originLng})`)
      console.log(`    Dest: (${route.destLat}, ${route.destLng})`)
    })
  } catch (error) {
    console.error('❌ Failed to seed routes:', error)
    throw error
  }
}

seedRoutes()
  .then(() => {
    console.log('\n🎉 Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  })
