import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function ProfileDetails({route, navigation}) {
  const {profileId} = route.params;
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleUpdate = async () => {
    // Navigate to a screen where users can update the profile
    navigation.navigate('UpdateProfile', {profileId});
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://192.168.57.110:3001/api/profile/${profileId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        alert('Profile deleted successfully!');
        navigation.goBack(); // Navigate back after deletion
      } else {
        alert('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Error deleting profile');
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
    <View style={styles.container}>
      {profileData ? (
        <>
          <Image
            source={{uri: profileData.image}}
            style={styles.profileImage}
          />
          <Text style={styles.text}>Name: {profileData.name}</Text>
          <Text style={styles.text}>Email: {profileData.email}</Text>
          <Text style={styles.text}>Contact: {profileData.contact}</Text>
          <Text style={styles.text}>
            Vehicle Type: {profileData.vehicleType}
          </Text>
          <Text style={styles.text}>
            Birthday: {new Date(profileData.birthday).toDateString()}
          </Text>
          <Text style={styles.text}>Gender: {profileData.gender}</Text>
          <Text style={styles.text}>Job Role: {profileData.jobRole}</Text>

          {/* Update Button */}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No profile data found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0073e6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e60000', // Red color for delete button
  },
});
