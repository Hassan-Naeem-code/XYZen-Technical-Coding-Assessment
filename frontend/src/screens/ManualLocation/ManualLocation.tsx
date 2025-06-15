import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AppDispatch } from "../../store";
import { showLoader, hideLoader } from "../../store/slices/loaderSlice";
import Button from "../../components/Button";
import Header from "../../components/Header";
import NavService from "../../helpers/NavService";
import GeoCodeServices from "../../services/geocodeService";
import styles from "./styles";

const ManualLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const onPressFetch = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      Toast.show({
        text1: "Please enter a city name",
        type: "error",
        visibilityTime: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      dispatch(showLoader());
      const response = await GeoCodeServices.querySearchCity(
        `city=${encodeURIComponent(trimmedCity)}&format=json&limit=1`
      );
      const data = response.data;
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        NavService.replace("Home", {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      } else {
        Toast.show({
          text1: "City not found",
          type: "error",
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      Toast.show({
        text1: "Error fetching location",
        type: "error",
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Header
          title="Type Location"
          onPressButton={() => navigation.goBack()}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>Add city name to fetch weather</Text>
          <TextInput
            value={city}
            placeholder="Add city"
            placeholderTextColor="grey"
            style={styles.inputStyle}
            onChangeText={setCity}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={onPressFetch}
            editable={!loading}
          />
          <Button
            title={loading ? "Fetching..." : "Fetch Weather"}
            buttonStyle={{ alignSelf: "center" }}
            onPress={onPressFetch}
            disabled={loading || city.trim().length === 0}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ManualLocation;
