import React, { useRef, useEffect } from "react";
import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import GeoLocation from "@react-native-community/geolocation";
import Geolocation from "react-native-geolocation-service";
import Orientation from "react-native-orientation-locker";
import SplashScreen from "react-native-splash-screen";
import NavService from "../helpers/NavService";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

async function requestLocationPermission() {
  try {
    const fineLocationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Weather App",
        message: "Weather App App access to your location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    const coarseLocationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Weather App",
        message: "Weather App App access to your location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (
      fineLocationGranted === PermissionsAndroid.RESULTS.GRANTED &&
      coarseLocationGranted === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the location");
    } else {
      console.log("location permission denied");
      return;
      // showMessage({
      //   message: 'Error',
      //   description: 'Location Permission Denied',
      //   type: 'error',
      // });
    }
  } catch (err) {
    // showMessage({
    //   message: 'Error',
    //   description: err,
    //   type: 'error',
    // });
  }
}

const MainNavigation = () => {
  const locationTimeout = useRef<NodeJS.Timeout | null>(null);

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position.coords.latitude", position?.coords?.latitude);
        console.log("position.coords.longitude", position?.coords?.longitude);
        let currentPosition = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          // latitude: 29.4581674,
          // longitude: -98.8440402,
        };
        // this?.props?.saveCurrentUserLocation(currentPosition);
      },
      (err) => {
        console.log(err);
        let currentPosition = {
          latitude: 29.4581674,
          longitude: -98.8440402,
        };
        // this?.props?.saveCurrentUserLocation(currentPosition);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      }
    );
  };
  useEffect(() => {
    const init = async () => {
      Platform.OS === "ios"
        ? await GeoLocation.requestAuthorization()
        : await requestLocationPermission();
      Orientation.lockToPortrait();
      locationTimeout.current = setInterval(() => {
        locateCurrentPosition();
      }, 5500);
      setTimeout(() => {
        SplashScreen.hide();
      }, 2500);
    };
    init();
    return () => {
      if (locationTimeout.current) {
        clearInterval(locationTimeout.current);
      }
    };
  }, []);
  return (
    <NavigationContainer
      ref={(ref: any) => NavService.setTopLevelNavigator(ref)}
    >
      <View style={styles.container}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
            headerTitleAllowFontScaling: true,
            gestureDirection: "horizontal",
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigation;
