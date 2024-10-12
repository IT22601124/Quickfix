import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Switch, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SubmitReviewScreen = ({ navigation }) => {
    const [review, setReview] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [rating, setRating] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = () => {
        Alert.alert('Review Submission','Successfully Submitted Your Review.',[{text: 'OK'}]);
    };

    const openGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };
    
    const deleteImage = () => {
        setSelectedImage(null);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Ratings & Reviews</Text>
            <Text style={styles.subHeader}>Leave Ratings</Text>
            <View style={styles.starsContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setRating(index + 1)}
                    >
                        <Text style={[styles.star, { color: index < rating ? '#FFD700': '#ccc' }]}>★</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.subHeader}>Leave Reviews</Text>
            <TextInput
                style={styles.input}
                onChangeText={setReview}
                value={review}
                placeholder='Type Your Review Here...' multiline
                textAlignVertical='top'
            />
            <TouchableOpacity style={styles.photoButton} onPress={openGallery}>
                <Text style={styles.photoButtonText}>+Add Photos Or Videos</Text>
            </TouchableOpacity>
            {selectedImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
                        <Text style={styles.deletebuttonText}>Delete Image</Text>
                    </TouchableOpacity>
                </View>       
            )}
            <View style={styles.switchContainer}>
                <Text>Keep Review As Anonymous</Text>
                <Switch 
                    value={anonymous}
                    onValueChange={setAnonymous}
                />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit The Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </ScrollView>
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
        fontWeight:'bold',
        marginTop: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    star: {
        fontSize: 30,
        marginHorizontal: 5,
    },
    input: {
        backgroundColor: '#fff',
        minHeight: 100,
        padding: 10,
        marginVertical: 10,
        textAlignVertical: 'top',
    },
    photoButton: {
        backgroundColor: '#ddd',
        padding: 10,
        marginVertical: 10,
    },
    photoButtonText: {
        textAlign: 'center',
    },
    imageContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    deleteButtonText: {
        color: '#ffffff',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#B4AFAF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#000000',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#B4AFAF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#000000',
        fontSize: 16,
    }
});

export default SubmitReviewScreen;