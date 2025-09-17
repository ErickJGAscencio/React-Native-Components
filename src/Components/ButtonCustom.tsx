import React, { useRef } from "react";
import { View, Animated, Text, StyleSheet, Pressable } from 'react-native';

interface ButtonCustomProps {
    buttonWidth?: number;
    buttonColor?: string;
    textColor?: string;
    textSize?: number;
    textButton?: string;
    onPress?: () => void;
}
function ButtonCustom({ buttonWidth, buttonColor = '#5e9ef2', textColor = '#000', textSize, textButton, onPress }: ButtonCustomProps): React.JSX.Element {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true
        }).start();
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    const handleOnPress = () => {
        if (onPress) {
            onPress();
        }
    }
    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleOnPress}
        >
            <Animated.View style={[styles.buttonContainer,
            {
                backgroundColor: buttonColor ? buttonColor : '#53b6f8ff',
                width: buttonWidth ? buttonWidth : 'auto',
                elevation: 4,
                transform: [{ scale: scaleAnim }],
                justifyContent:'center',
                alignContent:'center'
            }
            ]}>

                <Text style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: textColor ? textColor : '#111',
                    fontSize: textSize ? textSize : 16,
                    fontWeight: 400
                }}
                >{textButton}</Text>
            </Animated.View>
        </Pressable>
    )
}

export default ButtonCustom;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 50,
        paddingBlock: 10,
        paddingInline: 15,
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    }
})