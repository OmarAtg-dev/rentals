export const lightTheme = {
  background: '#ffffff',
  surface: '#f8f9fa',
  surfaceVariant: '#e6f0ff',
  border: '#e5e5e5',
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#888888',
  },
  primary: '#0066cc',
  white: '#ffffff',
  black: '#000000',
};

export const darkTheme = {
  background: '#000000',
  surface: '#111111',
  surfaceVariant: '#222222',
  border: '#222222',
  text: {
    primary: '#ffffff',
    secondary: '#888888',
    tertiary: '#666666',
  },
  primary: '#ffffff',
  white: '#ffffff',
  black: '#000000',
};

export type Theme = typeof lightTheme;