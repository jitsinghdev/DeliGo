import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Inicia sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B0B0B0"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor="#B0B0B0"
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <TouchableOpacity
        style={styles.secondaryAction}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.secondaryText}>
          ¿No tienes cuenta?{' '}
          <Text style={styles.link}>Crear cuenta</Text>
        </Text>
      </TouchableOpacity>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
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
