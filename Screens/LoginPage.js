import React, { useState, useRef, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
//import Loader from "../Componet/Louder";
import {initializeApp} from "firebase/app";
import { getDatabase, ref, update } from "firebase/database"; 
import {firebaseConfig} from "../firebase-config";
const screenWidth = Dimensions.get("window").width;

const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});

const LoginPage = ({ navigation }) => {
 
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
  const auth = getAuth();
  
  
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [inputPressed, setInputpressed] = useState(false);
  const passwordInputRef = createRef();

  //Arrow function for login
  const handleSubmition = () => {
    if (userEmail.length == 0 || userPassword.length == 0||userEmail.split("@")[1] !=="gmail.com") {
      alert("Enter email or password ");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth,userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = ref(database, `Users/${user.uid}/PersonalData`);
         
          update(userRef, { lastSeen: Date.now() })
         
            .then((snapshot) => {
              navigation.navigate("SetUpPfrofile")

              /*
              if (snapshot.exist()) {
                const userData = snapshot.val();
                const { typeOfAccount } = userData;

                // Use a state variable to determine the user's role
                const userRole = typeOfAccount === "admin" ? "admin" : "client";

                // Seting the user role in state 
                if (userRole === "admin") {
                 navigation.navigate("AdminPage"); // Change to the appropriate screen
                } else {
                  navigation.navigate("HomePage"); // Change to the appropriate screen
                }
              }
*/
              setLoading(false);
            });
        })
        .catch((error) => {
          alert(error);
console.log(error)
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.countaner}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          //alignContent: "center",
          // backgroundColor:"green"
        }}
      >
        <View
          style={{
            height: inputPressed ? DEVICE_HEIGHT * 0.89 : DEVICE_HEIGHT * 0.99,
          //  backgroundColor:"red",
            justifyContent: "center",
          }}
        >
          <KeyboardAvoidingView>
            <View style={styles.logostyle}>
              {loading ? (
                <ActivityIndicator animating={true} size="large" color="pink" />
              ) : (
                <Image
                  style={{
                    width: screenWidth * 0.38,
                    height: screenWidth * 0.38,

                    borderRadius: 47,
                  }}
                  // source={require("./assets/logo3.png")}
                />
              )}
            </View>
            <View style={styles.logostyle2}>
              <Image
                style={{
                 
                  height: screenWidth * 0.01,
                }}
                //  source={require("./assets/logo3.png")}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your Email"
                placeholderTextColor="#AEAEAE"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                blurOnSubmit={true}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword) =>
                  setUserPassword(userPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#AEAEAE"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                onBlur={() => {
                  setInputpressed(false);
                }}
                onFocus={() => {
                  setInputpressed(true);
                }}
                returnKeyType="next"
              />
            </View>
            <Text
              style={[
                styles.registerTextStyle,
                { color: "black", alignSelf: "flex-start", marginLeft: 40 },
              ]}
              //</KeyboardAvoidingView>onPress={() =>

              // navigation.navigate("ForgortPassword")
              //  }
            >
              Forgot Password ?
            </Text>
            <View>
              {error != "" ? (
                <Text style={styles.errorTextStyle}>{error}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={[styles.buttonStyle]}
              activeOpacity={0.5}
              onPress={() => {
                setLoading(true);
                handleSubmition();
               
                setInputpressed(false);
              }}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegistrationPage")}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginPage;
const styles = StyleSheet.create({
  countaner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
    // paddingTop: Constants.statusBarHeight,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 46,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  logostyle: {
    width: screenWidth * 0.38,
    height: screenWidth * 0.36,
    resizeMode: "contain",
    margin: 20,
    backgroundColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    borderRadius: 47,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  logostyle2: {
    width: screenWidth * 0.8,
    height: deviceHeight * 0.005,
    //  backgroundColor: "yellow",
    alignSelf: "center",
    marginBottom: 20,
    //alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    flex: 1,
    color: "#707070",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#707070",
  },
  buttonStyle: {
    backgroundColor: "#15009A",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    width: screenWidth * 0.45,
    alignItems: "center",
    alignSelf: "center",

    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    //padding: 10,
  },
});
