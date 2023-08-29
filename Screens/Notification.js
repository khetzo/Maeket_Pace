// NotificationPage.js
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useAdvertisementContext } from './AdvertisementContext'; // Import the context hook
const notificationsData = [
  { id: 1, title: 'New Message', message: 'You have a new message from John.' },
  { id: 2, title: 'Reminder', message: 'Don\'t forget to attend the meeting.' },
  // Add more notifications...
];

  

  
const NotificationItem = ({ item, onPress }) => (
  <Animatable.View animation="fadeIn" duration={600} style={styles.notificationItem}>
    <TouchableOpacity onPress={onPress} style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text>{item.message}</Text>
    </TouchableOpacity>
    <AntDesign name="right" size={20} color="#888" />
  </Animatable.View>
);

const Notification = ({ navigation }) => {

 const { adNotifications } = useAdvertisementContext();





    
  const handleNotificationClick = (notification) => {
    navigation.navigate('NotificationDetail', { notification });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={adNotifications}
     
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationItem item={item} onPress={() => handleNotificationClick(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: 20,
  },
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  notificationContent: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default Notification;
