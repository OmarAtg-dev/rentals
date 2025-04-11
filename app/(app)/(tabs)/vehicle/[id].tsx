import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Calendar, Battery, Gauge, Users, Box } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

const VEHICLES = {
  '1': {
    id: '1',
    name: 'Tesla Model Y',
    type: 'Electric SUV',
    price: 89,
    rating: 4.9,
    reviews: 128,
    location: 'San Francisco',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=800',
    available: true,
    description: 'Experience the future of driving with the Tesla Model Y. This all-electric SUV combines luxury, performance, and sustainability in one stunning package.',
    features: [
      { icon: Battery, label: '330 mi', description: 'Range' },
      { icon: Gauge, label: '3.5s', description: '0-60 mph' },
      { icon: Users, label: '5', description: 'Seats' },
      { icon: Box, label: '76 cu ft', description: 'Cargo Space' }
    ],
    specifications: {
      powertrain: 'Dual Motor All-Wheel Drive',
      acceleration: '3.5 seconds 0-60 mph',
      range: '330 miles (EPA est.)',
      topSpeed: '155 mph',
      cargo: '76 cubic feet',
      weight: '4,416 lbs',
      seating: '5 adults',
      wheels: '19" or 21" wheels',
    }
  },
  '2': {
    id: '2',
    name: 'Porsche 911 Carrera',
    type: 'Sports Car',
    price: 299,
    rating: 4.8,
    reviews: 84,
    location: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    available: true,
    description: 'The iconic Porsche 911 Carrera represents the perfect balance of luxury and performance, delivering an unmatched driving experience.',
    features: [
      { icon: Gauge, label: '3.0s', description: '0-60 mph' },
      { icon: Users, label: '4', description: 'Seats' },
      { icon: Box, label: '13.8 cu ft', description: 'Cargo Space' }
    ],
    specifications: {
      engine: '3.0L Twin-Turbo Flat-Six',
      power: '379 hp @ 6,500 rpm',
      acceleration: '3.0 seconds 0-60 mph',
      topSpeed: '182 mph',
      transmission: '8-speed PDK',
      weight: '3,354 lbs',
      seating: '4 seats',
      wheels: '20"/21" wheels',
    }
  },
  '3': {
    id: '3',
    name: 'Range Rover Sport',
    type: 'Luxury SUV',
    price: 199,
    rating: 4.7,
    reviews: 156,
    location: 'Miami',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    available: false,
    description: 'The Range Rover Sport combines luxury, capability, and performance in a refined package that\'s equally at home in the city or off-road.',
    features: [
      { icon: Gauge, label: '5.0s', description: '0-60 mph' },
      { icon: Users, label: '5', description: 'Seats' },
      { icon: Box, label: '63.7 cu ft', description: 'Cargo Space' }
    ],
    specifications: {
      engine: '3.0L Inline-6 MHEV',
      power: '395 hp',
      acceleration: '5.0 seconds 0-60 mph',
      topSpeed: '140 mph',
      transmission: '8-speed Automatic',
      weight: '5,050 lbs',
      seating: '5 adults',
      wheels: '21" wheels',
    }
  }
};

export default function VehicleDetails() {
  const { id } = useLocalSearchParams();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  
  const vehicle = VEHICLES[id as keyof typeof VEHICLES];

  if (!vehicle) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.primary }]}>Vehicle not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: theme.surface }]}
          >
            <ArrowLeft size={24} color={theme.text.primary} />
          </TouchableOpacity>
          <View style={styles.ratingContainer}>
            <Star size={16} color={theme.primary} fill={theme.primary} />
            <Text style={[styles.rating, { color: theme.text.primary }]}>{vehicle.rating}</Text>
            <Text style={[styles.reviews, { color: theme.text.secondary }]}>
              ({vehicle.reviews} reviews)
            </Text>
          </View>
        </View>

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

          <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {vehicle.features.map((feature, index) => (
              <View
                key={index}
                style={[styles.featureCard, { backgroundColor: theme.surface }]}
              >
                <feature.icon size={24} color={theme.primary} />
                <Text style={[styles.featureValue, { color: theme.text.primary }]}>
                  {feature.label}
                </Text>
                <Text style={[styles.featureLabel, { color: theme.text.secondary }]}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>

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

      <View style={[styles.footer, { backgroundColor: theme.background }]}>
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
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
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    flex: 1,
    minWidth: 100,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  featureValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    marginTop: 8,
  },
  featureLabel: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    marginTop: 4,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  footerPrice: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  footerPriceUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  bookButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});