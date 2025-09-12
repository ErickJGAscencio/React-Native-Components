import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

interface StepperProps {
    initalValue?: number;
    limit?: number
}

function Stepper({ initalValue = 0, limit = 999 }: StepperProps): React.JSX.Element {
    const [counter, setCounter] = useState(initalValue);

    const handleAdd = () => {
        if ((counter + 1) > limit) return;
        setCounter(counter + 1)
    }
    const handleRes = () => {
        if (counter - 1 < 0) return;
        setCounter(counter - 1)
    }
    useEffect(() => {

    }, [counter]);

    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <TouchableOpacity onPress={handleRes} style={styles.stepperButton} activeOpacity={0.5}>
                <Text style={styles.stepText}>-</Text>
            </TouchableOpacity>
            <TextInput style={[{
                width: 45,
                height: 45,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#c0c0c0ff',
                textAlign: 'center',
            }]}
                editable={false}
                defaultValue={counter.toString()}
                value={counter.toString()}
                maxLength={limit.toString().length}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.stepperButton} activeOpacity={0.5}>
                <Text style={styles.stepText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Stepper;

const styles = StyleSheet.create({
    stepperButton: {
        backgroundColor: '#c0c0c0ff',
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center'
    },
    stepText: {
        alignContent: 'center',
        textAlign: 'center',
        color: '#111',
        fontSize: 25
    }
})