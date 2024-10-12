import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'; // Ensure axios is installed

const GOOGLE_MAPS_API_KEY = 'AIzaSyDsUxChPKhJURlI4ZEeadAadiC0xKeIHew'; // Replace with your actual Google Maps API Key

const Request = ({route, navigation}) => {
  const {
    name,
    contact,
    email,
    vehicle,
    price,
    latitude,
    longitude,
    ownerImage,
  } = route.params;

  const [userLocation, setUserLocation] = useState(null);
  const [timeToReach, setTimeToReach] = useState(null);
  const [garageAddress, setGarageAddress] = useState('');

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation.coords);

      // Fetch travel time using Google Distance Matrix API
      getTravelTime(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        latitude,
        longitude,
      );

      // Fetch the garage address using Geocoding API
      getGarageAddress(latitude, longitude);
    })();
  }, [latitude, longitude]);

  const getTravelTime = async (originLat, originLon, destLat, destLon) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originLat},${originLon}&destinations=${destLat},${destLon}&key=${GOOGLE_MAPS_API_KEY}`,
      );

      console.log('Distance Matrix API Response:', response.data); // Log the entire response

      if (
        response.data &&
        response.data.rows &&
        response.data.rows.length > 0
      ) {
        const elements = response.data.rows[0].elements[0];

        if (elements.status === 'OK' && elements.duration) {
          const duration = elements.duration.text;
          setTimeToReach(duration);
        } else {
          console.log('Duration not available or API status not OK');
          setTimeToReach('Not available');
        }
      } else {
        console.log('No rows found in response');
        setTimeToReach('Error: No data returned');
      }
    } catch (error) {
      console.log('Error fetching travel time:', error);
      setTimeToReach('Error in fetching time');
    }
  };

  const renderOwnerImage = () => {
    if (typeof ownerImage === 'string' && ownerImage.startsWith('http')) {
      return <Image source={{uri: ownerImage}} style={styles.ownerImage} />;
    } else {
      return <Image source={ownerImage} style={styles.ownerImage} />;
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.successText}>Request Successfully Accepted!</Text>

      <View style={styles.ownerContainer}>{renderOwnerImage()}</View>

      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{latitude: latitude, longitude: longitude}}
            title={name}
            description={vehicle}
          />
        </MapView>
      )}

      {timeToReach && (
        <Text style={styles.timeText}>
          Time to Reach the Pick-up location: {timeToReach}
        </Text>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Name: {name}</Text>
        <Text style={styles.detailText}>Contact No: {contact}</Text>
        <Text style={styles.detailText}>Email: {email}</Text>
        <Text style={styles.detailText}>Vehicle No: {vehicle}</Text>
        <Text style={styles.detailText}>Price: {price}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRate}
          onPress={() => navigation.navigate('Rate')}>
          <Text style={styles.buttonText}>Rate service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0073e6',
    textAlign: 'center',
  },
  ownerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ownerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4db8ff',
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonRate: {
    flex: 1,
    backgroundColor: '#0073e6',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Request;
