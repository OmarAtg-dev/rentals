import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Phone, Mail } from 'lucide-react-native';

const DEMO_CUSTOMERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    rentals: 12,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    rentals: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 456-7890',
    rentals: 5,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
  },
];

export default function CustomersScreen() {
  const renderCustomerCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name}</Text>
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Mail size={16} color="#666" />
            <Text style={styles.contactText}>{item.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone size={16} color="#666" />
            <Text style={styles.contactText}>{item.phone}</Text>
          </View>
        </View>
        <Text style={styles.rentals}>{item.rentals} rentals</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customers</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>Search customers...</Text>
        </View>
      </View>

      <FlatList
        data={DEMO_CUSTOMERS}
        renderItem={renderCustomerCard}
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
  addButton: {
    padding: 8,
    backgroundColor: '#0066cc',
    borderRadius: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
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
  list: {
    padding: 20,
    gap: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  contactRow: {
    gap: 10,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
  },
  rentals: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: '500',
  },
});