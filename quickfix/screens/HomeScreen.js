import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet ,Image, Linking, Alert, Modal, Button } from 'react-native';

const garage = [
    { id: '1', name: 'SmartFix Garage', rating: 4.7, reviews: 4562 , location: '45/A,Kandana/Gampaha', contact: '0766372834', email: 'smartfix@gmail.com'},
    { id: '2', name: 'CoolMart Garage', rating: 4.4, reviews: 3545 , location: '126/F,Wattala/Gampaha', contact: '0769062697', email: 'coolmart@gmail.com'},
    { id: '3', name: 'SafeDrive Garage', rating: 4.1, reviews: 3274 , location: '98/2,Borella/Colombo', contact: '0112233445', email: 'safedrive@gmail.com'},
    { id: '4', name: 'AutoFix Garage', rating: 3.7, reviews: 2896 , location: '1/2/3,Ganemulla/Gampaha', contact: '0766987665', email: 'autofix@gmail.com'},
    { id: '5', name: 'DriveWell Garage', rating: 3.5, reviews: 2794 , location: '90/A,Paliyagoda/Colombo', contact: '0764929531', email: 'drivewell@gmail.com'},
    { id: '6', name: 'SmartDrive Garage', rating: 2.7, reviews: 1574 , location: '45/A/3,Ja-ela/Gampaha', contact: '0330987654', email: 'smartdrive@gmail.com'},
];

export default function HomeScreen({ navigation }) {
    const [sortedGarages, setSortedGarages ] = useState(garage);
    const [modalVisible, setModalVisible] = useState(false);
    const [garages, setGarages] = useState([]);

    const sortGarages = (criteria) => {
        let sortedData = [];
        if (criteria === 'Highest Rating') {
            sortedData = [...garage].sort((a, b) => b.rating - a.rating);
        } else if (criteria === 'Most Reviews') {
            sortedData = [...garage].sort((a, b) => b.reviews - a.reviews);
        } else if (criteria === 'Location') {
            sortedData = [...garage].sort((a, b) => a.location.localeCompare(b.location));
        }
        setSortedGarages(sortedData);
        setModalVisible(false);
    };

    const openMap = (location) => {
        const url = `https://maps.app.goo.gl/QK7SYk8gGQ1qNYPk7`;
        Linking.openURL(url).catch((err) => Alert.alert('Error', 'Failed To Open Google Maps'));
    };

    useEffect(() => {
        fetch('http://192.168.8.200:5000/api/garages')
            .then(response => response.json())
            .then(data => setGarages(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profilePic} source={{ uri: 'C:/Users/User/Desktop/IMG-20240227-WA0057.jpg' }} />
                <Text style={styles.headerText}>Ratings & Reviews</Text>
            </View>
            <TouchableOpacity style={styles.sortButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.sortButtonText}>Sort By ▼</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Sort By</Text>
                        <Button title="Highest Rating" onPress={() => sortGarages('Highest Rating')} />
                        <Button title="Most Reviews" onPress={() => sortGarages('Most Reviews')} />
                        <Button title="Location" onPress={() => sortGarages('Location')} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View> 
            </Modal>
            <FlatList
             data={sortedGarages}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => (
                <TouchableOpacity style={styles.garageItem}
                 onPress={() => navigation.navigate('Garage Details', {
                    garage: { 
                        id: item.id, 
                        name: item.name, 
                        rating: item.rating, 
                        reviews: item.reviews,
                        location: item.location,
                        contact: item.contact,
                        email: item.email,
                    } 
                })}
                >
                    <View style={styles.garageDetailsContainer}>
                        <Text style={styles.garageName}>{item.name}</Text>
                        <View style={styles.ratingMapContainer}>
                            <Text style={styles.garageRating}>{"⭐".repeat(Math.floor(item.rating))}   {item.rating}</Text>
                            <TouchableOpacity style={styles.mapButton} onPress={() => openMap(item.location)}>
                                <Text style={styles.mapButtonText}>see map location</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.garageReviews}>{item.reviews} reviews</Text>  
                    </View>
                </TouchableOpacity>
             )} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 0,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    sortButton: {
        backgroundColor: '#cccccc',
        padding: 8,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 10,
        marginLeft: 50,
    },
    sortButtonText: {
        fontSize: 16,
    },
    garageItem: {
        flexDirection: 'row',
        backgroundColor: '#D4D4D4',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        marginLeft: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    garageDetailsContainer: {
        flex: 1,
    },
    garageName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    ratingMapContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    garageRating: {
        fontSize: 16,
        color: '#000000',
    },
    garageReviews: {
        fontSize: 14,
        color: '#000000',
    },
    mapButton: {
        backgroundColor: '#B4AFAF',
        padding: 5,
        borderRadius: 5,
    },
    mapButtonText: {
        color: '#000000',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'justify',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
});
