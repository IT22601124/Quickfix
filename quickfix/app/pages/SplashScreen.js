import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SpScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome'); // Navigate to the login screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Update the path to your background image
      style={styles.background} // Style for the background image
      resizeMode="cover" // Cover the entire screen
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logoq.png')} // Update the path to your logo image
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Fill the entire screen with the background image
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Optional: you can add a background color if needed
    // backgroundColor: 'rgba(0, 43, 107, 0.5)', // Example of semi-transparent overlay
  },
  logo: {
    width: 300,  // Adjust the width and height as per your requirements
    height: 300,
  },
});

export default SpScreen;
