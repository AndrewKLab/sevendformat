import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { List, Text, Title, IconButton, Divider } from 'react-native-paper';
import { Container } from '../_components';
import { styles } from '../_styles';
import { onShare } from '../_helpers';
import { connect } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import localization from 'moment/locale/ru';
import { postsActions } from '../_actions';

const Reccord = ({ route, dispatch, fontsize, theme }) => {
  const rec = route.params.reccord;
  const posts = route.params.posts;
  const [favorite, setFavorite] = useState(rec.favorite);
  return (
    <ScrollView style={styles.container}>
      <Container>
        <Image source={{ uri: rec.img }} style={styles.recordImage} />
        <Title
          style={{
            fontSize: Number(fontsize) * 1.5,
            paddingTop: Number(fontsize) / 2,
            marginTop: Number(fontsize) / 2,
          }}>
          {rec.post_title}
        </Title>
        <RenderHtml
          source={{ html: rec.post_content }}
          baseFontStyle={{
            fontSize: Number(fontsize),
            color: theme === 'default' ? '#000' : '#FFFFFF',
          }}
        />
        <Divider />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconButton icon="eye" size={24} />
              <Text>{rec.views}</Text>
            </View>
            <IconButton
              icon={favorite === true ? 'heart' : 'heart-outline'}
              size={24}
              onPress={() => { dispatch(postsActions.toggleFavorites(rec, posts)), setFavorite(!favorite) }}
            />
            <IconButton
              icon="share"
              size={24}
              onPress={() => onShare(rec.guid)}
            />
          </View>
        </View>
        <Divider style={styles.mb2} />
      </Container>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  const { fontsize, theme } = state.style;
  return {
    fontsize,
    theme,
  };
}

const connectedReccord = connect(mapStateToProps)(Reccord);
export { connectedReccord as Reccord };
