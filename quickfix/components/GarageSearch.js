import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


export default function GarageSearch({navigation}) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 7.8731, // Default to Sri Lanka center
    longitude: 80.7718,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedGarage, setSelectedGarage] = useState(null);
  const mapRef = useRef(null);


  const garages = [
    {
      id: 1,
      name: 'Auto Repair Garage',
      owner: 'Sumith Perera',
      contact: '0705678312',
      openTime: '9:00 AM - 10:00 PM',
      latitude: 6.9271,
      longitude: 79.9612,
      rating: 4.5,
      image: require('../assets/garage.jpeg'),
      ownerImage: require('../assets/owner1.jpeg'),
    },
    {
      id: 2,
      name: 'Quickfix Garage',
      owner: 'R.T.Rathnayaka',
      contact: '0755678412',
      openTime: '8:00 AM - 9:00 PM',
      latitude: 6.8345,
      longitude: 79.9538,
      rating: 4.0,
      image: require('../assets/spare-parts.jpeg'),
      ownerImage: require('../assets/owner2.jpg'),
    },
    {
      id: 3,
      name: 'QuickFix Auto Service',
      owner: 'L.L.T.Perera',
      contact: '0725678413',
      openTime: '10:00 AM - 10:00 PM',
      latitude: 6.9123,
      longitude: 79.9337,
      rating: 4.7,
      image: require('../assets/banner.jpg'),
      ownerImage: require('../assets/owner1.jpeg'),
    },
    {
      id: 4,
      name: 'Auto Heaven',
      owner: 'Saman Silva',
      contact: '0755678445',
      openTime: '10:00 AM - 11:00 PM',
      latitude: 6.9421,
      longitude: 79.9337,
      rating: 4.7,
      image: require('../assets/garage2.jpg'),
      ownerImage: require('../assets/owner4.jpg'),
    },
    {
      id: 5,
      name: 'Auto Care',
      owner: 'Kasun Pradeep',
      contact: '0745674445',
      openTime: '8:00 AM - 11:00 PM',
      latitude: 6.9623,
      longitude: 79.9385,
      rating: 4.7,
      image: require('../assets/garage1.jpeg'),
      ownerImage: require('../assets/owner5.jpeg'),
    },
    {
      id: 6,
      name: 'Car Repair Hub',
      owner: 'A.P.Samaraweera',
      contact: '0705674448',
      openTime: '9:00 AM - 11:00 PM',
      latitude: 6.9913,
      longitude: 80.0385,
      rating: 4.7,
      image: require('../assets/garage3.jpg'),
      ownerImage: require('../assets/owner6.png'),
    },
  ];

  // Get the user's current location
  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // Adjust the map to fit all the garage markers
  useEffect(() => {
    if (mapRef.current && garages.length > 0) {
      const coordinates = garages.map(garage => ({
        latitude: garage.latitude,
        longitude: garage.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [garages]);

  // Handle search result selection
  const handleSearchResult = (data, details = null) => {
    const garageName = data.description; // The name of the searched garage
    const matchedGarage = garages.find(
      garage => garage.name.toLowerCase() === garageName.toLowerCase(),
    );

    if (matchedGarage) {
      setSelectedGarage(matchedGarage);
      setRegion({
        latitude: matchedGarage.latitude,
        longitude: matchedGarage.longitude,
        latitudeDelta: 0.005, // Zoom in
        longitudeDelta: 0.005,
      });

      mapRef.current.animateToRegion(
        {
          latitude: matchedGarage.latitude,
          longitude: matchedGarage.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    }
  };

  const navigateToGarageDetails = () => {
    if (selectedGarage) {
      navigation.navigate('Details', {
        garage: selectedGarage,
      });
    }
  };

  // Function to highlight the selected garage on the map
  const highlightSelectedGarage = () => {
    if (selectedGarage) {
      setRegion({
        latitude: selectedGarage.latitude,
        longitude: selectedGarage.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      mapRef.current.animateToRegion(
        {
          latitude: selectedGarage.latitude,
          longitude: selectedGarage.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    }
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
        <Text style={styles.bannerText}>Search Nearby Garages</Text>
      </View>

      {/* Search input and button side by side */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for nearby garages"
          fetchDetails={true}
          onPress={handleSearchResult}
          query={{
            key: 'AIzaSyDsUxChPKhJURlI4ZEeadAadiC0xKeIHew',
            language: 'en',
            types: 'establishment',
            locationbias: 'country:lk',
          }}
          styles={{
            textInput: styles.searchInput,
            container: {flex: 1}, // Make it take available width
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={highlightSelectedGarage}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}>
        {garages.map(garage => (
          <Marker
            key={garage.id}
            coordinate={{
              latitude: garage.latitude,
              longitude: garage.longitude,
            }}
            title={garage.name}
            description={`Rating: ${garage.rating} ★`}
            pinColor={
              selectedGarage && selectedGarage.name === garage.name
                ? 'yellow'
                : 'red'
            } // Change pin color dynamically
            onPress={() => setSelectedGarage(garage)}
          />
        ))}

        {/* Marker for searched garage */}
        {selectedGarage && (
          <Marker
            coordinate={{
              latitude: selectedGarage.latitude,
              longitude: selectedGarage.longitude,
            }}
            title={selectedGarage.name}
            description={`Rating: ${selectedGarage.rating} ★`}
            pinColor="yellow" // Highlight the selected garage marker
          />
        )}
      </MapView>

      {/* Selected Garage Details */}
      {selectedGarage && (
        <View style={styles.garageDetails}>
          <Image source={selectedGarage.image} style={styles.garageImage} />
          <Text style={styles.garageTitle}>{selectedGarage.name}</Text>
          <Text style={styles.garageRating}>
            Rating: {selectedGarage.rating} ★
          </Text>

          {/* 'View More Details' Button */}
          <TouchableOpacity
            style={styles.selectButton}
            onPress={navigateToGarageDetails}>
            <Text style={styles.selectText}>Select</Text>
          </TouchableOpacity>

          {/* 'View Reviews' Button */}
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() =>
              navigation.navigate('HomeScreen', {garage: selectedGarage})
            }>
            <Text style={styles.selectText} >View Reviews</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -50,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    marginTop: -30,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#0073e6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
  garageDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  garageImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  garageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  garageRating: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  selectText: {
    color: '#fff',
  },
});
