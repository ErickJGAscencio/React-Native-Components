import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ChipProps {
    chipTitle: string;
    onRemove: () => void;
}

function Chip({ chipTitle, onRemove }: ChipProps) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={{ color: '#1e1e1e' }}>{chipTitle}</Text>
            {onRemove && (
                <TouchableOpacity onPress={onRemove} style={styles.eraseButton}>
                    <Text style={styles.eraseText}>x</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )
}

export default Chip;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#d4d4d4',
        borderWidth: 1,
        borderColor: '#989898',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
        margin: 4,
        gap: 5
    },
    chipText: {
        color: '#1e1e1e',
        fontSize: 14,
    },
    eraseButton: {
        backgroundColor: '#818181',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
    },
    eraseText: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 14,
    },
});