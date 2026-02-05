import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../../constants/theme";

type Props = {
  children: React.ReactNode;
  style?: object;
};

export default function BaseScreen({ children, style }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    //paddingTop: 24,
    backgroundColor: colors.background,
  },
});
