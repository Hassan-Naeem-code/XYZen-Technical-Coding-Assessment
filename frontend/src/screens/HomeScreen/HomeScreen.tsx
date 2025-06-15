import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useWeather } from "../../hooks/useWeather";
import styles from "./styles";
import Utils from "../../utils/Utils";

const screenWidth = Dimensions.get("window").width;

type RootStackParamList = {
  Home: undefined;
  Details: { weather: any; forecast: any };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { weather, forecast, error } = useWeather(42.498, -83.367);

  if (error) return <Text style={{ color: "red" }}>{error}</Text>;
  if (!weather || !forecast)
    return (
      <ActivityIndicator
        size="large"
        color="#FFD700"
        style={{ flex: 1, marginTop: 100 }}
      />
    );

  // Example: Use today's date and city (customize as needed)
  const city = "New York, US";
  const today = new Date();
  const dateStr = `${
    today.getMonth() + 1
  }.${today.getDate()} ${today.getFullYear()}`;

  // Prepare data for chart (first 7 days, or fallback to available)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const tempData = forecast?.hourly?.temperature_2m?.slice(0, 7) || [];
  const precipData = forecast?.hourly?.precipitation?.slice(0, 7) || [];

  console.log("Forecast Data:", weather);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.city}>
        {city} / {dateStr}
      </Text>
      <Text style={styles.weatherDesc}>
        <Text style={{ color: "#FFD700", fontSize: 28 }}>
          {weather.interesting || "Weather"}{" "}
        </Text>
        <Text style={{ color: "#FFD700", fontSize: 28 }}>
          {Utils.toFahrenheit(weather.temperature)}°
        </Text>
      </Text>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={Utils.getWeatherIconName(weather.weathercode)}
          size={120}
          color="#fff"
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <LineChart
          data={{
            labels: days,
            datasets: [
              { data: tempData, color: () => "#FFA500" }, // temperature
              { data: precipData, color: () => "#87CEEB" }, // precipitation
            ],
            legend: ["Temp", "Precip"],
          }}
          width={screenWidth - 32}
          height={180}
          chartConfig={{
            backgroundGradientFrom: "#556080",
            backgroundGradientTo: "#556080",
            color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            labelColor: () => "#fff",
            propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>
      <View style={styles.forecastRow}>
        {days.map((day, idx) => (
          <View key={idx} style={styles.dayCol}>
            <Text style={styles.dayText}>{day}</Text>
            <MaterialCommunityIcons
              name={Utils.getWeatherIconName(
                forecast.hourly?.weather_description
                  ? forecast.hourly.weather_description[idx]
                  : weather.interesting // fallback
              )}
              size={28}
              color="#fff"
            />
            <Text style={styles.dateText}>
              {forecast.hourly?.time?.[idx]?.slice(5, 10) || ""}
            </Text>
            {/* <Text style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>
              {forecast.hourly?.temperature_2m?.[idx] !== undefined
                ? Utils.toFahrenheit(forecast.hourly.temperature_2m[idx])
                : "--"}
            </Text> */}
            {(() => {
              const { min, max } = Utils.getDayMinMaxTemps(
                forecast.hourly.temperature_2m,
                forecast.hourly.time,
                idx
              );
              return (
                <Text style={{ color: "#fff", fontSize: 12, marginTop: 2 }}>
                  {Utils.toFahrenheit(Number(min))} /{" "}
                  {Utils.toFahrenheit(Number(max))}
                </Text>
              );
            })()}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
