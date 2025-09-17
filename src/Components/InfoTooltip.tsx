import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
    TouchableWithoutFeedback,
} from 'react-native';

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

    const closeTooltip = () => {
        if (onToggle) {
            onToggle(false);
        } else {
            setInternalVisible(false);
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
        <View style={{ position: "relative" }}>
            {isVisible && (
                <View style={StyleSheet.absoluteFill}>
                    <TouchableWithoutFeedback onPress={closeTooltip}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>
                </View>
            )}

            {/* Botón info + tooltip */}
            <TouchableOpacity
                onPress={toggleVisibility}
                activeOpacity={0.8}
                hitSlop={{ top:5, bottom:5, left:5, right:5 }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.wrapper}>
                    <View style={[styles.iconContainer, { backgroundColor }]}>
                        <Text style={styles.iconText}>i</Text>
                    </View>

                    {isVisible && (
                        <View
                            style={[
                                styles.tooltipBox,
                                { backgroundColor: tooltipColor },
                                getTooltipPosition(),
                                tooltipStyle,
                            ]}
                        >
                            <Text style={styles.tooltipText}>{message}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );

}

export default InfoTooltip;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'box-none',
    },
    wrapper: {
        width: '100%',
    },
    iconContainer: {
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tooltipBox: {
        position: 'absolute',
        padding: 8,
        borderRadius: 6,
        width: 200,
    },
    tooltipText: {
        color: '#000',
        fontSize: 14,
    },
});
