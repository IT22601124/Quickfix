import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';  
import { SafeAreaView } from 'react-native';
import 'react-native-url-polyfill';
import { BlurView } from 'expo-blur'; // Import BlurView
import axios from 'axios'; // Ensure axios is installed


export default function RequestsScreen() {
  const route = useRoute();
  const { name } = route.params || {};  
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();


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

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCall = () => {
    // Implement your call functionality here
    setModalVisible(false);
  };

  const handleUser = () => {
    navigation.navigate('Profile',{name:user.name})
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titview}>
        <Text style={styles.title}>Requests</Text>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/images/new.png')}  
            style={styles.profilePic} 
          />
        </View>
      </View>
      
      <View style={styles.messageContainer}>
        <Image 
          source={require('../../assets/images/new.png')}  
          style={styles.profile} 
        />
        
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.message}>
        {user ? user.message : "Loading message..."} 
        </Text>
      </View>

      <View style={styles.buttonContainer}> 
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleUser}>View User Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Call Me</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.continueButton}  onPress={() => navigation.navigate('Accept', { name: user?.name })}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <BlurView intensity={150} style={styles.blurView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{user ? user.phone : "Loading phone..."}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Image source={require('../../assets/icons/multiply.png')} style={{ width: 60, height: 60 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleCall}>
                  <Image source={require('../../assets/icons/phone-call.png')} style={{ width: 60, height: 60 }} />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
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
  profile: {
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 160,
    left: 90,
  },
  titview: {
    backgroundColor: '#B3B3B3',
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  messageContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 180,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    left:90
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, // Optional for styling
  },
  modalView: {
    backgroundColor: '#0034D1',
    padding: 20,
    width:'90%',
    alignItems: 'center',
    borderRadius: 10, // Added borderRadius for better visuals
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'#fff',
    fontSize:24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 100,
  },
  modalButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontSize: 16,
  },
});
