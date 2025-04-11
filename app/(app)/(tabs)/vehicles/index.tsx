import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useVehicleStore } from '@/store/vehicleStore';
import { router } from 'expo-router';

export default function VehiclesScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { vehicles } = useVehicleStore();

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => router.push(`/vehicles/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.vehicleName, { color: theme.text.primary }]}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={theme.primary} fill={theme.primary} />
            <Text style={[styles.rating, { color: theme.text.primary }]}>{item.rating}</Text>
            <Text style={[styles.reviews, { color: theme.text.secondary }]}>({item.reviews})</Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Text style={[styles.vehicleType, { color: theme.text.secondary }]}>{item.type}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={theme.text.secondary} />
            <Text style={[styles.location, { color: theme.text.secondary }]}>{item.location}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={[styles.price, { color: theme.text.primary }]}>${item.price}</Text>
            <Text style={[styles.priceUnit, { color: theme.text.secondary }]}>/day</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.bookButton,
              item.available
                ? { backgroundColor: theme.primary }
                : { backgroundColor: theme.surfaceVariant }
            ]}
            disabled={!item.available}
          >
            <Text
              style={[
                styles.bookButtonText,
                item.available
                  ? { color: isDark ? theme.black : theme.white }
                  : { color: theme.text.secondary }
              ]}
            >
              {item.available ? 'Book Now' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Vehicle Fleet</Text>
        <View style={styles.headerRight}>
          <ThemeToggle />
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/vehicles/new')}
          >
            <Plus size={24} color={isDark ? theme.black : theme.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Search size={20} color={theme.text.secondary} />
          <Text style={[styles.searchPlaceholder, { color: theme.text.secondary }]}>Search vehicles...</Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.surfaceVariant }]}>
          <Filter size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={vehicles}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  addButton: {
    padding: 8,
    borderRadius: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  filterButton: {
    padding: 12,
    borderRadius: 12,
  },
  list: {
    padding: 20,
    gap: 15,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleName: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  reviews: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleType: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  priceUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  bookButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
});