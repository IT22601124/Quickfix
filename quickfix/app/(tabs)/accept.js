import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import axios from 'axios'; // Ensure axios is installed

const Accept = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Access route parameters
    const { name } = route.params || {}; // Get the user ID
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://192.168.57.110:3000/api/users/${name}`); // Update with your server URL
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      if (name) {
        fetchUserData();
      }
    }, [name]);

    const handleAccept = () => {
        Alert.alert("Request Accepted, User ID: " + name); // Display the ID for testing
        navigation.navigate('DistanceMatrixComponent');
    };

    const handleReject = () => {
        Alert.alert("Request Rejected");
        navigation.navigate('RejectForm', { name });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titview}>
                <Text style={styles.title}>Requests</Text>
                <View style={styles.profileContainer}>
                    <Image 
                        source={require('../../assets/images/new.png')}  
                        style={styles.profilePic} 
                    />
                </View>
            </View>
            
            <View style={styles.card}>
                {/* Profile Picture */}
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} // Replace with the actual image URL
                    style={styles.profilePic1}
                />

                {/* Request Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.message}>
                    {user ? user.message : "Loading user message..."}
                    </Text>
                </View>

                {/* Terms and Conditions */}
                <Text style={styles.termsText}>
                    By accessing and using [App Name], you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </Text>

                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>I agree</Text>
                </View>

                {/* Accept and Reject Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                        <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                        <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        marginTop: 60,
        width: '90%',
        left: '5%',
        height: '70%',
    },
    profilePic1: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 15,
    },
    detailsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
    termsText: {
        fontSize: 12,
        color: '#7d7d7d',
        textAlign: 'center',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rejectButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    rejectText: {
        color: 'white',
        fontSize: 16,
    },
    acceptButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    acceptText: {
        color: 'white',
        fontSize: 16,
    },
    titview: {
        backgroundColor: '#B3B3B3',
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginTop: 50,
    },
    profilePic: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#DADADA',
        marginTop: 120,
        marginLeft: 290,
    },
});

export default Accept;
