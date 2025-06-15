import { StyleSheet } from "react-native";
import { hp, wp, colors, family } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.YELLOW_COLOR,
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: wp(20),
    fontFamily: family.Poppins_Semi_Bold,
    color: colors.BLACK,
    textAlign: "center",
    marginHorizontal: wp(24),
  },
  inputStyle: {
    height: hp(52),
    borderWidth: 3,
    marginHorizontal: wp(24),
    borderRadius: 12,
    paddingHorizontal: wp(12),
    marginVertical: hp(26),
    fontSize: wp(16),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
  },
  geoLocationView: {
    // width: WP('90%'),
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    width: "90%",
    // alignSelf: "center",
  },
  textInput: {
    // flex: 1,
    height: 70,
    color: colors.BLACK,
    // borderRadius: 8,
  },
});

export default styles;
