/**
 * Settings Screen
 * Provides user configuration options and account management functionality.
 */
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme, darkTheme } from '@/constants/theme';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ChevronRight, User, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

// Settings menu items configuration
const SETTINGS_MENU_ITEMS = [
  {
    icon: User,
    title: 'Account',
    description: 'Manage your account settings and preferences',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure your notification preferences',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Control your privacy and security settings',
  },
  {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'Get help and find answers to common questions',
  },
];

// UI Constants
const UI_CONSTANTS = {
  iconSize: 20,
  spacing: {
    padding: 24,
    itemSpacing: 12,
  },
  borderRadius: 12,
};

export default function SettingsScreen() {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const renderSettingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.settingItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.surfaceVariant }]}>
          <item.icon size={UI_CONSTANTS.iconSize} color={theme.primary} />
        </View>
        <View style={styles.settingItemContent}>
          <Text style={[styles.settingItemTitle, { color: theme.text.primary }]}>
            {item.title}
          </Text>
          <Text style={[styles.settingItemDescription, { color: theme.text.secondary }]}>
            {item.description}
          </Text>
        </View>
      </View>
      <ChevronRight size={UI_CONSTANTS.iconSize} color={theme.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Settings</Text>
        <ThemeToggle />
      </View>

      <ScrollView style={styles.content}>
        {SETTINGS_MENU_ITEMS.map(renderSettingItem)}

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
          onPress={handleLogout}
        >
          <View style={styles.settingItemLeft}>
            <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
              <LogOut size={UI_CONSTANTS.iconSize} color="#ef4444" />
            </View>
            <View style={styles.settingItemContent}>
              <Text style={[styles.settingItemTitle, { color: '#ef4444' }]}>Log Out</Text>
              <Text style={[styles.settingItemDescription, { color: theme.text.secondary }]}>
                Sign out of your account
              </Text>
            </View>
          </View>
          <ChevronRight size={UI_CONSTANTS.iconSize} color={theme.text.secondary} />
        </TouchableOpacity>
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
    paddingHorizontal: UI_CONSTANTS.spacing.padding,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  content: {
    flex: 1,
    padding: UI_CONSTANTS.spacing.padding,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: UI_CONSTANTS.borderRadius,
    marginBottom: UI_CONSTANTS.spacing.itemSpacing,
    borderWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  settingItemDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: UI_CONSTANTS.borderRadius,
    marginTop: 24,
    borderWidth: 1,
  },
});