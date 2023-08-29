import React, { useState, useRef, useEffect, createRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import { getDatabase, ref, update } from "firebase/database";
const screenWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});

const RegistrationPage = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  //modal of chooseing a stream
  const [chooseStream, setChooseStream] = useState(false);
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  //selected type of bussinece and mejor subject must be stored to the useState

  const phoneNumberInputRef = createRef();
  const passwordInputRef = createRef();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  const DAtaForMarket = [
    {
      marketLogo:
        "https://www.careersportal.co.za/sites/default/files/images/Bronwyn/market9.png",

      market: "LAUNDRY",
    },
    {
      marketLogo: "https://blikbrein.tv/wp-content/uploads/market-10.jpg",

      market: "Sallon",
    },
    {
      marketLogo:
        "https://s3.amazonaws.com/readingvine-prod/uploads/production/category_value/image/12/11th-market-Reading-Comprehension.jpg",

      market: "PC REPAIR",
    },
    {
      marketLogo:
        "https://play-lh.googleusercontent.com/w3g2rX3oTFcKwh0i3bMpY8yYriVP2g6o48cayjTPp7FoRIiEE8KHdePf-f37uZmVRg",
      market: "RESTURENT",
    },
  ];
  const DAtaForSubjects = [
    {
      paymentMethod: "PAYMANT ON M-SERVICE APP",
      streamName2: "FREE DELEVARY",

      totalSubject: 9,
      id: "122-28-44-45",
    },
    {
      paymentMethod: "PAYMANT ON YOU'RE ACCOUNT ",
      streamName2: "COLLECTION",

      totalSubject: 9,

      id: "122-66-44-45",
    },
    {
      paymentMethod: "CASH OR TRANSFARE",
      streamName2: "COLLECTION",

      totalSubject: 9,
      id: "122-23-99-45",
    },
  ];

  const selectStream = ({navigation}) => {
 setChooseStream(false);
 
  };

  const selectMarket = ({ item }) => (
    <TouchableOpacity
      style={styles.marketBox}
      activeOpacity={0.5}
      onPress={() => {
        toggleServiceSelection(item);
        setChooseStream(!chooseStream);
        console.log("Selected Service:", item.market); // Log the selected service
      }}
    >
      <View style={styles.marketicon}>
        <Image style={styles.marketicon} source={{ uri: item.marketLogo }} />
      </View>

      <View style={styles.marketNumber}>
        <Text style={[styles.text, { fontSize: 18, fontWeight: "600" }]}>
          {item.market}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const toggleServiceSelection = (selectedService) => {
    if (selectedServices.includes(selectedService.market)) {
      // Deselect the service
      setSelectedServices((prevSelected) =>
        prevSelected.filter((service) => service !== selectedService.market)
      );
    } else {
      // Select the service
      setSelectedServices((prevSelected) => [
        ...prevSelected,
        selectedService.market,
      ]);
    }
  };
  const ChoosePayment = ({ item }) => (
    <TouchableOpacity
      style={styles.subjectBox}
      activeOpacity={5}
      onPress={() => {

     selectStream(item);
       
      }}
    >
      <View
        style={[
          styles.marketicon,
          {
            width: screenWidth * 0.16,
            height: screenWidth * 0.16,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      ></View>

      <View style={styles.subjectCountainer}>
        <Text
          style={[
            styles.text,
            { fontSize: 15, fontWeight: "600", fontVariant: ["small-caps"] },
          ]}
        >
          {item.paymentMethod}
        </Text>

        <Text style={[styles.text, { fontSize: 10, fontWeight: "600" }]}>
          Include:{item.streamName2}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleSubmitButton = ({ navigation }) => {
    if (userName === "") {
      alert("Please enter your surname and full names before proceeding");
    } else if (userEmail === "") {
      alert("You must enter a valid Email Address ");
    } else if (phoneNumber === "") {
      alert("Phone number is required to contact you about your orders");
    } else if (userPassword === "") {
      alert("Please create your new password of at least 6 characters");
    } else if (userPassword.length < 6) {
      alert("Password should be more than 6 characters");
    } else if (confirmPassword === "") {
      alert("Confirm password");
    } else if (userPassword !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      setLoading(true);

      setTimeout(() => {
        setLoading(false); // Hide the loading modal after 3 seconds
        // Process your code here after loading
        setIsRegistraionSuccess(true);

        /*
        signUpUser(
          selectedServices,
          userEmail,
          userPassword,
          userName,
          phoneNumber,
          accountType,
        )
     
       */
      }, 3000);
    }
  };

  const signUpUser = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Hide the loading modal after 3 seconds
      // Process your code here after loading
    }, 3000);

    createUserWithEmailAndPassword(auth, userEmail.trim(), userPassword.trim())
      .then((userCredential) => {
        const user = userCredential.user;
        const timeStamp = Date.now();
        const userRef = ref(database, `Users/${user.uid}/PersonalData`);

        const userData = {
          userEmail,
          userName,
          phoneNumber,
          userPassword,
          dateJoined: timeStamp,
          lastSeen: timeStamp,
          userId: user.uid,
          selectedServices,
          accountType,
       
          profileImage,
        };
        if (accountType == null) {
          accountType = "client";
        }
        update(userRef, userData)
        .then(async () => {
          console.log("DATA HAS BEEN STORED", phoneNumber);
          setLoading(true);
        
          await navigation.navigate("SetUpPfrofile");
        })
          .catch((error) => {
            console.error("Error updating user data:", error);
          });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#246273" barStyle="light-content" />
      <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
      {isRegistraionSuccess ? (
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
            // height: midleInputPressed
            // ?  DEVICE_HEIGHT * 0.25
            // : DEVICE_HEIGHT * 0.82,
          }}
        >
          <View
            style={{
              // backgroundColor: "#307ecc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.iconToshowProgress}>
              <Text
                style={{
                  fontSize: 100,

                  color: "pink",
                  fontWeight: "bold",
                }}
              >
                <EvilIcons name="check" size={104} color="black" />
              </Text>
            </View>
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 15,
                padding: 1,
              }}
            >
              2 out of 3
            </Text>
            <Text style={styles.successTextStyle}>CHOOSE YOUR SERVICE</Text>

            {/**PUT THE FLATLIST */}
            <View style={styles.flatlistgound}>
              <FlatList
                data={DAtaForMarket}
                renderItem={selectMarket}
                keyExtractor={(item) => item.market}
                //  extraData={selectedId}
                horizontal={true}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={5}
              onPress={() => {
                signUpUser(); // Call signUpUser after setting registration success
              }}
            >
              <Text style={styles.successTextYYYStyle}>SKIP</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={chooseStream}
            >
              <SafeAreaView>
                <TouchableOpacity
                  style={styles.modalcallsCuncell}
                  activeOpacity={5}
                  onPress={() => {
                    setChooseStream(!chooseStream);
                  }}
                ></TouchableOpacity>
                <View style={styles.modalStream}>
                  <View style={styles.heading}>
                    <Text
                      style={{
                        fontSize: 23,
                        fontWeight: "300",
                        marginVertical: 2,
                      }}
                    >
                      Payment Method
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "300",
                        marginVertical: 2,
                      }}
                    >
                      How would you like your Client to pay
                    </Text>
                  </View>
                  <FlatList
                    data={DAtaForSubjects}
                    renderItem={ChoosePayment}
                    keyExtractor={(item) => item.paymentMethod}
                    //  extraData={selectedId}
                  />
                </View>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
      ) : (
 
         
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Username"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(userName) => setUserName(userName)}
                />
                {userName ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your valid Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(userEmail) => setUserEmail(userEmail)}
                />
                {userEmail ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Phone Number"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                  keyboardType="numeric"
                  returnKeyType="next"
                  ref={phoneNumberInputRef}
                />
                {phoneNumber ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={userPassword ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(userPassword) => setUserPassword(userPassword)}
                  placeholderTextColor="#AEAEAE"
                  ref={passwordInputRef}
                  returnKeyType="next"
                />
                <TouchableOpacity
                //  onPress={updateSecureTextEntry}
                >
                  {userPassword ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 15,
                  },
                ]}
              >
                Confirm Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Confirm Your Password"
                  secureTextEntry={confirmPassword ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                />
                <TouchableOpacity
                //  onPress={updateConfirmSecureTextEntry}
                >
                  {confirmPassword ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
                </Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Privacy policy
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={handleSubmitButton}
                >
                  <LinearGradient
                    colors={["#246273", "#246273"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Sign Up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  //  onPress={() => navigation.goBack()}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#246273",
                      borderWidth: 1,
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#246273",
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal animationType="fade" transparent visible={loading}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Image
                      // source={require("../assets/Images/logo2.jpg")}
                      style={{
                        height: "20%",
                        width: "30%",
                        justifyContent: "center",
                        margin: 30,
                      }}
                    />
                    <ActivityIndicator size="large" color="black" />
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </Animatable.View>
   
      )}
    </View>
  );
};

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#246273",
  },
  header: {
  // flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -15,
    paddingLeft: 10,
    color: "#05375a",
    // backgroundColor:"red",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },

  buttonTextStyle: {
    color: "black",

    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  successTextStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
  },
  flatlistgound: {
    marginTop: 20,
    height: "35%",
    width: "99%",
    //backgroundColor: "yellow",

    alignItems: "center",
  },
  marketBox: {
    margin: 7,
    height: "90%",
    width: screenWidth * 0.4,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    borderRadius: 8,
  },
  marketicon: {
    height: screenWidth * 0.3,
    width: screenWidth * 0.3,
    margin: 1,
    backgroundColor: "gray",
    borderRadius: 800,
    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    // elevation: 4,
  },
  marketNumber: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.3,

    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconToshowProgress: {
    width: screenWidth * 0.38,
    height: screenWidth * 0.36,
    resizeMode: "contain",
    margin: 20,
    backgroundColor: "white",

    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
  },
  subjectBox: {
    margin: 5,
    width: screenWidth * 0.95,
    height: screenWidth * 0.25,
    backgroundColor: "white",
    alignItems: "center",

    alignSelf: "center",
    borderRadius: 9,
    flexDirection: "row",
    shadowColor: "#666666",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
  },
  subjectCountainer: {
    // margin: 5,

    height: deviceHeight * 0.1,
    width: screenWidth * 0.6,
    // backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },

  greatings: {
    height: deviceHeight * 0.1,
    width: screenWidth * 0.99,
    //backgroundColor: "red",
    alignItems: "center",
  },
  //
  modalcallsCuncell: {
    height: deviceHeight * 0.47,
    width: screenWidth * 0.98,
    //backgroundColor: "red",
  },
  modalStream: {
    height: deviceHeight * 0.45,
    width: screenWidth,

    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading: {
    height: "25%",
    width: "100%",
    backgroundColor: "rgba(231, 231, 211, 0.9)",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 20,
    },
    shadowOpacity: 2,
    shadowRadius: 9,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonStyle: {
    // backgroundColor: "#15009A",
    borderWidth: 1,
    color: "#FFFFFF",
    borderColor: "black",
    height: 50,
    width: screenWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    // marginBottom: 20,
    // padding:5
  },
});
