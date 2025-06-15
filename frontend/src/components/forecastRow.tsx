import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ForecastRowProps {
  time: string;
  temperature: number;
  precipitation?: number;
  uvIndex?: number;
}

export default function ForecastRow({
  time,
  temperature,
  precipitation,
  uvIndex,
}: ForecastRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.temp}>{temperature}°C</Text>
      {precipitation !== undefined && (
        <Text style={styles.precip}>Precip: {precipitation}mm</Text>
      )}
      {uvIndex !== undefined && <Text style={styles.uv}>UV: {uvIndex}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  time: { flex: 2 },
  temp: { flex: 1 },
  precip: { flex: 1 },
  uv: { flex: 1 },
});
