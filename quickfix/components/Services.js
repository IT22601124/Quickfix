import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';

const bannerImages = [
  require('../assets/banner.jpg'),
  require('../assets/spare-parts.jpeg'),
  require('../assets/towing.jpg'),
];

export default function Services({navigation}) {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1)); // Opacity animation value

  const handleViewReviews = () => {
    navigation.navigate('HomeScreen'); // Add your logic for reviews, like navigating to a review screen
  };

  // Automatically change the banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setBannerIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
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

      {/* Banner */}
      <View style={styles.banner}>
        <Animated.Image
          source={bannerImages[bannerIndex]}
          style={[styles.bannerImage, {opacity: fadeAnim}]}
        />
        <View style={styles.overlay} />
        <Text style={styles.bannerText}>
          What Type of Service{'\n'}Do You Want?
        </Text>
      </View>

      {/* Services */}
      <View style={styles.serviceContainer}>
        <ServiceCard
          title="Search Nearby Garages"
          description="Find the nearest garages using real-time location tracking. Get directions, reviews, and service details to quickly choose the best option during emergencies."
          image={require('../assets/garage.jpeg')}
          onPress={() => navigation.navigate('Garage')}
          onViewReviews={handleViewReviews} // Pass the review handler
        />

        <ServiceCard
          title="Request Towing Service"
          description="Request a towing service instantly during breakdowns. Get real-time updates and assistance to safely transport your vehicle."
          image={require('../assets/towing.jpg')}
          onPress={() => navigation.navigate('Towing')}
          onViewReviews={handleViewReviews} // Pass the review handler
        />

        <ServiceCard
          title="Search Nearby Spare Parts Shops"
          description="Find the nearest spare parts shops quickly and easily, with detailed information and directions to get your vehicle back on the road."
          image={require('../assets/spare-parts.jpeg')}
          onPress={() => navigation.navigate('Spare-Parts')}
          onViewReviews={handleViewReviews} // Pass the review handler
        />
      </View>
      <TouchableOpacity style={{marginBottom:20,justifyContent:'center',alignSelf:'center'}}>
          <Text style={{fontSize: 20, textDecorationLine: 'underline', color: '#0B0DA6'}} onPress={() => navigation.navigate('HomeScreen')}>view reviews</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

function ServiceCard({title, description, image, onPress, onViewReviews}) {
  return (
    <View>
    <View style={styles.card}>
      <Image source={image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity style={styles.selectButton} onPress={onPress}>
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>
      </View>
      
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
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Dark overlay
    borderRadius: 10,
  },
  bannerText: {
    position: 'absolute',
    top: '40%',
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  serviceContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'gray',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#0059b3',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
