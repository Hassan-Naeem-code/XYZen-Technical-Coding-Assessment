import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { fetchWeather } from "../../utils/api";
// ...existing code...
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define your stack param list
type RootStackParamList = {
  Home: undefined;
  Details: { weather: any };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetchWeather(40.7128, -74.006).then(setWeather);
  }, []);

  if (!weather) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Temperature: {weather.temperature}°C</Text>
      <Text>Interesting: {weather.interesting || "None"}</Text>
      <Button
        title="Details"
        onPress={() => navigation.navigate("Details", { weather })}
      />
    </View>
  );
}
