import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './app/(tabs)/home';
import Chat from './app/(tabs)/chat';
import RequestsScreen from './app/(tabs)/request';
import spScreen from './app/pages/SplashScreen';
import Welcome from './app/pages/welcome';
import Singnin from './app/pages/Signin';
import Signup from './app/pages/Singup';
import hh from './app/(tabs)/hh';
import { Image } from 'react-native';
import Details from './app/(tabs)/detailsc';
import RejectForm from './app/(tabs)/reject';
import Accept from './app/(tabs)/accept';
import DistanceMatrixComponent from './app/(tabs)/direction';
import InsertProfile from './app/(tabs)/InsertProfile';
import Profile from './app/(tabs)/profile';
import Services from './components/Services';
import GarageSearch from './components/GarageSearch';
import GarageDetails from './components/GarageDetails';
import TowingService from './components/TowingService';
import Request from './components/Request';
import SparePartsShop from './components/SpareParts';
import ShopDetails from './components/ShopDetails';
import ProfileDetails from './components/ProfileDetails';
import UpdateProfile from './components/UpdateProfile';
import RateTowing from './components/RateTowing';
import userProfile from './app/(tabs)/userProfile';
import UserProfile from './app/(tabs)/userProfile';
import HomeScreen from './screens/HomeScreen';
import GarageDetailsScreen from './screens/GarageDetailsScreen';
import SubmitReviewScreen from './screens/SubmitReviewScreen';
import ManageReviewScreen from './screens/ManageReviewScreen';
import CustomerProfile from './components/Profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 5,
          backgroundColor: '#DEDEDE',
        },
        tabBarActiveTintColor: '#161947',
        tabBarInactiveTintColor: '#4F4F4F',
        tabBarLabelStyle: {
          fontSize: 16,  // Increase the font size of the labels
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/icons/home.png')} style={{ width: 35, height: 35 }}/>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/icons/chat.png')} style={{ width: 35, height: 35 }}/>
          ),
        }}
      />
      <Tab.Screen
        name="RequestsScreen"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/icons/interview.png')} style={{ width: 35, height: 35 }}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: () => null, // Hide the hh tab icon
        }}
      />

<Tab.Screen
        name="Profile."
        component={UserProfile}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={require('./assets/icons/user.png')} style={{ width: 35, height: 35 }}/>
          ),
        }}
      />
      
      <Tab.Screen
        name="hh"
        component={hh}
        options={{
          tabBarButton: () => null, // Hide the hh tab icon
        }}
        
      />

    <Tab.Screen
        name="Accept"
        component={Accept}
        options={{
          tabBarButton: () => null, // Hide the hh tab icon
        }}
        
      />

<Tab.Screen
        name="DistanceMatrixComponent"
        component={DistanceMatrixComponent}
        options={{
          tabBarButton: () => null, // Hide the hh tab icon
        }}
        
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="spScreen">
        <Stack.Screen
          name="spScreen"
          component={spScreen}
          options={{ title: 'spScreen', headerShown:false }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'Welcome', headerShown:false }}
        />
        <Stack.Screen
          name="Signin"
          component={Singnin}
          options={{ title: 'Signin', headerShown:false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Signup', headerShown:false }}
        />
         
        <Stack.Screen
          name="RejectForm"
          component={RejectForm}
          options={{ title: 'RejectForm', headerShown:false }}
        />


      
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }} // Hide header for tab screens
        />

<Stack.Screen
          name="InsertProfile"
          component={InsertProfile}
          options={{ headerShown: false }} // Hide header for tab screens
        />
        <Stack.Screen name="Service" component={Services} />
        <Stack.Screen name="Garage" component={GarageSearch} />
        <Stack.Screen name="Details" component={GarageDetails} />
        <Stack.Screen name="Towing" component={TowingService} />
        <Stack.Screen name="request" component={Request} />
        <Stack.Screen name="Rate" component={RateTowing} />
        <Stack.Screen name="Spare-Parts" component={SparePartsShop} />
        <Stack.Screen name="shopDetails" component={ShopDetails} />
        <Stack.Screen name="Profile" component={CustomerProfile} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Garage Details" component={GarageDetailsScreen} />
        <Stack.Screen name="Submit Review" component={SubmitReviewScreen} />
        <Stack.Screen name="Manage Review" component={ManageReviewScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
