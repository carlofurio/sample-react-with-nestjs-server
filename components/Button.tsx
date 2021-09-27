import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface InputFieldProps {
    title: string;
    onPress: () => void;
}

export const Button = ({ onPress, title }: InputFieldProps): JSX.Element => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        marginTop: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        height: 40,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});