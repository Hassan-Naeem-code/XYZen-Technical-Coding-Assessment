import { StyleSheet } from "react-native";
import { colors, family, wp, hp } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.YELLOW_COLOR,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: wp(18),
    color: colors.BLACK,
    textAlign: "center",
    marginHorizontal: wp(24),
    marginVertical: hp(16),
    fontFamily: family.Poppins_Semi_Bold,
  },
  text: {
    fontSize: wp(16),
    fontFamily: family.Poppins_Regular,
    color: colors.BLACK,
  },
  sepratorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: hp(20),
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: colors.BLACK,
    marginHorizontal: 12,
  },
});

export default styles;
