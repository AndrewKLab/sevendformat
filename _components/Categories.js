import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { categoriesActions, postsActions } from '../_actions';
import { styles } from '../_styles';
import { Loading, Posts, Alert } from '../_components';

const Categories = ({
  dispatch,
  navigation,
  route,
  categories,
  theme,
  categories_error,
  search_posts,
  posts_loading,
  posts_error,
}) => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(categoriesActions.readAllCategories('https://proekt7d.ru/')).then(() =>
      setLoading(false)
    );
  }, [dispatch, route]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setLoading(true);
    setOffset(0);
    dispatch(postsActions.searchPosts('https://proekt7d.ru/', query, offset)).then(
      () => {
        setOffset(offset + 10);
        setLoading(false);
      }
    );
    console.log(query);
  };

  const readAllNewPosts = () => {
    if (!posts_loading && posts_error === '') {
      dispatch(
        postsActions.searchMorePosts('https://proekt7d.ru/', searchQuery, offset)
      ).then(() => {
        setOffset(offset + 10);
      });
    }
  };

  if (categories_error !== '') {
    return (
      <Alert
        message={"Ошибка соединения. Рубрики не найдены."}
        onRefresh={() => {
          dispatch(
            categoriesActions.readAllCategories('https://proekt7d.ru/')
          ).then(() => setLoading(false));
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.gridContainer}>
      <Searchbar
        placeholder="Поиск..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ borderRadius: 0 }}
      />
      {loading ? (
        <Loading />
      ) : searchQuery !== '' && !loading ? (
        <Posts
          navigation={navigation}
          posts={search_posts}
          posts_name={'search_posts'}
          readAllNewPosts={readAllNewPosts}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            return item.subcategories.length > 0 ? (
              <List.Accordion
                title={item.name}
                left={(props) => <List.Icon {...props} icon="folder" style={{ marginLeft: 0, marginRight: 16 }} />}>
                {item.subcategories.map((subcategory, index) => (
                  <List.Item
                    title={subcategory.name}
                    key={index}
                    onPress={() => {
                      navigation.navigate('Записи', {
                        title: subcategory.name,
                        category: subcategory.term_id,
                        link: 'https://proekt7d.ru/',
                      });
                    }}
                  />
                ))}
              </List.Accordion>
            ) : (
              <List.Item
                left={(props) => <List.Icon {...props} icon="folder" />}
                title={item.name}
                style={{ backgroundColor: theme === 'default' ? '#f6f6f6' : '#141414' }}
                onPress={() => {
                  navigation.navigate('Записи', {
                    title: item.name,
                    category: item.term_id,
                    link: 'https://proekt7d.ru/',
                  });
                }}
              />
            );
          }}
          keyExtractor={(reccord, index) => index}
        />
      )}
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  const { categories, categories_loading, categories_error } = state.categories;
  const { search_posts, posts_loading, posts_error } = state.posts;
  const { theme } = state.style;
  return {
    theme,
    categories,
    categories_loading,
    categories_error,
    search_posts,
    posts_loading,
    posts_error,
  };
}
const connectedCategories = connect(mapStateToProps)(Categories);
export { connectedCategories as Categories };
