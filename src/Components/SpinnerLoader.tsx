import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";

interface SpinnerLoaderProps{
    backgroundColor?: string;
    slideColor?: string;
}
function SpinnerLoader({ backgroundColor = '#fff', slideColor } : SpinnerLoaderProps) {
    const animatedRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedRotation, {
                toValue: 360,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotationInterpolate = animatedRotation.interpolate({
        inputRange: [0, 360], // Esto debe coincidir con toValue
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[
                styles.ProgressContainer,
                {
                    borderColor: backgroundColor,
                    borderStartColor: slideColor,
                    transform: [{ rotate: rotationInterpolate }],
                }
            ]}
        />
    )
}

export default SpinnerLoader;

const styles = StyleSheet.create({
    ProgressContainer: {
        width: 43,
        height: 43,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
    }
})