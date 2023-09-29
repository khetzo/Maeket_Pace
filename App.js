import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AdvertisementProvider } from './Screens/AdvertisementContext'; // Import the AdvertisementProvider

import AdminPage from './Screens/AdminPage';
import SplashScreen from './Screens/SplashScreen';
import HomePage from './Screens/HomePage';
import LoginPage from './Screens/LoginPage';
import RegistrationPage from './Screens/RegistrationPage';
import SetUpPfrofile from './Screens/Component/SetUpPfrofile';
import Notification from './Screens/Notification';
import NotificationDetail from './Screens/NotificationDetail';
const Stack = createStackNavigator()
export default function App() {
  return (
    <AdvertisementProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
    
    <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />

        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage}  options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Stack.Screen name="SetUpPfrofile" component={SetUpPfrofile}  options={{ headerShown: false }}/>
        <Stack.Screen name="NotificationDetail" component={NotificationDetail}  options={{ headerShown: false }}/>
    </Stack.Navigator>
</NavigationContainer>
</AdvertisementProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});