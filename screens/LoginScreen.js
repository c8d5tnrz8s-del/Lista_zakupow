import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ setIsLoggedIn }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (login === 'admin' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      Alert.alert(
        'Błąd logowania',
        'Login: admin\nHasło: 1234'
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="cart-outline" size={50} color="#ff9800" />

            <Text style={styles.title}>
              Lista zakupów
            </Text>

            <Text style={styles.subtitle}>
              Zaloguj się, aby kontynuować
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Login"
            placeholderTextColor="#666"
            value={login}
            onChangeText={setLogin}
            returnKeyType="next"
          />

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Hasło"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={handleLogin}
          >
            <Ionicons name="log-in-outline" size={20} color="white" />

            <Text
              style={{
                color: 'white',
                marginLeft: 8,
                fontWeight: 'bold'
              }}
            >
              Zaloguj
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  header: {
    alignItems: 'center',
    marginBottom: 30
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10
  },

  subtitle: {
    color: '#666',
    marginTop: 5
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    color: '#111',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8
  },

  passwordBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10
  },

  passwordInput: {
    flex: 1,
    color: '#111',
    padding: 12
  },

  eyeButton: {
    padding: 12
  },

  btn: {
    backgroundColor: '#ff9800',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  }
});