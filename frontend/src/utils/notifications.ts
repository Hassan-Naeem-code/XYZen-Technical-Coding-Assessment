import PushNotification from "react-native-push-notification";

export function sendWeatherNotification(message: string) {
  PushNotification.localNotification({
    title: "Weather Alert",
    message,
  });
}
