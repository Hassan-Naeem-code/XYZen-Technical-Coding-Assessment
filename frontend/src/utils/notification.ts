import PushNotification from "react-native-push-notification";

export const configureNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {},
    requestPermissions: true,
  });
};

export const sendWeatherNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    title,
    message,
    playSound: true,
    soundName: "default",
  });
};
