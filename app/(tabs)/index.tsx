import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, QrCode } from 'lucide-react-native';

const DEMO_VEHICLES = [
  {
    id: '1',
    name: 'Tesla Model 3',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    price: 75,
    type: 'Electric',
  },
  {
    id: '2',
    name: 'BMW X5',
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    price: 95,
    type: 'SUV',
  },
  {
    id: '3',
    name: 'Mercedes C-Class',
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    price: 85,
    type: 'Sedan',
  },
];

export default function VehiclesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.vehicleImage} />
      <View style={styles.cardContent}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.vehicleType}>{item.type}</Text>
          <Text style={[styles.status, styles[item.status]]}>{item.status}</Text>
        </View>
        <Text style={styles.price}>${item.price}/day</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vehicle Fleet</Text>
        <TouchableOpacity style={styles.scanButton}>
          <QrCode size={24} color="#0066cc" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>Search vehicles...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#0066cc" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DEMO_VEHICLES}
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  scanButton: {
    padding: 8,
    backgroundColor: '#e6f0ff',
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
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#666',
    flex: 1,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#e6f0ff',
    borderRadius: 12,
  },
  list: {
    padding: 20,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '500',
  },
  available: {
    backgroundColor: '#e6f7e6',
    color: '#2d862d',
  },
  rented: {
    backgroundColor: '#fff3e6',
    color: '#cc7700',
  },
  maintenance: {
    backgroundColor: '#ffe6e6',
    color: '#cc0000',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066cc',
  },
});