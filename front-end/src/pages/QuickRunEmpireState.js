import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 40.756795, lng: -73.954298 },
      key: process.env.REACT_APP_GOOGLE_MAPS,
    };
  }

  render() {
    const apiIsLoaded = (map, maps) => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      //origin is set to NYU College of Dentistry, 345 E 24th St, New York, NY 10010
      const origin = { lat: 40.738164, lng: -73.978216 };

      //waypoint are set to multiple locations for the Empire State 2 mile run
      const waypt = [
        {
          //The Morgan Library & Museum, 225 Madison Ave, New York, NY 10016
          location: { lat: 40.749226, lng: -73.981397 },
          stopover: true,
        },
        {
          //Empire State Building, 20 W 34th St., New York, NY 10001
          location: { lat: 40.748817, lng: -73.985428 },
          stopover: true,
        },
        {
          //The Museum at FIT, 227 W 27th St, New York, NY 10001
          location: { lat: 40.746600, lng: -73.994193 },
          stopover: true,
        },
      ];

      //destination is set to to Eataly NYC Flatiron, 200 5th Ave, New York, NY 10010
      const destination = { lat: 40.742213, lng: -73.989588 };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypt,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };

    return (
      <div style={{ height: "93vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS,
          }}
          defaultCenter={{ lat: -3.745, lng: -38.523 }}
          defaultZoom={10}
          center={this.state.currentLocation}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        />
      </div>
    );
  }
}

export default GoogleMaps;