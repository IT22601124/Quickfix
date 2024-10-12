import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ManageReviewScreen = ({ navigation }) => {
    const [review, setReview] = useState('Good Service. Quite timely!');

    const handleSave = () => {
        Alert.alert('Review Update','Successfully Saved Your Review', [ { text: 'OK' }]);
    };

    const handleDelete = () => {
        Alert.alert('Confirm Delete','Are You Sure You Want To Delete This Review?',[
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: () => console.log('Review Deleted'), style: 'destructive'},
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Ratings & Reviews</Text>
            <Text style={styles.subHeader}>Manage Your Review</Text>
            <TextInput
                style={styles.input}
                onChangeText={setReview}
                value={review} multiline
                placeholder="Edit Your Review..."
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        minHeight: 100,
        padding: 10,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor:'#B4AFAF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#B4AFAF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#B4AFAF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
    }
})

export default ManageReviewScreen;