import React from "react";
import { View, Text } from "react-native";

export default function DetailsScreen({ route }: any) {
  const { weather } = route.params;
  return (
    <View>
      <Text>Temperature: {weather.temperature}°C</Text>
      <Text>Wind Speed: {weather.windspeed} km/h</Text>
      <Text>UV Index: {weather.uv_index}</Text>
      <Text>Precipitation: {weather.precipitation} mm</Text>
    </View>
  );
}
