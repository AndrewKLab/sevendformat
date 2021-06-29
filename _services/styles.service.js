import AsyncStorage from '@react-native-async-storage/async-storage';

export const styleService = {
  getTheme,
  getFontSize,
};

function getTheme() {
  return AsyncStorage.getItem('theme');
}

function getFontSize() {
  return AsyncStorage.getItem('fontSize');
}
