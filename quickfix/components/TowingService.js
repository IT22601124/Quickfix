import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function TowingService() {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 7.8731, // Default to Sri Lanka center
    longitude: 80.7718,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedGarage, setSelectedGarage] = useState(null);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [issue, setIssue] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const mapRef = useRef(null);
  const [garageAddress, setGarageAddress] = useState('');
  const navigation = useNavigation();
  const garages = [
    {
      id: 1,
      name: 'Sumith Perera',
      contact: '0705678312',
      email: 'sumith75@gmail.com',
      vehicle: 'LN-1234',
      price: '30$',
      latitude: 6.9271,
      longitude: 79.9612,
      rating: 4.5,
      ownerImage: require('../assets/owner1.jpeg'),
    },
    {
      id: 2,
      name: 'Sampath Silva',
      contact: '0725678312',
      email: 'sampath@gmail.com',
      vehicle: 'LH-1284',
      price: '50$',
      latitude: 6.8345,
      longitude: 79.9538,
      rating: 4.5,
      ownerImage: require('../assets/owner2.jpg'),
    },
    {
      id: 3,
      name: 'L.L.T.Perera',
      contact: '0755678413',
      email: 'perera455@gmail.com',
      vehicle: 'LN-3478',
      price: '40$',
      latitude: 6.9123,
      longitude: 79.9337,
      rating: 4.7,
      ownerImage: require('../assets/owner4.jpg'),
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

      // Fetch the address of the user's current location
      fetchAddress(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        'current',
      );
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

  // In the fetchAddress function, update the 'address' state
  const fetchAddress = async (latitude, longitude, type) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsUxChPKhJURlI4ZEeadAadiC0xKeIHew`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const fetchedAddress = data.results[0].formatted_address;
        if (type === 'current') {
          setCurrentLocation(fetchedAddress); // Update current location address
        } else if (type === 'garage') {
          setAddress(fetchedAddress); // Update 'address' state to display in UI
        }
      } else {
        if (type === 'current') {
          setCurrentLocation('Address not found');
        } else if (type === 'garage') {
          setAddress('Address not found');
        }
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      if (type === 'current') {
        setCurrentLocation('Error fetching address');
      } else if (type === 'garage') {
        setAddress('Error fetching address');
      }
    }
  };

  // When a garage is selected, fetch its address
  const handleGarageSelect = garage => {
    setSelectedGarage(garage);
    fetchAddress(garage.latitude, garage.longitude, 'garage');
    setRegion({
      latitude: garage.latitude,
      longitude: garage.longitude,
      latitudeDelta: 0.005, // Zoom in
      longitudeDelta: 0.005,
    });
  };

  // Handle search functionality
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery === '') {
      alert('Please enter a garage name to search.');
      return;
    }

    const foundGarage = garages.find(garage =>
      garage.name.toLowerCase().includes(trimmedQuery),
    );

    if (foundGarage) {
      handleGarageSelect(foundGarage); // Highlight and zoom into the selected garage
    } else {
      alert('Garage not found');
    }
  };

  const handleSendRequest = async () => {
    if (
      !vehicleType ||
      !currentLocation ||
      !destinationLocation ||
      !issue ||
      !contactInfo
    ) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.57.110:3001/api/towing',
        {
          vehicleType,
          currentLocation,
          destinationLocation,
          issue,
          contactInfo,
        },
      );

      // Check if the status is 200 or 201
      if (response.status === 200 || response.status === 201) {
        alert('Towing request sent successfully!');
        navigation.navigate('request', {
          name: selectedGarage.name,
          contact: selectedGarage.contact,
          email: selectedGarage.email,
          vehicle: selectedGarage.vehicle,
          price: selectedGarage.price,
          latitude: selectedGarage.latitude, // Pass garage latitude
          longitude: selectedGarage.longitude, // Pass garage longitude
          ownerImage: selectedGarage.ownerImage,
        });
      } else {
        console.error('Unexpected response status:', response);
        alert('Error sending request. Please try again.');
      }
    } catch (error) {
      console.error('Axios error:', error);
      alert('Error sending request. Please check your network connection.');
    }
  };

  return (
    <ScrollView>
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

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Request Towing Service</Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search here..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* MapView */}
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
              onPress={() => handleGarageSelect(garage)}
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

        {/* Address */}
        {selectedGarage && (
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>Address: {address}</Text>
          </View>
        )}

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Type"
            value={vehicleType}
            onChangeText={setVehicleType} // Update state
          />
          <TextInput
            style={styles.input}
            placeholder="Current Location"
            value={currentLocation} // Automatically filled with live location
            editable={false} // Prevent changes to current location field
          />

          <TextInput
            style={styles.input}
            placeholder="Destination Location"
            value={destinationLocation}
            onChangeText={setDestinationLocation} // Update state
          />
          <TextInput
            style={styles.input}
            placeholder="Issue"
            value={issue}
            onChangeText={setIssue} // Update state
          />
          <TextInput
            style={styles.input}
            placeholder="Contact info"
            value={contactInfo}
            onChangeText={setContactInfo} // Update state
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: -5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#0073e6',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 250,
    marginVertical: 10,
    marginTop: -5,
  },
  addressContainer: {
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    color: '#000',
  },
  formContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  button: {
    backgroundColor: '#0073e6',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: -10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
