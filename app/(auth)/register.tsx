import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const handleRegister = () => {
    // TODO: Implement actual registration
    router.replace('/(app)/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800' }}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.text.primary }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: theme.text.secondary }]}>Sign up to get started with RentWheels</Text>
      </View>

      <View style={styles.form}>
        <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <User size={20} color={theme.text.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text.primary }]}
            placeholder="Full Name"
            placeholderTextColor={theme.text.secondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Mail size={20} color={theme.text.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text.primary }]}
            placeholder="Email"
            placeholderTextColor={theme.text.secondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Lock size={20} color={theme.text.secondary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: theme.text.primary }]}
            placeholder="Password"
            placeholderTextColor={theme.text.secondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, { backgroundColor: theme.primary }]}
          onPress={handleRegister}
        >
          <Text style={[styles.registerButtonText, { color: isDark ? theme.black : theme.white }]}>
            Create Account
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.text.secondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={[styles.loginLink, { color: theme.primary }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  form: {
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  registerButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  loginLink: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
});