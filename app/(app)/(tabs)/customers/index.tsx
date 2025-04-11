import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Phone, Mail } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCustomerStore } from '@/store/customerStore';
import { router } from 'expo-router';

export default function CustomersScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { customers } = useCustomerStore();

  const renderCustomerCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => router.push(`/customers/${item.id}`)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.customerInfo}>
        <Text style={[styles.customerName, { color: theme.text.primary }]}>{item.name}</Text>
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Mail size={16} color={theme.text.secondary} />
            <Text style={[styles.contactText, { color: theme.text.secondary }]}>{item.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Phone size={16} color={theme.text.secondary} />
            <Text style={[styles.contactText, { color: theme.text.secondary }]}>{item.phone}</Text>
          </View>
        </View>
        <Text style={[styles.rentals, { color: theme.primary }]}>{item.rentals} rentals</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Customers</Text>
        <View style={styles.headerRight}>
          <ThemeToggle />
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/customers/new')}
          >
            <Plus size={24} color={isDark ? theme.black : theme.white} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Search size={20} color={theme.text.secondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text.primary }]}
            placeholder="Search customers..."
            placeholderTextColor={theme.text.secondary}
          />
        </View>
      </View>

      <FlatList
        data={customers}
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
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
  },
  list: {
    padding: 20,
    gap: 15,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
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
    fontFamily: 'PlusJakartaSans-SemiBold',
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
    fontFamily: 'PlusJakartaSans-Regular',
  },
  rentals: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});