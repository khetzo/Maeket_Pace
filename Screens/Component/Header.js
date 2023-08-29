import * as React from "react";
import {
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});

export default function Header({ navigation, headerTitle }) {
  return (
    <View style={styles.screenHeader}>
      <View style={styles.backArrowContainer}>
      
       
      </View>

     
    </View>
  );
}

/*    

*/
const styles = StyleSheet.create({
  screenHeader: {
    height: DEVICE_HEIGHT * 0.06,
    width: screenWidth,
    flexDirection: "row",
   // zIndex: 2,
   // elevation: 2,
   // alignItems: "flex-end",

    backgroundColor: "white",

    shadowColor: "#666666",

    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 3,
    shadowRadius: 5,
    elevation: 4,
  
  },
 

 
 
  
});
