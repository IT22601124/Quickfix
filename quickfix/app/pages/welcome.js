import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

const Welcome = () => {

    const navigation=useNavigation();
    const handleSingin =() =>{
        navigation.navigate('Signin');

    };

    const handleSingUp =() =>{
        navigation.navigate('Signup');

    }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Path to your background image
      style={styles.background} // Apply styles for the background
      resizeMode="cover" // Adjust how the background image is resized
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logoq.png')} // Update the path to your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleSingin}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonOutline]}  onPress={handleSingUp}>
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>SIGN UP</Text>
        </TouchableOpacity>
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
    padding: 20, // Add some padding if needed
  },
  logo: {
    width: 200, // Adjust as per your logo size
    height: 200,
    marginBottom: 20,
    marginTop:90, // Space between logo and text
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 24, // Adjust font size as needed
    marginBottom: 40, // Space between text and buttons
    textAlign: 'center',
    marginTop:110
  },
  button: {
    backgroundColor: '#FFFFFF',
    width: '80%', // Button width
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: '#002B6B', // Text color for buttons
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size as needed
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#FFFFFF',
  },
});

export default Welcome;
