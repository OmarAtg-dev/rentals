import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Camera, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { useVehicleStore } from '@/store/vehicleStore';
import * as ImagePicker from 'expo-image-picker';

export default function EditVehicle() {
  const { id } = useLocalSearchParams();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { getVehicle, updateVehicle } = useVehicleStore();

  const vehicle = getVehicle(id as string);

  const [name, setName] = useState(vehicle?.name || '');
  const [type, setType] = useState(vehicle?.type || '');
  const [price, setPrice] = useState(vehicle?.price.toString() || '');
  const [location, setLocation] = useState(vehicle?.location || '');
  const [description, setDescription] = useState(vehicle?.description || '');
  const [image, setImage] = useState(vehicle?.image || '');
  const [available, setAvailable] = useState(vehicle?.available || false);

  useEffect(() => {
    if (!vehicle) {
      router.back();
    }
  }, [vehicle]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      // For demo purposes, we'll use a random Unsplash image
      // In a real app, you would upload the image to your server/storage
      const randomId = Math.floor(Math.random() * 1000);
      const unsplashUrl = `https://source.unsplash.com/random/800x600?car&${randomId}`;
      setImage(unsplashUrl);
    }
  };

  const handleSubmit = () => {
    if (!name || !type || !price || !location || !description) return;

    updateVehicle(id as string, {
      name,
      type,
      price: Number(price),
      location,
      description,
      image,
      available,
    });

    router.back();
  };

  if (!vehicle) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: theme.surface }]}
        >
          <ArrowLeft size={24} color={theme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text.primary }]}>Edit Vehicle</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }} 
            style={styles.image}
          />
          <View style={styles.imageActions}>
            <TouchableOpacity
              style={[styles.imageButton, { backgroundColor: theme.primary }]}
              onPress={handleImagePick}
            >
              <Camera size={20} color={isDark ? theme.black : theme.white} />
            </TouchableOpacity>
            {image !== vehicle.image && (
              <TouchableOpacity
                style={[styles.imageButton, { backgroundColor: theme.surfaceVariant }]}
                onPress={() => setImage(vehicle.image)}
              >
                <X size={20} color={theme.text.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={name}
              onChangeText={setName}
              placeholder="Enter vehicle name"
              placeholderTextColor={theme.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Type</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={type}
              onChangeText={setType}
              placeholder="Enter vehicle type"
              placeholderTextColor={theme.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Price per day ($)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter daily rental price"
              placeholderTextColor={theme.text.secondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Location</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter vehicle location"
              placeholderTextColor={theme.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text.secondary }]}>Description</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text.primary, borderColor: theme.border }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter vehicle description"
              placeholderTextColor={theme.text.secondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.availabilityButton, { backgroundColor: available ? theme.primary : theme.surfaceVariant }]}
            onPress={() => setAvailable(!available)}
          >
            <Text
              style={[
                styles.availabilityButtonText,
                { color: available ? (isDark ? theme.black : theme.white) : theme.text.secondary },
              ]}
            >
              {available ? 'Available' : 'Unavailable'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: isDark ? theme.black : theme.white }]}>
              Save Changes
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
  imageContainer: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  imageActions: {
    position: 'absolute',
    right: 32,
    bottom: 24,
    flexDirection: 'row',
    gap: 8,
  },
  imageButton: {
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
  textArea: {
    height: 120,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  availabilityButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
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