import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import { postsActions } from '../_actions';
import { styles } from '../_styles';
import { Alert, Loading, Posts } from '../_components';
import { config } from '../_helpers';

const NewRecordsPage = ({
  dispatch,
  navigation,
  randomposts,
  randomposts_loading,
  randomposts_error,
  morerandomposts_loading,
  morerandomposts_error,
}) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    dispatch(postsActions.readNewPosts(0)).then(() => {
      setOffset(15);
      setLoading(false);
    });
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    if (!randomposts_loading) {
      dispatch(postsActions.readNewPosts(0)).then(() => {
        setRefreshing(false);
      });
    }
  };

  const onRefreshError = () => {
    setLoading(true);
    if (!randomposts_loading) {
      dispatch(postsActions.readNewPosts(0)).then(() => {
        setLoading(false);
      });
    }
  };

  const readAllNewPosts = () => {
    console.log(randomposts_loading + " " + morerandomposts_loading)
    if (!randomposts_loading && !morerandomposts_loading) {
      console.log(1)
      dispatch(postsActions.readMoreNewPosts(offset)).then(() => {
        setOffset(offset + 15);
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (randomposts_error !== '') {
    return <Alert message={randomposts_error} onRefresh={onRefreshError} />;
  }

  return (
    <SafeAreaView style={styles.gridContainer}>
      <Posts
        navigation={navigation}
        posts={randomposts}
        posts_name={'randomposts'}
        readAllNewPosts={readAllNewPosts}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const {
    randomposts,
    randomposts_loading,
    randomposts_error,
    morerandomposts_loading,
    morerandomposts_error,
  } = state.posts;
  return {
    randomposts,
    randomposts_loading,
    randomposts_error,
    morerandomposts_loading,
    morerandomposts_error,
  };
}

export default connect(mapStateToProps)(NewRecordsPage);
