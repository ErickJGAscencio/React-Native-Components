import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, useColorScheme, Text } from "react-native";

interface SwitchProps {
    isActivated: boolean;
    onToggle?: (newState: boolean) => void;
}

function Switch({ isActivated, onToggle }: SwitchProps) {
    const isDarkMode = useColorScheme() === 'dark';
    const [isOn, setIsOn] = useState(isActivated);
    const toggleAnim = useRef(new Animated.Value(isActivated ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(toggleAnim, {
            toValue: isOn ? 1 : 0,
            duration: 300,
            useNativeDriver: false // postiion styles like 'left' require this to be false
        }).start();
    }, [isOn]);



    const translateX = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 40],// left position for off/on
    })

    return (
        <TouchableOpacity
            style={isDarkMode ? styles.SwitchContainer : styles.SwitchContainerDark}
            activeOpacity={0.8}
            onPress={() => {
                const newState = !isOn;
                setIsOn(newState);
                onToggle?.(newState);
            }}

        >
            <Animated.View style={[
                isDarkMode ? styles.SwitchToggle : styles.SwitchToggleDark,
                isOn ? styles.ToggleOn : styles.ToggleOff,
                { left: translateX }
            ]} />
        </TouchableOpacity>
    )
}
export default Switch;

const styles = StyleSheet.create({
    SwitchContainer: {
        backgroundColor: '#fff',
        width: 75,
        height: 40,
        borderRadius: 30,
        elevation: 4, // for Android shadow
    },
    SwitchToggle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        top: 5, // centers vertically inside 40px height
        left: 5, // initial position
        zIndex: 2,
    },
    ToggleOn: {
        backgroundColor: '#1e1e1e', // More visible toggle
    },
    ToggleOff: {
        backgroundColor: '#969696ff', // More visible toggle
    },

    //DarkMode Styles
    SwitchContainerDark: {
        backgroundColor: '#1e1e1e',
        width: 75,
        height: 40,
        borderRadius: 30,
        elevation: 4,
    },
    SwitchToggleDark: {
        backgroundColor: '#fff', // More visible toggle
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        top: 5, // centers vertically inside 40px height
        left: 5, // initial position
        zIndex: 2,
    },
});