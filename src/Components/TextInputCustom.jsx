import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

function TextInputCustom({ isLimited = false, maxLength = 255, onTextChange }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (onTextChange) onTextChange(text);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo..."
        placeholderTextColor="#888"
        onChangeText={value => setText(value)}
        value={text}
        {...(isLimited ? { maxLength } : {})} // Just apply maxLength if isLimited is true
      />
      {isLimited && (
        <Text style={styles.counter}>{text.length}/{maxLength}</Text>
      )}
    </View>
  );
}


export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    width:'100%'
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
  counter: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});
