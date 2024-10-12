// Profile.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import EditProfileModal from './EditProfileModal';

const UserProfile = () => {
  const route = useRoute();
  const name  = 'Sadun jayasinghe'; // Assuming name is passed from previous screen
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.57.110:3000/api/userd/name/${name}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [name]);

  const handleUpdate = (updatedData) => {
    setUserData((prevData) => ({ ...prevData, ...updatedData }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Fetching Profile...</Text>
      </View>
    );
  }

  if (!userData) {
    return <Text style={styles.errorText}>No profile found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userData.image }} style={styles.profilePic} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.header}>User Profile</Text>
        
        {renderUserInfo("Name", userData.name)}
        {renderUserInfo("Email", userData.email)}
        {renderUserInfo("Contact", userData.contact)}
        {renderUserInfo("Birthday", userData.birthday ? new Date(userData.birthday).toLocaleDateString() : 'N/A')}
        {renderUserInfo("Gender", userData.gender)}
        {renderUserInfo("Job Role", userData.jobRole)}

        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <EditProfileModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        userData={userData}
        onUpdate={handleUpdate}
      />
    </ScrollView>
  );
};

const renderUserInfo = (label, value) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.info}>{value || 'N/A'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background for a cleaner look
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 60,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4CAF50', // Updated to match a modern color scheme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 30, // Added spacing for better readability
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12, // Added space between rows
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  info: {
    color: '#555',
    fontSize: 16,
  },
  editButton: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#030461',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#333',
    fontSize: 18,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default UserProfile;
