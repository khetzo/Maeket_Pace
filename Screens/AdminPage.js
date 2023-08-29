// AdminPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
 import { firebaseConfig } from '../firebase-config';
import Header from './Component/Header';

const UserItem = ({ user, onDelete }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{user.name}</Text>
      <TouchableOpacity onPress={() => onDelete(user.id)}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const database = getDatabase();

  useEffect(() => {
    const userRef = ref(database, 'Users'); // Adjust the reference path based on your Firebase structure
    const usersListener = onValue(userRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const usersArray = Object.keys(usersData).map((key) => ({
          id: key,
          name: usersData[key].name,
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
    });

    // Cleanup function
    return () => {
      remove(usersListener);
    };
  }, []);

  const handleDeleteUser = (userId) => {
    // Remove user from Firebase and update state
    // ...

    // For example:
    // const userToDeleteRef = ref(database, `Users/${userId}`);
    // remove(userToDeleteRef);

    const userToDeleteRef = ref(database, `Users/${userId}`);
    remove(userToDeleteRef)
      .then(() => {
        console.log(`User with ID ${userId} deleted successfully.`);
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${userId}: ${error}`);
      });
  };

  return (
    <View style={styles.container}>
        <Header/>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserItem user={item} onDelete={handleDeleteUser} />
        )}
      />
    </View>
  );
};

// ... rest of the component remains the same

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      paddingTop: 20,
    },
    userItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      borderRadius: 8,
      elevation: 3,
    },
    userName: {
      fontWeight: 'bold',
    },
  });
  
  export default AdminPage;