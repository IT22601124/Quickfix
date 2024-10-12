import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking, // Import Linking
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import * as Location from 'expo-location';

const ShopDetails = ({navigation}) => {
  const route = useRoute();
  const {shop} = route.params;

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      const {latitude, longitude} = shop;

      try {
        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (response.length > 0) {
          const addressComponents = response[0];
          const addressString = `${addressComponents.name}, ${addressComponents.city}, ${addressComponents.country}`;
          setAddress(addressString);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error(error);
        setAddress('Error fetching address');
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [shop]);

  // Function to get directions
  const getDirections = () => {
    const {latitude, longitude} = shop;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* Shop Name */}
      <Text style={styles.shopName}>{shop.name}</Text>

      {/* Shop Image */}
      <Image source={shop.backgroundImage} style={styles.shopImage} />

      {/* Shop Details Card */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailText}>Shop Owner: {shop.owner}</Text>
        <Text style={styles.detailText}>Available Parts:</Text>

        {/* Available Parts Dropdown */}
        <TouchableOpacity >
          <Text style={{color:'#fff',backgroundColor:'#00A2E8',fontSize:16,borderRadius:12,padding:12,alignSelf:'center'}}>      item      </Text>
        </TouchableOpacity>

        <Text style={styles.detailText}>Contact No: {shop.contact}</Text>
        <Text style={styles.detailText}>Email: {shop.email}</Text>
        <Text style={styles.detailText}>Open Time: {shop.openTime}</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner while fetching
        ) : (
          <Text style={styles.detailText}>
            Location: {address || 'Not found'}
          </Text>
        )}

        {/* Get Directions Button */}
        <TouchableOpacity style={styles.button} onPress={getDirections}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
  shopName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11A2A',
    textAlign: 'center',
    marginVertical: 10,
  },
  shopImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  detailsCard: {
    backgroundColor: '#0073e6',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#0073e6',
  },
  button: {
    backgroundColor: '#D11A2A', // Button color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShopDetails;
