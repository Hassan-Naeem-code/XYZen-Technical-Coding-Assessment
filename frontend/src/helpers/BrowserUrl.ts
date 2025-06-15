import { Linking } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import Toast from "react-native-toast-message";
import { colors } from "../utils";

const sleep = (timeout: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const openLink = async (urlScheme: string): Promise<void> => {
  try {
    const url = urlScheme;
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "cancel",
        preferredBarTintColor: "rgba(251,176,64,1)",
        preferredControlTintColor: "white",
        readerMode: false,
        animated: true,
        modalPresentationStyle: "fullScreen",
        modalTransitionStyle: "coverVertical",
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: colors.black,
        secondaryToolbarColor: "black",
        navigationBarColor: "black",
        navigationBarDividerColor: "white",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
        // headers: {
        //   "my-custom-header": "my custom header value",
        // },
      });
      await sleep(800);
    } else {
      Linking.openURL(url);
    }
  } catch (error: any) {
    Toast.show({
      text1: error?.message || "Failed to open link",
      text1Style: { textAlign: "center" },
      type: "error",
      visibilityTime: 5000,
    });
  }
};
