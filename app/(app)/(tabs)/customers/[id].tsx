import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, Car, Trash, CreditCard as Edit } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { useCustomerStore } from '@/store/customerStore';

export default function CustomerDetails() {
  const { id } = useLocalSearchParams();
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;
  const { getCustomer, deleteCustomer } = useCustomerStore();
  
  const customer = getCustomer(id as string);

  const handleDelete = () => {
    Alert.alert(
      'Delete Customer',
      'Are you sure you want to delete this customer?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCustomer(id as string);
            router.back();
          },
        },
      ]
    );
  };

  if (!customer) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text.primary }]}>Customer not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
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
            onPress={() => router.push(`/customers/edit/${id}`)}
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

      <View style={styles.content}>
        <Image source={{ uri: customer.avatar }} style={styles.avatar} />
        <Text style={[styles.name, { color: theme.text.primary }]}>{customer.name}</Text>

        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <Mail size={20} color={theme.text.secondary} />
            <Text style={[styles.infoText, { color: theme.text.primary }]}>{customer.email}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <Phone size={20} color={theme.text.secondary} />
            <Text style={[styles.infoText, { color: theme.text.primary }]}>{customer.phone}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <Car size={20} color={theme.text.secondary} />
            <Text style={[styles.infoText, { color: theme.text.primary }]}>
              {customer.rentals} rentals
            </Text>
          </View>
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
  content: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    marginBottom: 24,
  },
  infoSection: {
    width: '100%',
    gap: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});