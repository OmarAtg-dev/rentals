/**
 * Finances Screen
 * Displays financial information, transactions, and reports.
 */
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';

// UI Constants
const UI_CONSTANTS = {
  spacing: {
    horizontal: 24,
    vertical: 16,
  },
  fontSize: {
    title: 24,
    placeholder: 16,
  },
};

export default function FinancesScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Finances</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.placeholder, { color: theme.text.secondary }]}>
          No financial data available
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: UI_CONSTANTS.spacing.horizontal,
    paddingVertical: UI_CONSTANTS.spacing.vertical,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: UI_CONSTANTS.fontSize.title,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: UI_CONSTANTS.fontSize.placeholder,
  },
});