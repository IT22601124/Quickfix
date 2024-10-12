import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const GarageDetailsScreen = ({ route, navigation }) => {
    const { garage } = route.params;
    
    const reviews = [
        {id: '01', reviewer: 'John Doe', comment: 'Great Service, took a while but worth it!', date: '1 hour  ago'},
        {id: '02', reviewer: 'John Smith', comment: 'Great Service, quick service, staff was very friendly', date: '2 days ago'},
        {id: '03', reviewer: 'Mark Jenny', comment: 'Very good experience', date: '4 days ago'},
        {id: '04', reviewer: 'Tom Brady', comment: 'Good Service, but waiting time was little bit high.', date: '1 week ago'},
        {id: '05', reviewer: 'Ryan Shelf', comment: 'Overall good service', date: '2 weeks ago'},
        {id: '06', reviewer: 'James Anderson', comment: 'Unfortunately,I did not have good experience with this garage.', date: '1 month ago'},
    ];

    const renderGarageInfo = () => (
        <View style={styles.header}>
                <Image source={{ uri: 'C:/Users/User/Desktop/IMG-20240227-WA0057.jpg'}} style={styles.profilePic} />
                <View style={styles.garageInfo}>
                    <Text style={styles.garageName}>{garage.name}</Text>
                    <Text style={styles.garageDetail}>Location: {garage.location}</Text>
                    <Text style={styles.garageDetail}>Contact: {garage.contact}</Text>
                    <Text style={styles.garageDetail}>Email: {garage.email}</Text>
                    <Text style={styles.rating}>{'⭐'.repeat(Math.floor(garage.rating))}   {garage.rating}</Text>
                </View>
            </View>
    );

    const renderReviewItem = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.reviewerName}>{item.reviewer}</Text>
            <Text>{item.comment}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
    )

    return (
        <FlatList
            style={styles.container}
            data={reviews}
            keyExtractor={item => item.id}
            ListHeaderComponent={renderGarageInfo}
            renderItem={renderReviewItem}
            ListFooterComponent={
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Submit Review', { garage })}>
                    <Text style={styles.buttonText}>Submit a Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Manage Review', { garage })}>
                    <Text style={styles.buttonText}>Manage my Reviews</Text>
                </TouchableOpacity>
            </View>
            }
        />
    );
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    garageInfo: {
        flex: 1,
    },
    garageName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    garageDetail: {
        fontSize: 16,
    },
    rating: {
        fontSize: 16,
        color: '#ffa500',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    reviewItem: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    reviewerName: {
        fontWeight: 'bold',
    },
    reviewDate: {
        fontSize: 12,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#B4AFAF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000000',
        fontSize:  16,
    }
});

export default GarageDetailsScreen;