import React, { useCallback } from 'react';
import { View, Image, Linking, Alert, ScrollView } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { MainTheme } from '../_styles';

const InfoPage = ({ navigation }) => {
  const handlePress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}>

        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 25,
          }}>
          {
            '«7Д формат» - это новое измерение, которое можно ощутить только сердцем! А еще это проект, рассказывающий о гармоничных взаимоотношениях, полной жизни и живом любящем Боге.'
          }
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          {'Сайты наший изданий:'}
        </Text>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('http://chudostranichki.ru/')}>
          {'Чудесные странички'}
        </Button>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('https://8doktorov.ru')}>
          {'Ключи к здоровью'}
        </Button>
        <Button
          mode="text"
          style={{ fontSize: 16, textAlign: 'center' }}
          onPress={() => handlePress('https://sokrsokr.net/')}>
          {'Сокрытое сокровище'}
        </Button>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon={'instagram'}
            size={50}
            color={'#c13584'}
            onPress={() => handlePress('https://www.instagram.com/new7d/')}
          />
          <IconButton
            icon={'podcast'}
            size={50}
            color={MainTheme.colors.primary}
            onPress={() => handlePress('https://proekt7d.ru/podcasts/')}
          />
          <IconButton
            icon={'facebook'}
            size={50}
            color={'#3b5998'}
            onPress={() => handlePress('https://www.facebook.com/new7d')}
          />
        </View>
      </View>
  );
};


export default InfoPage;
