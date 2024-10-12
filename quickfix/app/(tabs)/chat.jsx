import { View, Text, StyleSheet, FlatList, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native'; 

const messagesData = [
  { id: '1', user: 'Stephen Yustiono', time: '9:36 AM', message: "Nice. I don't know why people get all worked up about Hawaiian pizza.", avatar: require('../../assets/images/new.png') },
  { id: '2', user: 'Erin Steed', time: '9:28 AM', message: "(Sad fact: you cannot search for a gif of the word 'gif', just gives you gifs.)", avatar: require('../../assets/images/new.png') },
  { id: '3', user: 'Daisy Tinsley', time: '9:20 AM', message: "Maybe email isn't the best form of communication.", avatar: require('../../assets/images/new.png') },
];

export default function Chat()  { 
  const route = useRoute();
  const { name } = route.params || {};  // Extract the 'name' parameter

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.activeIndicator} />
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titview}>
          <Text style={styles.title}>Messages</Text> 
          <View style={styles.profileContainer}>
            <Image 
              source={require('../../assets/images/new.png')}  // Local image
              style={styles.profilePic} 
            />
          </View>
        </View>

        <FlatList 
          data={messagesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.messageList}
        />
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
  titview: {
    backgroundColor: '#B3B3B3',
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  messageList: {
    marginTop: 50, // Adjust to prevent overlap with title section
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor:'black',
    marginBottom:15
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green', // Change color based on online status
  },
  messageContent: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 5,
    fontSize: 14,
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: '#A9A9A9',
    alignSelf: 'flex-end',
  },
});
