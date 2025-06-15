import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#556080", padding: 16 },
  city: { color: "#ccc", fontSize: 22, textAlign: "center", marginTop: 16 },
  weatherDesc: { textAlign: "center", marginVertical: 12 },
  iconContainer: { alignItems: "center", marginVertical: 16 },
  forecastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  dayCol: { alignItems: "center", flex: 1 },
  dayText: { color: "#fff", fontSize: 16, marginBottom: 4 },
  dateText: { color: "#fff", fontSize: 14, marginTop: 4 },
});

export default styles;