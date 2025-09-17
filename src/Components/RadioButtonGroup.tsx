import React, { JSX, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface RadioButtonGroupProps {
  options: string[];
  color?: string;
  onSelect?: (selected: string) => void;
}

function RadioButtonGroup({ options, color = '#6a94e2ff', onSelect }: RadioButtonGroupProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => handleSelect(option)}
          activeOpacity={0.8}
        >
          <View style={[styles.radioCircle, { borderColor: color }]}>
            {selectedOption === option && <View style={[styles.selectedDot, { backgroundColor: color }]} />}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default RadioButtonGroup;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6a94e2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#6a94e2ff',
  },
  optionText: {
    fontSize: 16,
  },
});
