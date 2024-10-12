import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} 
      resizeMode="cover" 
      style={{ height: '100%' }}
    >
      <View style={styles.cont}>
        {/* Header with Logo and Profile Pic */}
        <View>
          <Image 
            source={require('../../assets/images/logoq.png')}  
            style={{ width: 100, height: 100, right: 0, marginTop: 40 }}
          />
          <View style={styles.profileContainer}>
            <Image 
              source={require('../../assets/images/new.png')}  
              style={styles.profilePic} 
            />
          </View>
        </View>

        {/* Main Image (Tow Truck) */}
        <Image
          source={require('../../assets/icons/tow.jpeg')} 
          style={{ width: "100%", height: "20%", marginTop: 20 }}
        />

        {/* White Space Area - Main Features */}
        <View style={styles.dash1}>
          <View style={styles.featureContainer}>
            {/* Chat Feature */}
            <TouchableOpacity style={styles.featureBox} onPress={() => navigation.navigate('Chat')}>
              <Image 
                source={require('../../assets/images/chatb.png')} 
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Chat</Text>
            </TouchableOpacity>

            {/* Request Tow */}
            <TouchableOpacity style={styles.featureBox} onPress={() => navigation.navigate('Request')}>
              <Image 
                source={require('../../assets/images/case.png')} 
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}>Request</Text>
            </TouchableOpacity>

            {/* Map Feature */}
            <TouchableOpacity style={styles.featureBox} onPress={() => navigation.navigate('Map')}>
              <Image 
                source={require('../../assets/images/map.png')} 
                style={styles.featureIcon}
              />
              
              <Text style={styles.featureText}>Map</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: '#DADADA',
    marginTop: 30,
    marginLeft: 320,
  },
  cont: {},
  dash1: {
    backgroundColor: '#fff',
    width: '100%',
    height: '60%',
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    justifyContent: 'center',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom:300
  },
  featureBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Home;
