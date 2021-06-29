import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  List,
  Card,
  Title,
  Divider,
  IconButton,
  Text,
  Caption,
} from 'react-native-paper';
import { onShare } from '../_helpers';
import { postsActions } from '../_actions';
import { styles, MainTheme } from '../_styles';
import moment from 'moment';
import localization from 'moment/locale/ru';


export const ReccordItem = ({ item, navigation, dispatch, posts }) => {
  return (
    <Card
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate('Запись', {
          title: item.post_title,
          reccord: item,
          posts: posts
        });
      }}>
      <Card.Cover source={{ uri: item.img }} />
      <Card.Content style={{ marginVertical: 5 }}>
        <Title>{item.post_title}</Title>
      </Card.Content>
      <Divider />
      <Card.Actions style={{ justifyContent: 'space-between' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton icon="eye" size={24} />
          <Text>{item.views}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon={item.favorite === true ? 'heart' : 'heart-outline'}
            size={24}
            onPress={() => dispatch(postsActions.toggleFavorites(item, posts))}
          />
          <IconButton
            icon="share"
            size={24}
            onPress={() => onShare(item.guid)}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};
