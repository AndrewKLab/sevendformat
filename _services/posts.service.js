import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postsService = {
  readRandomPosts,
  readPostsByCategory,
  getFavoritesPosts,
  setFavoritesPosts,
  searchPosts,
};

function readRandomPosts(offset) {
  return axios.get(`https://proekt7d.ru/api/v1/post/read_random_posts.php?o=${offset}&l=15`);
}

function readPostsByCategory(url, category, offset) {
  return axios.get(
    `${url}/api/v1/post/read_posts_by_category.php?c=${category}&o=${offset}`
  );
}

function searchPosts(url, keywords, offset) {
  return axios.get(
    `${url}/api/v1/post/search.php?s=${keywords}&o=${offset}`
  );
}

function getFavoritesPosts() {
  return AsyncStorage.getItem('favorites');
}

function setFavoritesPosts(item) {
  return AsyncStorage.setItem('favorites', item);
}

