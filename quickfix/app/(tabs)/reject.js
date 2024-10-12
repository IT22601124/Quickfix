import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute

const RejectForm = () => {
  const route = useRoute(); // Access route parameters
  const { name } = route.params || {}; // Get the passed 'name'
  const navigation = useNavigation();

  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');

  // Function to show a warning message when the icon is clicked
  const showWarning = (field) => {
    Alert.alert(
      'Information',
      `You need to provide ${field}.`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  };

  const handleSave = async () => {
    if (!selectedReason || !description) {
      Alert.alert('Error', 'Please provide a reason and description before saving.');
    } else {
      // Show a confirmation popup before submission
      Alert.alert(
        'Confirmation',
        'Are you sure you want to submit the rejection?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Submission canceled'),
            style: 'cancel',
          },
          {
            text: 'Submit',
            onPress: async () => {
              try {
                // Send the data to the backend
                const response = await fetch('http://192.168.137.1:3000/api/rejectform', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    reason: selectedReason,
                    description: description,
                  }),
                });
  
                const result = await response.json();
                
                if (response.ok) {
                  Alert.alert('Success', 'Your rejection has been submitted.');
                  navigation.navigate('RequestsScreen');
                } else {
                  Alert.alert('Error', result.error || 'Failed to submit rejection.');
                }
              } catch (error) {
                Alert.alert('Error', 'An error occurred while submitting the rejection.');
              }
            },
          },
        ],
        { cancelable: true }
      );
    }
  };
  
  return (
    <View style={styles.container}>

      {/* Title and Profile */}
      <View style={styles.titview}>
        <Text style={styles.title}>Requests</Text>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../../assets/images/new.png')}  
            style={styles.profilePic} 
          />
        </View>
      </View>

     

      {/* Form */}
      <View style={styles.form}>
        {/* Reason Section */}
        <View style={styles.row}>
          <Text style={styles.label1}>Reason</Text>
          <TouchableOpacity onPress={() => showWarning('Reason for Rejection')}>
            <Image source={require('../../assets/icons/problem.png')} style={styles.problem}/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedReason}
            onValueChange={(itemValue) => setSelectedReason(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Reason for Rejection" value="" />
            <Picker.Item label="Busy" value="busy" />
            <Picker.Item label="Out of Service Area" value="out_of_service" />
            <Picker.Item label="Not Available" value="not_available" />
          </Picker>
        </View>

        {/* Description Section */}
        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <TouchableOpacity onPress={() => showWarning('Description')}>
            <Image source={require('../../assets/icons/problem.png')} style={styles.problem}/>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textArea}
          placeholder="Provide additional details...."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#f8f8f8',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginTop: 70,
    width: '93%',
    left: '3%',
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 6,
  },
  label1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
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
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  problem: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RejectForm;
