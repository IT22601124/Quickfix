import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const Details = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !phone || !image) {
      Alert.alert('Please fill all the fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', // Change according to your image type
      name: 'user-image.jpg', // Name of the image file
    });
  
    try {
      const response = await axios.post('http://192.168.57.110:3000/api/users/add', formData);
      Alert.alert('User added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        Alert.alert('Error adding user!', error.response.data.message || 'Something went wrong. Please try again later.');
      } else if (error.request) {
        console.error('Request data:', error.request);
        Alert.alert('Error adding user!', 'No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error adding user!', error.message || 'Something went wrong. Please try again later.');
      }
    }
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Add New User</Text>

      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        style={{
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10
        }}
      />

      <Text>Phone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        style={{
          height: 40,
          borderColor: 'black',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10
        }}
      />

      <Button title="Pick an image from camera roll" onPress={handleImagePicker} />

      <View style={{ marginTop: 20 }}>
        <Button title="Add User" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default Details;
