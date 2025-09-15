import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ViewStyle, TouchableWithoutFeedback, TextInput } from 'react-native';

interface InfoTooltipProps {
    message: string;
    backgroundColor?: string;
    tooltipColor?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    visible?: boolean;
    onToggle?: (visible: boolean) => void;
    tooltipStyle?: ViewStyle;
}

function InfoTooltip({
    message,
    backgroundColor = '#84a3dbff',
    tooltipColor = '#c0d3ff',
    position = 'top',
    visible,
    onToggle,
    tooltipStyle,
}: InfoTooltipProps) {
    const [internalVisible, setInternalVisible] = useState(false);
    const isVisible = visible ?? internalVisible;

    const toggleVisibility = () => {
        const newState = !isVisible;
        if (onToggle) {
            onToggle(newState);
        } else {
            setInternalVisible(newState);
        }
    };

    const getTooltipPosition = (): ViewStyle => {
        switch (position) {
            case 'top':
                return { bottom: 25, left: 0 };
            case 'bottom':
                return { top: 25, left: 0 };
            case 'left':
                return { right: 25, top: 0 };
            case 'right':
                return { left: 25, top: 0 };
            default:
                return { top: 45, left: 0 };
        }
    };

    return (
        <View style={[{ flex: 1, backgroundColor: '#ac6f6f1f'}]}>
            {isVisible && (
                <TouchableWithoutFeedback onPress={toggleVisibility}>
                    <View style={[StyleSheet.absoluteFill]} />
                </TouchableWithoutFeedback>
            )}

            <View style={styles.wrapper}>
                <TouchableOpacity
                    style={[styles.iconContainer, { backgroundColor }]}
                    activeOpacity={0.8}
                    onPress={toggleVisibility}
                >
                    <Text style={styles.iconText}>i</Text>
                </TouchableOpacity>

                {isVisible && (
                    <View style={[styles.tooltipBox, { backgroundColor: tooltipColor }, getTooltipPosition(), tooltipStyle]}>
                        <Text style={styles.tooltipText}>{message}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

export default InfoTooltip;

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: 20,
        height: 20
    },
    iconContainer: {
        borderRadius: 10,
        paddingInline: 8,
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tooltipBox: {
        position: 'absolute',
        padding: 8,
        borderRadius: 6,
        width: 200,
        zIndex: 10,
    },
    tooltipText: {
        color: '#000',
        fontSize: 14,
    },
});
