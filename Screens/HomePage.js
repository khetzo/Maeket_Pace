import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Header from "./Component/Header";
import { useNavigation } from '@react-navigation/native'; 
import * as Animatable from 'react-native-animatable';

import { useAdvertisementContext } from './AdvertisementContext'; // Import the AdvertisementProvider

const HomePage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const { addAdvertisementNotification } = useAdvertisementContext();

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const initialPosts = [
    {
      id: 2,
      user: "User2",
      image: "https://example.com/image2.jpg",
      likes: 5,
      comments: ["Comment 3", "Comment 4"],
    },
    // ... Add more sample posts
  ];
  const serviceTypes = [
    { id: "1", name: "Salon",// image: require("./images/salon.jpg") 
},
    { id: "2", name: "PC Repair", //image: require("./images/pc_repair.jpg")
 },
    { id: "3", name: "Restaurant",// image: require("./images/restaurant.jpg")
 },
 { id: "4", name: "Restaurant",// image: require("./images/restaurant.jpg")
},
{ id: "5", name: "Restaurant",// image: require("./images/restaurant.jpg")
},
{ id: "6", name: "Restaurant",// image: require("./images/restaurant.jpg")
},
{ id: "7", name: "Restaurant",// image: require("./images/restaurant.jpg")
},

    // Add more service types
  ];
  useEffect(() => {
    // Initialize posts
    setPosts(initialPosts);
  }, []);
  const renderServiceType = ({ item }) => (
    <Animatable.View
    style={styles.serviceTypeItem}
    animation="fadeInUp"
    duration={500}
  >
    <TouchableOpacity >
      <Image source={item.image} style={styles.serviceTypeImage} />
      <Text style={styles.serviceTypeName}>{item.name}</Text>
    </TouchableOpacity>
    </Animatable.View>
  );

  const handleUploadPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      // Handle image upload logic
      const newPost = {
        id: new Date().getTime().toString(),
        user: "User123", // Replace with actual user name
        image: result.uri,
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
    }

    const newAdvertisementNotification = {
        id: new Date().getTime().toString(),
        title: 'New Advertisement',
        message: 'Check out our latest product!',
      };
      addAdvertisementNotification(newAdvertisementNotification);
  };

  const handleLike = (postId) => {
    // Handle like button logic
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: post.likes + (post.liked ? -1 : 1),
            liked: !post.liked,
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleComment = (postId) => {
    // Handle comment button logic
    if (commentInput.trim()) {
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, commentInput] }
          : post
      );
      setPosts(updatedPosts);
      setCommentInput("");
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.user}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.interactionContainer}>
        <TouchableOpacity onPress={() => handleLike(item.id)}>
          <Ionicons
            name={item.liked ? "heart" : "heart-outline"}
            size={24}
            color={item.liked ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleComment(item.id)}>
          <Ionicons name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        {/* Add share button */}
      </View>
      <Text style={styles.likes}>{item.likes} likes</Text>
      {/* Render comments */}
      {item.comments.map((comment, index) => (
        <Text key={index}>{comment}</Text>
      ))}
      {/* Comment input */}
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={commentInput}
        onChangeText={setCommentInput}
      />
    </View>
  );
  const animateStyle = (index) => {
    const buttonWidth = 70; // Adjust this value according to your button width
    const inputRange = [
      (index - 4) * buttonWidth,
      index * buttonWidth,
      (index + 1) * buttonWidth,
    ];
    const translateX = animatedValue.interpolate({
      inputRange,
      outputRange: [-30, 0, 30], // Adjust values for desired animation
    });
    return {
      transform: [{ translateX }],
    };
  };
 
  return (
    <View style={styles.container}>
      <Header />
    
      <Animatable.View
  animation={{
    from: { translateY: 0 },
    to: { translateY: 20 },
  }}
  duration={500}
  style={styles.serviceTypesContainer}
>
      
          <FlatList
        data={serviceTypes}
        renderItem={renderServiceType}

        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
       
    
        style={styles.serviceTypesContainer}
      />
      </Animatable.View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
      {/* Upload picture button */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleUploadPicture}
        activeOpacity={0.7}
      >
        <Ionicons name="camera-outline" size={30} color="white" />
      </TouchableOpacity>
      {/* Bottom navigation */}
      <View style={styles.bottomNavigation}>
        {/* Define navigation buttons with animations */}
        {/* Home */}
        <Animated.View style={[styles.navigationButton, animateStyle(0)]}>
          <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
            <Ionicons name="home-outline" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
        {/* Map */}
        <Animated.View style={[styles.navigationButton, animateStyle(1)]}>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Ionicons name="map-outline" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
        {/* Notifications */}
        <Animated.View style={[styles.navigationButton, animateStyle(2)]}>
          <TouchableOpacity

           onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.navigationButton, animateStyle(3)]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SetUpPfrofile")}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};
// Helper function for navigation button animation

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  serviceTypesContainer: {
    borderColor: "red",
  },
  postContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
 marginVertical: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
  uploadButton: {
    position: "absolute",
    bottom: 70,
    right: 10,
    backgroundColor: "gray",
    height:60,
    width:60,
    padding: 8,
    borderRadius: 500,
    justifyContent:"center",
    alignItems:"center",
    
    borderColor: "gray",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  navigationButton: {
    flex: 1,
    alignItems: "center",
  },
  nextButton: {
    position: "absolute",
    top: 16,
    left: 16,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  // Style for the interaction container
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
// marginTop: 8,

  },
  serviceTypeItem: {
   // width: '30%', // 20% of the screen width
   padding: 5,
   
    alignItems: 'center',
   // backgroundColor:"yellow",
    marginBottom: 8,
  },
  
  serviceTypeImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // To make it a circle
  //  marginBottom: 5,
    backgroundColor:"red"
  },
  
  serviceTypeName: {
    fontSize: 12,
    textAlign: 'center',
    color:"black"
  },
  // Define your other styles here...
};
export default HomePage;
