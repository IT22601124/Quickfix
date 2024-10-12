import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const DistanceMatrixComponent = () => {
  const [origin, setOrigin] = useState(null); // State to hold user's location
  const [travelTime, setTravelTime] = useState(null); // State to hold travel time
  const destination = { latitude: 7.0631, longitude: 80.0718 }; // Ending point
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDsUxChPKhJURlI4ZEeadAadiC0xKeIHew'; // Replace with your Google Maps API Key

  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationPermission();
  }, []);

  const getTravelTime = async () => {
    if (origin) {
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}`);
      const data = await response.json();
      if (data.routes.length > 0) {
        const duration = data.routes[0].legs[0].duration.text; // Get the travel time from the response
        setTravelTime(duration);
      }
    }
  };

  useEffect(() => {
    getTravelTime();
  }, [origin]); // Fetch travel time when the origin is set

  if (!origin) {
    // While waiting for the user's location to be fetched
    return <View style={styles.loading}><Text>Loading Map...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        showsUserLocation={true}
      >
        {/* Marker for origin (user's current location) */}
        <Marker
          coordinate={origin}
          title={"Origin"}
          description={"Your Location"}
        />

        {/* Marker for destination */}
        <Marker
          coordinate={destination}
          title={"Destination"}
          description={"Batepola"}
        />

        {/* MapViewDirections to draw route */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          mode="driving" // Specify driving mode
          strokeWidth={3}
          strokeColor="black"
          onError={(errorMessage) => console.log('GMaps Directions Error:', errorMessage)}
          onReady={(result) => {
            // Set travel time once the route is ready
            setTravelTime(result.durationText); // Optional: You can also set duration here
          }}
        />
      </MapView>
      
      {/* Display travel time and destination information at the bottom */}
      <View style={styles.infoContainer}>
        {travelTime && (
          <Text style={styles.travelTimeText}>
            Travel Time: {travelTime}
          </Text>
        )}
        <Text style={styles.destinationText}>
          Destination: Batepola
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
    marginTop: 50,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  travelTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationText: {
    fontSize: 14,
    color: 'gray',

    
  },
});

export default DistanceMatrixComponent;
