import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { generic } from "../Constants/GenericStyles";
import { PlaceholderLogo } from "../Components";
import { Colors } from "../Constants/Colors";
import { scaleHeight } from "../Constants/Dimensions";

export default function SplashScreen() {
  const [showActivityInidcator, setShowActivityIndicator] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowActivityIndicator(true);
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <PlaceholderLogo />
      </View>
      <View style={styles.activityIndicator}>
        {showActivityInidcator && (
          <ActivityIndicator size="large" color={Colors.yellow} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...generic.container,
    justifyContent: "flex-start",
  },
  logo: {
    bottom: scaleHeight(-230),
  },
  activityIndicator: {
    bottom: scaleHeight(-260),
  },
});
