import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { PersistGate } from "redux-persist/integration/react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
// import { Provider } from "react-redux";
// import store, { persistor } from "./src/redux";
import Loader from "./src/components/Loader";
import MainNavigation from "./src/routes";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { colors } from "./src/utils";

// ignore warnings
LogBox.ignoreAllLogs();

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.primary,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.red,
        maxHeight: 120,
        height: "100%",
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
};

const App = () => {
  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {/* <Provider store={store}> */}
        {/* <PersistGate persistor={persistor}> */}
        <Loader />
        <ErrorBoundary>
          <MainNavigation />
        </ErrorBoundary>
        <Toast config={toastConfig} />
        {/* </PersistGate> */}
        {/* </Provider> */}
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  if (Platform.OS === "ios")
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWhiteBackground: {
    backgroundColor: colors.white,
  },
});
