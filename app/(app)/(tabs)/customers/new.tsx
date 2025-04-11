import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { useCustomerStore } from '@/store/customerStore';
import * as ImagePicker from 'expo-image-picker';

export default function NewCustomer() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { addCustomer } = useCustomerStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('https://source.unsplash.com/random/400x400?face');

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      // For demo purposes, we'll use a random Unsplash image
      // In a real app, you would upload the image to your server/storage
      const randomId = Math.floor(Math.random() * 1000);
      const unsplashUrl = `https://source.unsplash.com/random/400x400?face&${randomId}`;
      setAvatar(unsplashUrl);
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !phone) return;

    addCustomer({
      name,
      email,
      phone,
      avatar,
    });

    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: theme.surface }]}
        >
          <ArrowLeft size={24} color={theme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text.primary }]}>New Customer</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: avatar }} 
            style={styles.avatar}
          />
          <TouchableOpacity
            style={[styles.avatarButton, { backgroundColor: theme.primary }]}
            onPress={handleImagePick}
          >
            <Camera size={20} color={isDark ? theme.black : theme.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter customer name"
              placeholderTextColor={theme.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              placeholderTextColor={theme.text.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Phone</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              placeholderTextColor={theme.text.secondary}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: isDark ? theme.black : theme.white }]}>
              Create Customer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  submitButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
  },
});