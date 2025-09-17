import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleSheet } from "react-native";

interface SkeletonProps {
  width?: number ;
  height?: number ;
  borderRadius?: number;
  style?: ViewStyle;
}

function Skeleton({
  width = 100,
  height = 100,
  borderRadius = 10,
  style,
}: SkeletonProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  // Interpolar opacidad para efecto "fade in / fade out"
  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 1],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: `${width}%`,
          height: height,
          borderRadius:borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
  },
});

export default Skeleton;
