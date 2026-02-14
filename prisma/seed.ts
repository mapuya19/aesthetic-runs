import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const routes = [
    {
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
            'The Loch, known for its three waterfalls, is a long, narrow watercourse that flows through the Ravine in the North Woods',
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
    {
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
    {
      name: 'Midtown East Architecture Run',
      slug: 'midtown-east',
      description:
        'A 2-mile architectural tour of Midtown East, featuring Grand Central Terminal, St. Patrick Cathedral, MoMA, Radio City Music Hall, and Chrysler Building.',
      distance: 2,
      originLat: 40.753294,
      originLng: -73.977161,
      destLat: 40.752094,
      destLng: -73.975402,
      waypoints: [
        { lat: 40.759523, lng: -73.976239 },
        { lat: 40.762339, lng: -73.977354 },
        { lat: 40.761248, lng: -73.980097 },
        { lat: 40.753749, lng: -73.978702 },
      ],
      steps: [
        {
          label: 'Start at Grand Central Terminal',
          description: 'Grand Central Terminal is a commuter rail terminal in Midtown Manhattan',
        },
        { label: 'Head north on Vanderbilt Ave and turn left on 47th St' },
        {
          label: 'LANDMARK B: St. Patrick Cathedral',
          description: 'St. Patrick Cathedral is a Catholic cathedral in Midtown Manhattan',
        },
        { label: 'Head east on 47th St and turn right onto 5th Ave' },
        {
          label: 'LANDMARK C: MoMA',
          description: 'Founded in 1929, MoMA was the first museum devoted to the modern era',
        },
        { label: 'Head east along 52nd St and turn right on Madison Ave' },
        { label: 'Walk south down Madison Ave from 52nd St until 44th St' },
        {
          label: 'LANDMARK D: Radio City Music Hall',
          description:
            'Radio City Music Hall is within Rockefeller Center, nicknamed The Showplace of the Nation',
        },
        { label: 'Turn right on 51st St' },
        { label: 'Turn left on Avenue of the Americas' },
        {
          label: 'LANDMARK E: SUMMIT One Vanderbilt',
          description:
            'SUMMIT One Vanderbilt blends elements of art, technology, architecture, and thrill',
        },
        { label: 'Head east on 42nd St' },
        {
          label: 'LANDMARK F: Chrysler Building',
          description: 'The Chrysler Building is an Art Deco skyscraper in New York City',
        },
      ],
    },
    {
      name: 'Empire State Run',
      slug: 'empire-state',
      description:
        'A 2-mile run featuring iconic New York landmarks including Empire State Building and the Flatiron District.',
      distance: 2,
      originLat: 40.738164,
      originLng: -73.978216,
      destLat: 40.742213,
      destLng: -73.989588,
      waypoints: [
        { lat: 40.749226, lng: -73.981397 },
        { lat: 40.748817, lng: -73.985428 },
        { lat: 40.7466, lng: -73.994193 },
      ],
      steps: [
        { label: 'Start near 30th St and 6th Ave', description: 'Head east on 30th St' },
        { label: 'Continue to 5th Ave' },
        { label: 'LANDMARK B: Madison Square Park' },
        { label: 'Head north on 5th Ave' },
        { label: 'Turn right on 34th St' },
        {
          label: 'LANDMARK C: Empire State Building',
          description:
            'The Empire State Building is a 102-story Art Deco skyscraper in New York City',
        },
        { label: 'Continue on 34th St' },
        { label: 'Turn right on 3rd Ave' },
        { label: 'Head north on 3rd Ave' },
        { label: 'Turn right on 38th St' },
        { label: 'LANDMARK D: Bryant Park' },
        { label: 'Head west on 38th St' },
        { label: 'Turn left on 5th Ave' },
        { label: 'Head south on 5th Ave' },
        {
          label: 'LANDMARK E: Eataly NYC Flatiron',
          description: 'Eataly NYC is an Italian marketplace located near the Flatiron Building',
        },
      ],
    },
    {
      name: 'Lincoln Center Run',
      slug: 'lincoln-center',
      description:
        'A cultural 1-mile run starting from Columbus Circle, featuring Lincoln Center and Strawberry Fields in Central Park.',
      distance: 1,
      originLat: 40.768411,
      originLng: -73.981885,
      destLat: 40.775967,
      destLng: -73.97474,
      waypoints: [{ lat: 40.772692, lng: -73.983425 }],
      steps: [
        { label: 'Start at Columbus Circle', description: 'Head northwest on Broadway' },
        { label: 'Walk up Broadway and turn left on W 62nd St' },
        { label: 'Continue on 62nd St and turn right onto Lincoln Center Plaza' },
        {
          label: 'LANDMARK B: Lincoln Center',
          description:
            'Lincoln Center for the Performing Arts houses internationally renowned organizations including New York Philharmonic and Metropolitan Opera',
        },
        { label: 'Exit and head northeast on Lincoln Center Plaza and turn right on W 65th St' },
        { label: 'Enter Central Park where 65th St meets Central Park West' },
        { label: 'Continue taking a left along West Dr' },
        {
          label: 'LANDMARK C: Strawberry Fields',
          description:
            'Strawberry Fields is a 2.5-acre landscaped section in Central Park dedicated to the memory of John Lennon',
        },
      ],
    },
    {
      name: 'Statue of Liberty View Run',
      slug: 'statue-of-liberty',
      description:
        'A 5-mile run from Washington Square Park through Hudson River Park to the Battery, featuring views of the Statue of Liberty.',
      distance: 5,
      originLat: 40.730827,
      originLng: -73.997214,
      destLat: 40.731319,
      destLng: -73.995094,
      waypoints: [
        { lat: 40.721321, lng: -74.013074 },
        { lat: 40.70124, lng: -74.015272 },
        { lat: 40.703118, lng: -74.015339 },
      ],
      steps: [
        {
          label: 'Start at Washington Square Park',
          description: 'Head southwest on Sullivan St toward W 3rd St',
        },
        { label: 'Walk down Sullivan St and take a right onto Spring St' },
        {
          label:
            'Walk along Spring St, merge onto the Hudson River runway, and continue walking south',
        },
        {
          label: 'LANDMARK B: Pier 26',
          description:
            'Hudson River Park runs four miles along Manhattan west side attracting over 17 million visits each year',
        },
        {
          label:
            'Head south all the way down West St alongside the Hudson River to the bottom tip of Manhattan',
        },
        {
          label: 'LANDMARK C: Statue of Liberty View Point',
          description: 'Statue of Liberty View Point at Battery Park Underpass',
        },
        { label: 'Head northeast and into the park' },
        {
          label: 'LANDMARK D: The Battery',
          description:
            'The Battery is a 25-acre public park located at the southern tip of Manhattan facing New York Harbor',
        },
        { label: 'Head north all the way up Broadway and turn left on Waverly Place' },
        { label: 'Walk down Waverly place and turn right onto University Pl' },
        {
          label: 'LANDMARK E: NYU Weinstein Residence Hall',
          description: 'Weinstein Hall is a Freshman Dorm at NYU with a Chick-Fil-A in the lobby',
        },
      ],
    },
  ];

  console.log('Deleting existing routes...');
  await prisma.route.deleteMany({});

  console.log('Creating routes...');
  for (const route of routes) {
    await prisma.route.create({
      data: route,
    });
  }

  console.log(`\${routes.length} routes seeded successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
