import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, TextInput, Image, TouchableOpacity, View, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { register as registerApi } from '@/src/api/auth';
import { Toast } from "toastify-react-native";

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.error("Completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      Toast.error("Las contraseñas no coinciden.");
      return;
    }
    try {
      setLoading(true);
      const res = await registerApi({ name, email, password });
      
      Toast[res.success ? "success" : "error"](res.message);
      if (res.success) {
        router.back();
      }

    } catch (e: any) {
      Toast.error(e?.message ?? 'No se pudo registrar');
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Create account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#B0B0B0"
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggle}><Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#2ECC71"
                style={styles.toggle}
              /></Text>
            </Pressable>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#B0B0B0"
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggle}><Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#2ECC71"
                style={styles.toggle}
              /></Text>
            </Pressable>
          </View>

          <Pressable style={[styles.button, loading && { opacity: 0.6 }]} disabled={loading} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>

          <TouchableOpacity style={styles.secondaryAction} onPress={() => router.back()}>
            <Text style={styles.secondaryText}>
              Already have an account?{' '}
              <Text style={styles.link}>Log in</Text>
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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  toggle: {
    paddingHorizontal: 12,
    color: '#2ECC71',
    fontWeight: 'bold',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 18,
    fontSize: 16,
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