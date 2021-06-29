import React, { useState, useEffect } from 'react';
import {
  Divider,
  Drawer,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import { Loading } from '../_components';
import { stylesActions } from '../_actions';
import { MainTheme } from '../_styles';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  NewRecordsNavigator,
  ArchiveNavigator,
  InfoNavigator,
  FavoritesNavigator,
} from './StackRouters.js';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen'

//const Tab = createBottomTabNavigator();
const DrawerNavigator = createDrawerNavigator();

const Router = ({ dispatch, theme }) => {
  const [loading, setLoading] = React.useState(true);


  function CustomDrawerContent({ navigation }) {
    const [active, setActive] = React.useState('Новые записи');
    const selectScreen = (title) => {
      setActive(title);
      navigation.navigate(title);
    };

    return (
      <SafeAreaView>
        <Drawer.Section title="Меню">
          <Drawer.Item
            label="Новые записи"
            icon="newspaper"
            active={active === 'Новые записи'}
            onPress={() => selectScreen('Новые записи')}
          />
          <Drawer.Item
            label="Рубрики"
            icon="archive-outline"
            active={active === 'Архив'}
            onPress={() => selectScreen('Архив')}
          />
          <Drawer.Item
            label="Информация"
            icon="information-outline"
            active={active === 'Информация'}
            onPress={() => selectScreen('Информация')}
          />
        </Drawer.Section>

        <Drawer.Item
          label="Избранное"
          icon="heart-outline"
          active={active === 'Избранное'}
          onPress={() => selectScreen('Избранное')}
        />
      </SafeAreaView>
    );
  }

  useEffect(() => {
    const preLoadParams = async () => {
      const orientation = Orientation.getInitialOrientation()
      await dispatch(stylesActions.setOrintation(orientation))
      await dispatch(stylesActions.getTheme());

      await dispatch(stylesActions.getFontSize());

      setLoading(false);
      SplashScreen.hide();
    }

    preLoadParams();

    // Listner for orientation change LANDSCAPE / PORTRAIT
    Orientation.addOrientationListener(orientationChange);

    return () => {
      // Remember to remove listener
      Orientation.removeOrientationListener(orientationChange);
    };
  }, []);

  const orientationChange = (orientation) => {
    dispatch(stylesActions.setOrintation(orientation));
  };

  // useEffect(() => {
  //   dispatch(stylesActions.getTheme())
  //     .then(() => {
  //       ScreenOrientation.getOrientationAsync().then((info) => {
  //         dispatch(
  //           stylesActions.getOrintation(
  //             info === 1 || info === 2 ? 'portrait' : 'landscape'
  //           )
  //         );
  //       });
  //     })
  //     .then(() => {
  //       dispatch(stylesActions.getFontSize());
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     });
  //   // set initial orientation
  //   // subscribe to future changes
  //   const subscription = ScreenOrientation.addOrientationChangeListener(
  //     (evt) => {
  //       dispatch(
  //         stylesActions.setOrintation(
  //           evt.orientationInfo.orientation === 1 ||
  //             evt.orientationInfo.orientation === 2
  //             ? 'portrait'
  //             : 'landscape'
  //         )
  //       );
  //     }
  //   );

  //   // return a clean up function to unsubscribe from notifications
  //   return () => {
  //     ScreenOrientation.removeOrientationChangeListener(subscription);
  //   };
  // }, [dispatch]);

  if (loading === true) {
    return <Loading />;
  } else {
    return (
      <PaperProvider theme={theme === 'default' ? MainTheme : PaperDarkTheme}>
        <NavigationContainer
          theme={theme === 'default' ? DefaultTheme : DarkTheme}>
          <DrawerNavigator.Navigator
            theme={MainTheme}
            initialRouteName="Новые записи"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerType={'front'}
            drawerContentOptions={{
              activeTintColor: '#9b4be5',
            }}>
            <DrawerNavigator.Screen
              name="Новые записи"
              component={NewRecordsNavigator}
            />

            <DrawerNavigator.Screen name="Архив" component={ArchiveNavigator} />

            <DrawerNavigator.Screen
              name="Информация"
              component={InfoNavigator}
            />

            <DrawerNavigator.Screen
              name="Избранное"
              component={FavoritesNavigator}
            />
          </DrawerNavigator.Navigator>
        </NavigationContainer>
      </PaperProvider >
    );
  }
};

function mapStateToProps(state) {
  const { theme } = state.style;
  return {
    theme,
  };
}

const connectedRouter = connect(mapStateToProps)(Router);
export { connectedRouter as Router };
