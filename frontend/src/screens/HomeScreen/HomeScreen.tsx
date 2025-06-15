import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchWeather, fetchForecast } from "../../store/slices/weatherSlice";
import { RootState, AppDispatch } from "../../store";
import { wp, hp } from "../../utils";
import styles from "./styles";
import Utils from "../../utils/Utils";
import Header from "../../components/Header";
import NavService from "../../helpers/NavService";
import { useNavigation } from "@react-navigation/native";
import GeoCodeServices from "../../services/geocodeService";

const HomeScreen = ({ route }: { route: any }) => {
  const { latitude, longitude } = route.params || {};
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const weather = useSelector((state: RootState) => state.weather.weather);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const error = useSelector((state: RootState) => state.weather.error);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState<{
    city: string;
    state: string;
  }>({ city: "", state: "" });

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
    setRefreshing(false);
  };

  const fetchWeatherData = async () => {
    if (latitude && longitude) {
      dispatch(fetchWeather({ lat: latitude, lon: longitude }));
      dispatch(fetchForecast({ lat: latitude, lon: longitude }));
      const response = await GeoCodeServices.querySearchLatLon(
        `lat=${latitude}&lon=${longitude}&format=json&limit=1`
      );
      const data = response.data;
      if (data) {
        const city =
          data.address.city || data.address.town || data.address.village || "";
        const state = data.address.state || "";
        setLocationName({ city: city || "Unknown", state: state || "Unknown" });
      } else {
        console.warn(
          "Location not found for the given latitude and longitude."
        );
        setLocationName({ city: "Unknown", state: "Unknown" });
      }
    } else {
      // Handle case where latitude and longitude are not available
      console.warn("Latitude and longitude are not available.");
      setLocationName({ city: "Unknown", state: "Unknown" });
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (error) return <Text style={{ color: "red" }}>{error}</Text>;
  if (!weather || !forecast) return null; // Loader is global

  // Render future forecast
  type ForecastItem = {
    temperature: number | undefined;
    weathercode: number;
    time: string;
    day?: {
      avgtemp_c: number;
      condition: {
        icon: string;
      };
    };
  };

  const _renderForeCastItem = ({
    item,
    index,
  }: {
    item: ForecastItem;
    index: number;
  }) => {
    return (
      <View style={styles.foreCastContainer}>
        <Text style={styles.foreCastTemp}>
          {item?.temperature !== undefined
            ? `${(item?.temperature * 1.8 + 32).toFixed(0)}°F`
            : "--"}
          °
        </Text>
        <MaterialCommunityIcons
          name={Utils.getWeatherIconName(item.weathercode)}
          size={32}
          color="#333"
        />
        <Text style={styles.foreCastDate}>
          {" "}
          {moment(item.time).format("hh:mm A")}
        </Text>
      </View>
    );
  };

  const hourlyData = Utils.getHourlyData(forecast) || []; // Assuming getHourlyData is a utility function to extract hourly data

  return (
    <View style={styles.container}>
      <Header
        {...navigation}
        title="Weather"
        onPressButton={() => NavService.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment().format("dddd, DD MMMM")}
          </Text>
        </View>
        <Text style={styles.conditionText}>
          {locationName !== null
            ? `${locationName?.city}, ${locationName?.state}`
            : "--"}
        </Text>
        <Text style={styles.tempText}>
          {weather?.temperature !== undefined
            ? `${(weather.temperature * 1.8 + 32).toFixed(1)}°F`
            : "--"}
        </Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Daily Summary</Text>
          <Text style={styles.summaryText}>
            {`Now it feels like ${
              weather?.temperature !== undefined
                ? `${(weather.temperature * 1.8 + 32).toFixed(1)}°F`
                : "--"
            }°`}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/wind.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
            />
            <Text style={styles.infoMainText}>
              {weather.windspeed !== undefined
                ? `${weather.windspeed} Km/h`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Wind</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/humidity.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
              resizeMode="cover"
            />
            <Text style={styles.infoMainText}>
              {weather.winddirection !== undefined
                ? `${weather.winddirection}`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Pressure</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              autoPlay
              source={require("../../assets/animation/eye1.json")}
              style={{
                height: wp(50),
                width: wp(50),
              }}
            />
            <Text style={styles.infoMainText}>
              {weather.visibility !== undefined
                ? `${weather.visibility} Km`
                : "--"}
            </Text>
            <Text style={styles.infoText}>Visibility</Text>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Hourly Forecast</Text>

          <FlatList
            data={hourlyData}
            renderItem={_renderForeCastItem}
            horizontal
            ItemSeparatorComponent={() => {
              return <View style={{ width: 12 }} />;
            }}
            style={{ width: "100%", marginVertical: hp(16) }}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
