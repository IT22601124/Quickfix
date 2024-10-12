import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function GarageDetails({navigation}) {
  const route = useRoute();
  const {garage} = route.params; // Receiving the selected garage from the previous screen
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  // Get the user's current location
  useEffect(() => {
    (async () => {
      try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          maximumAge: 10000, // Optional: Use cached location up to 10 seconds old
          timeout: 5000, // Optional: Timeout after 5 seconds if no location is found
        });

        setCurrentLocation(location.coords); // Set current location when available
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  // Fetch distance and duration using Google Distance Matrix API
  useEffect(() => {
    if (currentLocation) {
      const fetchDistanceAndTime = async () => {
        const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
        const destination = `${garage.latitude},${garage.longitude}`;
        const apiKey = 'AIzaSyDsUxChPKhJURlI4ZEeadAadiC0xKeIHew'; // Replace with your API key

        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`,
          );

          const data = response.data.rows[0].elements[0];
          setDistance(data.distance.text); // Distance in km or meters
          setDuration(data.duration.text); // Estimated travel time
        } catch (error) {
          console.error('Error fetching distance and time: ', error);
        }
      };

      fetchDistanceAndTime();
    }
  }, [currentLocation]);

  // Function to get directions
  const getDirections = () => {
    const {latitude, longitude} = garage;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../assets/profile-icon.jpeg')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Garage Selected{'\n'}Successfully!
        </Text>
      </View>

      {/* Garage Information */}
      <View style={styles.garageInfo}>
        <Text style={styles.garageName}>{garage.name}</Text>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Owner: </Text>
          <Text style={styles.detailValue}>
            {garage.owner ? garage.owner : 'N/A'}{' '}
            {/* Display N/A if no owner is available */}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Contact No: </Text>
          <Text style={styles.detailValue}>
            {garage.contact ? garage.contact : 'N/A'}{' '}
            {/* Display N/A if no contact is available */}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Open Time: </Text>
          <Text style={styles.detailValue}>
            {garage.openTime ? garage.openTime : 'N/A'}{' '}
            {/* Display N/A if no open time is available */}
          </Text>
        </View>

        {/* Display the distance and duration */}
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Distance: </Text>
          <Text style={styles.detailValue}>
            {distance ? distance : 'Calculating...'}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Estimated Time: </Text>
          <Text style={styles.detailValue}>
            {duration ? duration : 'Calculating...'}
          </Text>
        </View>

        {/* Garage Owner's Image */}
        <Image
          source={
            garage.ownerImage
              ? garage.ownerImage
              : require('../assets/owner1.jpeg')
          }
          style={styles.ownerImage}
        />
        {/* Get Directions Button */}
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={getDirections}>
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        region={{
          latitude: garage.latitude,
          longitude: garage.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{
            latitude: garage.latitude,
            longitude: garage.longitude,
          }}
          title={garage.name}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0073e6',
    padding: 15,
  },
  logo: {
    width: 75,
    height: 50,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  banner: {
    marginTop: 5,
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  bannerText: {
    position: 'absolute',
    top: '40%',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  garageInfo: {
    marginTop: 60,
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  garageName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailValue: {
    marginLeft: 10,
  },
  ownerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 10,
  },
  directionsButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  directionsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  map: {
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
});
