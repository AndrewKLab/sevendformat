import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { ReccordItem } from '../_components';

const Posts = ({
  dispatch,
  navigation,
  randomposts_error,
  posts,
  posts_name,
  orintation,
  readAllNewPosts,
  onRefresh,
  refreshing,
}) => {
  const renderFooter = () => {
    if (randomposts_error === '' && readAllNewPosts !== undefined) {
      return (
        //Footer View with Load More button
        <SafeAreaView
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator color="red" />
        </SafeAreaView>
      );
    } else {
      return null;
    }
  };

  return (
    <FlatList
      data={posts}
      onEndReachedThreshold={0.5}
      onEndReached={readAllNewPosts}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <ReccordItem
          item={item}
          navigation={navigation}
          dispatch={dispatch}
          posts={posts_name}
        />
      )}
      //Setting the number of column
      numColumns={orintation === 'landscape' ? 2 : 1}
      key={orintation === 'landscape' ? 2 : 1}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

function mapStateToProps(state) {
  const { orintation } = state.style;
  const { randomposts_error } = state.posts;
  return {
    orintation,
    randomposts_error,
  };
}

const connectedPosts = connect(mapStateToProps)(Posts);
export { connectedPosts as Posts };
