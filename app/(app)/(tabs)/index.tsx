import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Star } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { ThemeToggle } from '@/components/ThemeToggle';
import { router } from 'expo-router';

const VEHICLES = [
  {
    id: '1',
    name: 'Tesla Model Y',
    type: 'Electric SUV',
    price: 89,
    rating: 4.9,
    reviews: 128,
    location: 'San Francisco',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=800',
    available: true,
  },
  {
    id: '2',
    name: 'Porsche 911 Carrera',
    type: 'Sports Car',
    price: 299,
    rating: 4.8,
    reviews: 84,
    location: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    available: true,
  },
  {
    id: '3',
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 199,
    rating: 4.7,
    reviews: 156,
    location: 'Miami',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    available: false,
  },
];

export default function VehiclesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const handleVehiclePress = (id: string) => {
    router.push(`/vehicle/${id}`);
  };

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => handleVehiclePress(item.id)}
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
        <View>
          <Text style={[styles.greeting, { color: theme.text.secondary }]}>Good morning,</Text>
          <Text style={[styles.name, { color: theme.text.primary }]}>John Smith</Text>
        </View>
        <ThemeToggle />
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Search size={20} color={theme.text.secondary} />
          <Text style={[styles.searchPlaceholder, { color: theme.text.secondary }]}>Search vehicles...</Text>
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.surfaceVariant, borderColor: theme.border }]}>
          <Filter size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          data={['All', 'SUV', 'Sedan', 'Sports', 'Electric']}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={[
                styles.categoryChip,
                { backgroundColor: theme.surface, borderColor: theme.border },
                index === 0 && { backgroundColor: theme.primary }
              ]}
            >
              <Text 
                style={[
                  styles.categoryText,
                  { color: theme.text.secondary },
                  index === 0 && { color: isDark ? theme.black : theme.white }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      <FlatList
        data={VEHICLES}
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  name: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
  },
  searchPlaceholder: {
    fontFamily: 'PlusJakartaSans-Regular',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  categoriesList: {
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
  },
  list: {
    padding: 24,
    gap: 24,
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
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
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