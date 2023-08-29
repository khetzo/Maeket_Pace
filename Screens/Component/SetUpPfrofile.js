import React, { useState, useEffect } from 'react';
import { View, ScrollView,Modal,Button,Alert, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Import icons library
import * as Location from 'expo-location'; 
import * as ImagePicker from 'expo-image-picker';
import { getAuth, onAuthStateChanged,updateProfile } from 'firebase/auth';
import { getDatabase, ref, get,update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config'; // Adjust the path based on your actual file location
import AsyncStorage from "@react-native-async-storage/async-storage";



const SetUpPfrofile= ({navigation}) => {
  const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
  const auth = getAuth();
    const [userData, setUserData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [user, setUser] = useState(getAuth().currentUser);
    const [profileImage, setProfileImage] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [imageUpdateTrigger, setImageUpdateTrigger] = useState(false);


  // Fetch user data on initial load
  useEffect(() => {
    // Set user on authentication state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchUserData(user.uid); // Fetch user data using UID
      } else {
        setUserData(null);
        setProfileImage(null);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener on unmount
    };
  }, []);

  // Fetch user data from database
  const fetchUserData = async (uid) => {
    const userRef = ref(database, `Users/${uid}/PersonalData`);
    try {
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      setUserData(userData);
      setProfileImage(userData.photoURL);
      console.log(userData.photoURL);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Request location permission and fetch location
  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      }
    };

    fetchLocation();
    handleUpdateLocation();
  }, []);

  // Update user location
  const handleUpdateLocation = () => {
    if (!userLocation) {
      Alert.alert('Location Not Available', 'Please make sure you have provided location permission.');
      return;
    }

    const userRef = ref(database, `Users/${user.uid}/PersonalData`);
    update(userRef, { location: userLocation })
      .then(() => {
        Alert.alert('Location Updated', 'Your location has been updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating location:', error);
      });
  };

  const confirmUpdateProfile = async () => {
    setImageUpdateTrigger(prev => !prev)
    setShowConfirmation(false);
    setLoading(true);

    try {
      // Update profile image URL and display name in Firebase Authentication
      await updateProfile(user, {
      //  displayName: displayName,
        photoURL: profileImage,
      });
      const userRef = ref(database, `Users/${user.uid}/PersonalData`);
      await update(userRef, {
        'photoURL': profileImage,
      });
  
// Update profile image URL in your database

console.log('Profile updated successfully');
      console.log('Profile updated successfully',profileImage);
    } catch (error) {
      console.error('Error updating profile:', error);
    }

    setLoading(false);
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
   
    if (!result.canceled) {
     

      const imageUri = result.uri;
      // Set the selected image URL to the profileImage state
      setProfileImage(imageUri);
      // Show confirmation modal
      setShowConfirmation(true);
      try {
        // Update profile image URL in Firebase Authentication
        await updateProfile(user, {
          photoURL: imageUri,
        });

        // Update profile image URL in the Realtime Database
        const userRef = ref(database, `Users/${user.uid}/PersonalData`);
        await update(userRef, {
          'photoURL': imageUri,
        });

        // Store the selected image URL in AsyncStorage for persistence
        await AsyncStorage.setItem('profileImage', imageUri);

        // Update the local user state
        setUser({ ...user, photoURL: imageUri });

        console.log('Profile image updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      }



      
      // Update the user's profile data
      updateProfile(user, {
        photoURL: imageUri,
      })
        .then(() => {
          // Update the local user state
          setUser({ ...user, photoURL: imageUri });
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.notch} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile Setup</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageContainer}>
        
        
          <Image
          
         source={{ uri: profileImage }} s
          
          style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIconContainer}
        
        onPress={pickImage}
          >
            <AntDesign name="camerao" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.userDataContainer}>
          <Text style={styles.actionTextBottom}> Name: {userData?.userName}</Text>
          <Text style={styles.actionTextBottom}>Email: {userData?.userEmail}</Text>
          <Text style={styles.actionTextBottom}>Phone Number: {userData?.phoneNumber}</Text>
        
        </View>

        <Modal visible={showConfirmation} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Are you sure you want to update your profile?</Text>
            <Button title="Cancel" onPress={() => setShowConfirmation(false)} />
           <Button title="Confirm" onPress={confirmUpdateProfile} 
           
           />
          </View>
        </View>
      </Modal>
        </View>
        <TouchableOpacity style={styles.nextButton}
       onPress={() => navigation.navigate('HomePage')}
        >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.actionContainer}>
          <Text style={styles.actionTextTop}>Update Profile</Text>
          <View style={styles.actionContainerRight}>
            <Text style={styles.actionTextBottom}>Click to update your profile information</Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionContainer}>
          <Text style={styles.actionTextTop}>Acount Type</Text>
          <View style={styles.actionContainerRight}>
    
            <Text style={styles.actionTextBottom}>you are ouwning a {userData?.selectedServices[0]} searvice</Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionContainer}>
          <Text style={styles.actionTextTop}>Business Tools</Text>
          <View style={styles.actionContainerRight}>
            <Text style={styles.actionTextBottom}>catalogue,Setup tools,create Ads to your client</Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionContainer}>
          <Text style={styles.actionTextTop}>Auto Massaging  </Text>
          <View style={styles.actionContainerRight}>
            <Text style={styles.actionTextBottom}>Set up welcome Greeting massege to your Client  </Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.actionContainer}
      //  onPress={handleUpdateLocation()}
        >
          <Text style={styles.actionTextTop}>Location</Text>
          <View style={styles.actionContainerRight}>
            <Text style={styles.actionTextBottom}>location will apper hire and will be fixed  </Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionContainer}>
          <Text style={styles.actionTextTop}>Payment Mathode</Text>
          <View style={styles.actionContainerRight}>
            <Text style={styles.actionTextBottom}>your payment will be recived by M-SERVICE </Text>
            <FontAwesome name="pencil" size={20} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
        {/* Add more action containers here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  notch: {
    width: '100%',
   height: 5,
    backgroundColor: 'white', // Set color of notch
  },
  header: {
    backgroundColor: 'white',
   paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  profileImageContainer: {
    position: 'relative',
   alignItems: 'center',
 //  backgroundColor:"yellow",
   flexDirection: 'row',
   
  
  },
  profileContainer: {
    position: 'relative',
   alignItems: 'center',
 
   flexDirection: 'row',
 
   width: "95%",
  },
  userDataContainer: {
   // flexDirection: 'row',
   // justifyContent: 'space-between',
    paddingHorizontal: 10,
    //backgroundColor:"yellow",
    paddingHorizontal: 20,
    marginLeft: 10,
   paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: 'gray',
  },
  userDataText: {
    fontSize: 15,
    //fontWeight: 'bold',
  },
  profileImage: {
    width: 98,
    height: 98,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white', // Set color of border
    
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 12,
  },
  nextButton: {
    position: 'absolute',
    top: 5,
    right: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 8,
   // width
    
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  actionContainer: {
    opacity: 0.9,
    width: '90%',
  // height: '90%',
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 14,
    borderRadius: 10,
   
 //  alignItems: 'center',
  },
  actionContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  actionTextTop: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionTextBottom: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SetUpPfrofile;
