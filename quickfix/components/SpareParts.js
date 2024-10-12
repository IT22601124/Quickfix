import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';

const shops = [
  {
    id: 1,
    name: 'Perera Motors',
    owner: 'S. Perera',
    contact: '0724567123',
    email: 'perera@gmail.com',
    openTime: '08:00 AM - 10:00 PM',
    backgroundImage: require('../assets/shop1.jpeg'),
    latitude: 6.9271,
    longitude: 79.9612,
  },
  {
    id: 2,
    name: 'Sampath Auto Parts',
    owner: 'Sampath Silva',
    contact: '0754567123',
    email: 'sampath45@gmail.com',
    openTime: '10:00 AM - 10:00 PM',
    backgroundImage: require('../assets/shop2.jpg'),
    latitude: 6.8345,
    longitude: 79.9538,
  },
  {
    id: 3,
    name: 'Colombo Spare Parts',
    owner: 'Kasun Pradeep',
    contact: '0744567456',
    email: 'kasun123@gmail.com',
    openTime: '09:00 AM - 11:00 PM',
    backgroundImage: require('../assets/shop3.jpg'),
    latitude: 6.9123,
    longitude: 79.9337,
  },
  {
    id: 4,
    name: 'D S Auto Parts',
    owner: 'Dasun Sameera',
    contact: '0704567123',
    email: 'sameera@gmail.com',
    openTime: '10:00 AM - 10:00 PM',
    backgroundImage: require('../assets/shop4.jpeg'),
    latitude: 6.9623,
    longitude: 79.9385,
  },
];

const SparePartsShop = () => {
  const [region, setRegion] = useState({
    latitude: 7.8731, // Default to Sri Lanka center
    longitude: 80.7718,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedShopId, setHighlightedShopId] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message:
            'This app needs access to your location to show nearby shops.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setCurrentLocation({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSearch = () => {
    const shop = shops.find(shop =>
      shop.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
    );

    if (shop) {
      setHighlightedShopId(shop.id); // Set highlighted shop ID
      setRegion({
        latitude: shop.latitude,
        longitude: shop.longitude,
        latitudeDelta: 0.01, // Zoom in to the shop
        longitudeDelta: 0.01,
      });
    } else {
      alert('No matching shops found');
      setHighlightedShopId(null); // Reset highlight if no match found
      setRegion({
        latitude: 7.8731, // Reset to default region if no match
        longitude: 80.7718,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleShopSelect = shop => {
    navigation.navigate('shopDetails', {shop});
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
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

      <Text style={styles.title}>Search Nearby {'\n'} Spare Parts Shops</Text>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search here..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        region={currentLocation || region}
        showsUserLocation={true}
        followsUserLocation={true}>
        {shops.map(shop => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}
            title={shop.name}
            description={`Owner: ${shop.owner}`}
            pinColor={highlightedShopId === shop.id ? 'yellow' : 'red'} // Highlight the marker in yellow
          />
        ))}
      </MapView>

      {/* Shop Details Section */}
      <FlatList
        data={shops}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ImageBackground
            source={item.backgroundImage}
            style={styles.backgroundImage}
            imageStyle={{borderRadius: 10}}>
            <View style={styles.shopCard}>
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopDetail}>Owner: {item.owner}</Text>
              <Text style={styles.shopDetail}>Available Parts: item</Text>
              <Text style={styles.shopDetail}>Contact: {item.contact}</Text>
              <Text style={styles.shopDetail}>Email: {item.email}</Text>
              <Text style={styles.shopDetail}>Open Time: {item.openTime}</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleShopSelect(item)}>
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />
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
    padding: 10,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
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
    width: Dimensions.get('window').width,
    height: 250,
    marginTop: 10,
  },
  shopCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Make the shop card semi-transparent to see the background image
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color should be white to contrast with the background image
  },
  shopDetail: {
    fontSize: 14,
    color: '#fff', // Ensure the text is visible
  },
  selectButton: {
    backgroundColor: '#0073e6',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default SparePartsShop;
