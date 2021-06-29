import { DefaultTheme } from 'react-native-paper';

export const MainTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ea4e11',
    accent: '#ff3347',
    light: {
      background: '#fffff',
      icongray: '#757575',
    },
    dark: {
      background: '#1f1f1f',
      icongray: '#6f6f70',
    },
  },
};
