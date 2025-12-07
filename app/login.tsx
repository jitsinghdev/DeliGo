import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { login } from '@/api/auth';
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';
import { useAuth } from '@/context/AuthContext';

export default function ModalScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Toast.error("Completa todos los campos.");
        return;
      }

      const res = await login({ email, password });
      let message = '';
      if (typeof res.message === 'string') {
        message = res.message;
      }

      if (res.success) {
        setLoggedIn(true);
        Toast.success(message);
        router.back();
      } else {
        Toast.error(message);
      }

    } catch (e: any) {
      Alert.alert("Error", e.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Ajusta si el header de navegación tapa algo (prueba 80–100)
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Log in</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ width: '100%', position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 18, top: 18 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#2ECC71"
              />
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.secondaryText}>
              Don't have an account?{' '}
              <Text style={styles.link}>Create account</Text>
            </Text>
          </TouchableOpacity>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 32,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#F9CA24',
    marginBottom: 28,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    marginVertical: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    width: '100%',
    backgroundColor: '#2ECC71',
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  secondaryAction: {
    marginTop: 28,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#E84393',
    fontSize: 15,
  },
  link: {
    color: '#2ECC71',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
