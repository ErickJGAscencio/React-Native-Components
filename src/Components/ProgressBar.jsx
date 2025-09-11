import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

function ProgressBar({ progressPorcent }) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progressPorcent,
      duration: 500, // Anim duration en ms
      useNativeDriver: false, // porque estamos animando 'width'
    }).start();
  }, [progressPorcent]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.ProgressContainer}>
      <Animated.View style={[styles.ProgressFill, { width: widthInterpolated }]} />
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
    ProgressContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10
    },
    ProgressFill:{
        backgroundColor:'#5e9ef2ff',
        height:10,
        borderRadius:10
    }
})