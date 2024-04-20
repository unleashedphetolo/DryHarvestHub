import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import firebase from '../firebaseConfig';

const ConsumerRegistration = () => {
    // State variables to store user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Function to handle registration process
    const handleRegistration = async () => {
        try {
            // Creating user with email and password using Firebase authentication
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const userId = response.user.uid;

            // Storing consumer details in Firestore database
            await firebase.firestore().collection('consumers').doc(userId).set({
                email,
                name,
                surname,
                phoneNumber,
                allowedActivity: 'Buy', // Default allowed activity
                availableProduct: 'Dried food', // Default available product
            });

            // Alerting user upon successful registration
            Alert.alert('Registration Successful', 'You are now registered as a consumer.');
        } catch (error) {
            // Alerting user in case of registration error
            Alert.alert('Registration Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry // Secure text entry for password field
            />
            <TextInput
                style={styles.textInput}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Surname"
                onChangeText={setSurname}
                value={surname}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                keyboardType="phone-pad" // Keyboard type set to phone-pad for phone number input
            />
            <Button title="Register" onPress={handleRegistration} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    textInput: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: 12,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
        cursor: 'pointer',
    },
});

export default ConsumerRegistration;
