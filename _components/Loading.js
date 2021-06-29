import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { MainTheme } from '../_styles';

export const Loading = () => (
  <ActivityIndicator
    animating={true}
    color={MainTheme.colors.primary}
    style={{ flex: 1 }}
    size="large"
  />
);
