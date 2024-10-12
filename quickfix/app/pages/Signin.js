import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Singnin = () => {
  const [email, setEmail] = useState(''); // State to hold the email input
  const navigation = useNavigation();

  const handleSignIn = () => {
    switch (email) {
      case 'test1@gmail.com':
        navigation.navigate('Service'); // Navigate to new1 page
        break;
      case 'test2@gmail.com':
        navigation.navigate('new2'); // Navigate to new2 page
        break;
      case 'test3@gmail.com':
        navigation.navigate('Tabs'); // Navigate to new3 page
        break;
      case 'test4@gmail.com': // Fixed the duplicate email case to a unique email
        navigation.navigate('new4'); // Navigate to new4 page
        break;
      default:
        alert('Email not recognized. Please try again.'); // Handle unrecognized email
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>SIGN IN</Text>
        <View style={styles.cont}>
        <View style={styles.inputcont}>
        <TextInput
          placeholder="email..."
          style={styles.input}
          placeholderTextColor="#999999" // Placeholder color
          value={email} // Bind the email state to the input
          onChangeText={setEmail} // Update email state on text change
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true} // Hide password input
          style={styles.input}
          placeholderTextColor="#999999" // Placeholder color
        />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forget password?</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
        </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    
    
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 80,
    marginLeft: 20,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 25,
    fontSize: 16,
    borderBottomWidth: 1, // Add bottom border width
    borderBottomColor: 'black',
    
  },
  forgotPassword: {
    color: 'black',
    textAlign: 'right',
    width: '90%',
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#002B6B',
    width: '80%',
    left:'10%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    color: 'black',
    textAlign: 'center',
  },
  signupLink: {
    color: '#002B6B',
    fontWeight: 'bold',
  },cont: {
    backgroundColor: 'white',
    marginTop: 80,
    height: 700, // Set the border color here (replace 'ash' with a valid color)
    borderWidth: 1, // Adjust the border width as needed
    borderTopLeftRadius: 40, // Set the top left radius
    borderTopRightRadius: 40, // Set the top right radius
    overflow: 'hidden', // Ensure the corners are rounded
  },inputcont:{
    marginVertical:'20%',
    marginHorizontal:'2%',
  }
});

export default Singnin;
