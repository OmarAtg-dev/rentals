import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Calendar, Battery, Gauge, Users, Box, Trash, CreditCard as Edit } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { useVehicleStore } from '@/store/vehicleStore';

export default function VehicleDetails() {
  const { id } = useLocalSearchParams();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { getVehicle, deleteVehicle } = useVehicleStore();
  
  const vehicle = getVehicle(id as string);

  const handleDelete = () => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteVehicle(id as string);
            router.back();
          },
        },
      ]
    );
  };

  if (!vehicle) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.primary }]}>Vehicle not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: theme.surface }]}
          >
            <ArrowLeft size={24} color={theme.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.surface }]}
              onPress={() => router.push(`/vehicles/edit/${id}`)}
            >
              <Edit size={20} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.surface }]}
              onPress={handleDelete}
            >
              <Trash size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 120 }
        ]}
      >
        <Image source={{ uri: vehicle.image }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={[styles.name, { color: theme.text.primary }]}>{vehicle.name}</Text>
              <Text style={[styles.type, { color: theme.text.secondary }]}>{vehicle.type}</Text>
            </View>
            <View>
              <Text style={[styles.price, { color: theme.text.primary }]}>${vehicle.price}</Text>
              <Text style={[styles.priceUnit, { color: theme.text.secondary }]}>/day</Text>
            </View>
          </View>

          <View style={[styles.locationContainer, { backgroundColor: theme.surface }]}>
            <MapPin size={20} color={theme.text.secondary} />
            <Text style={[styles.location, { color: theme.text.secondary }]}>{vehicle.location}</Text>
          </View>

          <Text style={[styles.description, { color: theme.text.primary }]}>
            {vehicle.description}
          </Text>

          <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Specifications</Text>
          <View style={[styles.specsList, { backgroundColor: theme.surface }]}>
            {Object.entries(vehicle.specifications).map(([key, value], index) => (
              <View
                key={index}
                style={[
                  styles.specItem,
                  index !== Object.keys(vehicle.specifications).length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  },
                ]}
              >
                <Text style={[styles.specLabel, { color: theme.text.secondary }]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={[styles.specValue, { color: theme.text.primary }]}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footerWrapper, { backgroundColor: theme.background }]}>
        <SafeAreaView edges={['bottom']}>
          <View 
            style={[
              styles.footer,
              { 
                backgroundColor: theme.background,
                borderTopColor: theme.border,
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                  },
                  android: {
                    elevation: 8,
                  },
                  web: {
                    boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.1)',
                  }
                })
              }
            ]}
          >
            <View>
              <Text style={[styles.footerPrice, { color: theme.text.primary }]}>${vehicle.price}</Text>
              <Text style={[styles.footerPriceUnit, { color: theme.text.secondary }]}>/day</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.bookButton,
                {
                  backgroundColor: vehicle.available ? theme.primary : theme.surfaceVariant,
                },
              ]}
              disabled={!vehicle.available}
            >
              <Text
                style={[
                  styles.bookButtonText,
                  {
                    color: vehicle.available
                      ? isDark
                        ? theme.black
                        : theme.white
                      : theme.text.secondary,
                  },
                ]}
              >
                {vehicle.available ? 'Book Now' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  name: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  type: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  price: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  priceUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    textAlign: 'right',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  location: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  specsList: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  specLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  specValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 24,
  },
  footerPrice: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  footerPriceUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  bookButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 140,
  },
  bookButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});