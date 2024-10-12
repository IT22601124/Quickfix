import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

export default function UpdateProfile({route, navigation}) {
  const {profileId} = route.params;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fetch profile data when component loads
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://192.168.57.110:3001/api/profile/${profileId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setImage(data.image);
          setName(data.name);
          setEmail(data.email);
          setContact(data.contact);
          setVehicleType(data.vehicleType);
          setBirthday(new Date(data.birthday));
          setGender(data.gender);
          setJobRole(data.jobRole);
        } else {
          setError(`Failed to fetch profile data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  // Handle Image Picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle Date Selection
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(false);
    setBirthday(currentDate);
  };

  // Update Profile Function
  const updateProfile = async () => {
    const updatedProfileData = {
      image,
      name,
      email,
      contact,
      vehicleType,
      birthday: birthday.toISOString(),
      gender,
      jobRole,
    };

    try {
      const response = await fetch(
        `http://192.168.57.110:3001/api/profile/${profileId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProfileData),
        },
      );

      if (response.ok) {
        Alert.alert('Profile updated successfully!');
        navigation.navigate('ProfileDetails', {profileId});
      } else {
        console.error('Failed to update profile');
        Alert.alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error updating profile');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Picker */}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{uri: image}} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Pick an image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      {/* Vehicle Type Dropdown */}
      <Text style={styles.label}>Vehicle Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={vehicleType}
          onValueChange={itemValue => setVehicleType(itemValue)}>
          <Picker.Item label="Select vehicle type" value="" />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Bike" value="Bike" />
          <Picker.Item label="Truck" value="Truck" />
          <Picker.Item label="SUV" value="SUV" />
          <Picker.Item label="Van" value="Van" />
          <Picker.Item label="Lorry" value="Lorry" />
          <Picker.Item label="Bus" value="Bus" />
        </Picker>
      </View>

      {/* Date Picker for Birthday */}
      <Text style={styles.label}>Birthday</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}>
        <Text>{birthday.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Gender Dropdown */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={itemValue => setGender(itemValue)}>
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Job Role Input */}
      <TextInput
        style={styles.input}
        placeholder="Job Role"
        value={jobRole}
        onChangeText={setJobRole}
      />

      {/* Update Button */}
      <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
        <Text style={styles.saveButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#757575',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
