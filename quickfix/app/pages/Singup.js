import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // State to hold the selected role
  const [profilePic, setProfilePic] = useState(null); // State to hold the selected profile picture
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Handle sign-up logic here
    alert(`Sign Up button pressed with role: ${role}`);
  };

  const selectProfilePicture = async () => {
    // Request permission to access camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri); // Set the selected image URI
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.cont}>
          {/* Profile Picture Selection */}
          <TouchableOpacity style={styles.profilePicContainer} onPress={selectProfilePicture}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <Text style={styles.profilePicPlaceholder}>Select Profile Picture</Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputcont}>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              placeholderTextColor="#999999"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Picker.Item label="User" value="user" />
              <Picker.Item label="Garage Owner" value="garage_owner" />
              <Picker.Item label="Tow Truck Driver" value="tow_truck_driver" />
              <Picker.Item label="Shop Owner" value="shop_owner" />
            </Picker>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Already have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Signin')}>
              Sign In
            </Text>
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
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#999999',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    alignSelf: 'center',
    marginTop:5
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profilePicPlaceholder: {
    color: '#999999',
    fontSize: 14,
  },
  input: {
    width: '90%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  picker: {
    width: '90%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#002B6B',
    width: '80%',
    left: '10%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
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
  },
  cont: {
    backgroundColor: 'white',
    marginTop: 60,
    height: 700,
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  inputcont: {
    marginVertical: '15%',
    marginHorizontal: '2%',
  },
});

export default Signup;
