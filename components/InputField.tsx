import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
    title?: string;
    onValueChange: (text: string) => void;
    value?: string;
}

export const InputField = ({ onValueChange, value = '', title }: InputFieldProps): JSX.Element => {
    const [input, setInput] = useState(value);
    return (
        <View style={styles.inputContainer}>
            {title && <Text>{title}</Text>}
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={(text) => {
                    onValueChange(text)
                    setInput(text)
                }} />
        </View>
    )
}

export default InputField;

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        color: 'black'
    },
});