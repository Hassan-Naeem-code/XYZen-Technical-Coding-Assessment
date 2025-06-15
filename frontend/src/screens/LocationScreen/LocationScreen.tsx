import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { RootState } from "../../store";
import Button from "../../components/Button";
import NavService from "../../helpers/NavService";
import styles from "./styles";

const LocationScreen = () => {
  const latitude = useSelector((state: RootState) => state.location.latitude);
  const longitude = useSelector((state: RootState) => state.location.longitude);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <LottieView
          autoPlay
          source={require("../../assets/animation/locationAnimation.json")}
          style={{
            height: 200,
            width: 200,
          }}
        />
        <Text
          style={styles.title}
        >{`Allow "Weather App" to access your location`}</Text>
        <Button
          title={"Current Location Weather"}
          onPress={() => NavService.navigate("Home", { latitude, longitude })}
        />
        <View style={styles.sepratorContainer}>
          <View style={styles.separator} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.separator} />
        </View>
        <Button
          title={"Type Manually"}
          mode="outline"
          onPress={() => NavService.navigate("ManualLocation")}
        />
      </View>
    </View>
  );
};

export default LocationScreen;
