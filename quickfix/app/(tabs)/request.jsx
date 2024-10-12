import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const RequestsScreen = () => {
  const navigation = useNavigation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://192.168.57.110:3000/api/requests');       setRequests(response.data);
      } catch (err) {        setError('Failed to fetch requests');
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handlePress = (name) => {
    navigation.navigate('hh', { name });
  };

  const handleLongPress = (name) => {
    Alert.alert(
      'Delete Request',
      'Are you sure you want to delete this request?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => await deleteRequest(name),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteRequest = async (name) => {
    try {
      await axios.delete(`http://192.168.57.110:3000/api/requests/name/${name}`);
      setRequests((prevRequests) => prevRequests.filter((request) => request.name !== name));
    } catch (err) {
      console.error('Error deleting request:', err);
      setError('Failed to delete request');
    }
  };
  
  
  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const RequestItem = ({ id, name, time, message, onPress, onLongPress }) => (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.requestItem}>
        <View style={styles.requestDetails}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titview}>
        <Text style={styles.title}>Request</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/new.png')}
            style={styles.profilePic}
          />
        </View>
      </View>

      <View style={styles.itemcontainer}>
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <RequestItem
              id={item.id} // Pass id for deletion
              name={item.name}
              time={item.Time}
              message={item.message}
              onPress={() => handlePress(item.name)}
              onLongPress={() => handleLongPress(item.name)} // Pass id to long press handler
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestItem: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  requestDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '2%',
  },
  time: {
    fontSize: 14,
    color: '#fff',
    position: 'absolute',
    marginLeft: '80%',
  },
  message: {
    fontSize: 14,
    color: '#fff',
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
  itemcontainer: {
    marginVertical: '20%',
    width: '95%',
    marginHorizontal: '3%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RequestsScreen;
