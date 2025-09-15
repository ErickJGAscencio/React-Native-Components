import React, { useEffect, useRef } from "react";
import { View, Animated, ViewStyle, StyleSheet } from "react-native";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

function Skeleton({
  width = "100%",
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
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  // Interpolar opacidad para efecto "fade in / fade out"
  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width:'100%',
          height:100,
          borderRadius:10,
          opacity:0.8,
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
