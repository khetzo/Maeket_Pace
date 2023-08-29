import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
   setTimeout(() => {
      setAnimating(false);
     AsyncStorage.getItem("user_id").then((value) =>
      navigation.replace(value === null ? "LoginPage" : "RegistrationPage")
     );
    }, 3000); // 3-second delay
  }, []);

  return (
    <View style={styles.container}>
      <Image
       // source={require("../assets/Images/logo2.jpg")}
        style={{
          height: "20%",
          width: "30%",
          justifyContent: "center",
          margin: 30,
        }}
      />
      <ActivityIndicator
        size="large"
        animation={animating}
        color="blackS"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
