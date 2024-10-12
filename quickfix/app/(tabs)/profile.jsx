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
import EditProfileModal from './EditProfileModal'; // Import the modal component

const Profile = () => {
  const route = useRoute();
  const { name } = route.params; // Get name passed from the previous screen

  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Fetch profile data based on name
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.57.110:3000/api/user/name/${name}`); // Replace with your API URL
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false); // Update loading state even on error
      }
    };

    fetchProfile();
  }, [name]);

  const handleUpdate = (updatedData) => {
    setUserData((prevData) => ({ ...prevData, ...updatedData }));
  };

  // Loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // No user data found
  if (!userData) {
    return <Text style={styles.errorText}>No profile found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: userData.image }} style={styles.profilePic} />
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.header}>User Profile</Text>
        
        {/* User Details */}
        {renderUserInfo("Name", userData.name)}
        {renderUserInfo("Email", userData.email)}
        {renderUserInfo("Contact", userData.contact)}
        {renderUserInfo("Birthday", userData.birthday ? new Date(userData.birthday).toLocaleDateString() : 'N/A')}
        {renderUserInfo("Gender", userData.gender)}
        {renderUserInfo("Job Role", userData.jobRole)}

        
      </View>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        userData={userData}
        onUpdate={handleUpdate}
      />
    </ScrollView>
  );
};

// Helper function to render user information rows
const renderUserInfo = (label, value) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.info}>{value || 'N/A'}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 70,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007bff', // Add border to profile picture
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000', // Added shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker color for better readability
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8, // Increased spacing between rows
  },
  label: {
    fontWeight: 'bold',
    color: '#007bff', // Consistent color with the edit button
  },
  info: {
    color: '#555',
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default Profile;
