import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const centralParkRoute = await prisma.route.upsert({
    where: { slug: 'central-park' },
    update: {},
    create: {
      name: 'Central Park Run',
      slug: 'central-park',
      description:
        'A scenic 5-mile run through the iconic Central Park, featuring landmarks like Bethesda Fountain and the Reservoir.',
      distance: 5,
      originLat: 40.79939,
      originLng: -73.952404,
      destLat: 40.769055,
      destLng: -73.981686,
      waypoints: [
        { lat: 40.79765, lng: -73.956022 },
        { lat: 40.79508, lng: -73.959318 },
        { lat: 40.787578, lng: -73.962631 },
        { lat: 40.781274, lng: -73.962803 },
        { lat: 40.783029, lng: -73.974219 },
        { lat: 40.775945, lng: -73.970957 },
        { lat: 40.771785, lng: -73.974819 },
        { lat: 40.76873, lng: -73.974476 },
      ],
      steps: [
        {
          label: 'Start at Central Park North (110 St)',
          description: 'Head southeast on Central Park N toward Lenox Ave/Malcolm X Blvd',
        },
        {
          label: 'LANDMARK B: North Woods Loch Waterfall',
          description:
            'The Loch, known for its three waterfalls, is the long, narrow watercourse that flows through the Ravine in the North Woods',
        },
        { label: 'Turn right onto Malcolm X Blvd then take a slight left onto Loch Walking Path' },
        { label: 'Head southwest on Loch Walking Path' },
        {
          label: 'LANDMARK C: Glen Span Arch',
          description:
            'Glen Span Arch, carrying the West Drive across 102nd Street, serves as a gateway to the wooded and secluded Loch to the northeast',
        },
        { label: 'Continue to follow the Loch Walking Path and turn left onto Central Park West' },
        { label: 'Head southwest on Central Park West toward W 101st St' },
        { label: 'Turn left at W 96th St and then turn right onto Shuman Running Track' },
        {
          label: 'LANDMARK D: Jacqueline Kennedy Onassis Reservoir',
          description: 'Head west on Shuman Running Track',
        },
        { label: 'Turn right toward Bridle Path then immediately turn left onto the Bridle Path' },
        { label: 'Merge into 86th St Transverse and then turn right on 84th St' },
        { label: 'Continue south 84th St and turn right onto 5th Ave/Museum Mile' },
        {
          label: 'LANDMARK E: The Metropolitan Museum of Art',
          description: 'Head southwest on 5th Ave/Museum Mile toward E 82nd St',
        },
        { label: 'Turn left towards and onto Great Lawn Oval' },
        { label: 'Turn right at Bridle Path, then turn left onto Central Park West' },
        {
          label: 'LANDMARK F: American Museum of Natural History',
          description: 'Head southwest on Central Park West toward W 77th St',
        },
        { label: 'Turn left onto W 77th St, then turn right towards Oak Bridge' },
        { label: 'Turn right toward Bow Bridge and continue onto Bow Bridge' },
        { label: 'LANDMARK G: Bethesda Fountain', description: 'Head south toward The Mall' },
        { label: 'Turn right onto The Mall and follow on the Nell Singer Lilac Walk' },
        { label: 'LANDMARK H: Sheep Meadow' },
        { label: 'Head south on Nell Singer Lilac Walk and turn right toward Center Drive' },
        { label: 'Turn left onto Center Drive then turn left onto W 59th St/Central Park S' },
        { label: 'LANDMARK I: Wollman Rink' },
        { label: 'Head northwest on W 59th St/Central Park S then take the crosswalk' },
        { label: 'LANDMARK J: Columbus Circle' },
      ],
    },
  });

  const hudsonRiverRoute = await prisma.route.upsert({
    where: { slug: 'hudson-river' },
    update: {},
    create: {
      name: 'Hudson River Run',
      slug: 'hudson-river',
      description:
        'A pleasant 1-mile run along the Hudson River waterfront from Hudson Yards to Little Island.',
      distance: 1,
      originLat: 40.754459,
      originLng: -74.002129,
      destLat: 40.742104,
      destLng: -74.010025,
      waypoints: [{ lat: 40.748997, lng: -74.008566 }],
      steps: [
        {
          label: 'Start at Vessel, 20 Hudson Yards',
          description: 'Head northwest on Hudson Blvd and turn left onto 11th Ave',
        },
        { label: 'Walk down 11th Ave and turn right at W 23rd St' },
        { label: 'Cross the road, turn left and merge onto the Hudson River Walkway' },
        { label: 'LANDMARK B: Chelsea Piers' },
        {
          label:
            'Head south east alongside the Hudson River and then turn right upon Little Island entryway',
        },
        { label: 'LANDMARK C: Little Island' },
      ],
    },
  });

  const lincolnCenterRoute = await prisma.route.upsert({
    where: { slug: 'lincoln-center' },
    update: {},
    create: {
      name: 'Lincoln Center Run',
      slug: 'lincoln-center',
      description:
        'A cultural 2-mile run starting from Lincoln Center, exploring the Upper West Side.',
      distance: 2,
      originLat: 40.773261,
      originLng: -73.983197,
      destLat: 40.773261,
      destLng: -73.983197,
      waypoints: [{ lat: 40.773261, lng: -73.983197 }],
      steps: [
        { label: 'Start at Lincoln Center' },
        { label: 'Head north on Broadway' },
        { label: 'Turn left onto W 66th St' },
        { label: 'Run through Riverside Park' },
        { label: 'Head back south on Riverside Drive' },
        { label: 'Turn right onto W 62nd St' },
        { label: 'Return to Lincoln Center' },
      ],
    },
  });

  const statueOfLibertyRoute = await prisma.route.upsert({
    where: { slug: 'statue-of-liberty' },
    update: {},
    create: {
      name: 'Statue of Liberty View Run',
      slug: 'statue-of-liberty',
      description:
        'A 3-mile run along the Battery Park waterfront with views of the Statue of Liberty.',
      distance: 3,
      originLat: 40.703739,
      originLng: -74.017265,
      destLat: 40.703739,
      destLng: -74.017265,
      waypoints: [{ lat: 40.703739, lng: -74.017265 }],
      steps: [
        { label: 'Start at Battery Park' },
        { label: 'Run north along the Hudson River Greenway' },
        { label: 'Enjoy views of the Statue of Liberty' },
        { label: 'Continue to Pier 25' },
        { label: 'Turn around and head back south' },
        { label: 'Return to Battery Park' },
      ],
    },
  });

  console.log('Routes seeded successfully!');
  console.log({ centralParkRoute, hudsonRiverRoute, lincolnCenterRoute, statueOfLibertyRoute });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
