import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  progressPorcent: number; // valor entre 0 y 100
  height?: number;
  showLabel?: boolean;
  barColor?: string;
  backgroundColor?: string;
}

function ProgressBar({
  progressPorcent,
  height = 12,
  showLabel = true,
  barColor = '#5e9ef2',
  backgroundColor = '#e0e0e0',
}: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progressPorcent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progressPorcent]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.barBackground, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: widthInterpolated,
              height,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>{`${Math.round(progressPorcent)}%`}</Text>
      )}
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  barBackground: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
