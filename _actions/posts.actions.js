import { postsConstants } from '../_constants';
import { postsService } from '../_services';

export const postsActions = {
  readNewPosts,
  readMoreNewPosts,
  readPostsByCategory,
  readPostsMoreByCategory,
  toggleFavorites,
  readFavorites,
  searchPosts,
  searchMorePosts,
};

function readNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readRandomPosts(offset)
      .then((posts) => {
        return postsService
        .getFavoritesPosts()
        .then((req) => JSON.parse(req))
        .then((favorites) => {
          dispatch(success(posts.data, favorites));
        })
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.READ_RANDOM_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.READ_RANDOM_POSTS_FAILURE, error };
  }
}

function readMoreNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readRandomPosts(offset)
      .then((posts) => {
        return postsService
        .getFavoritesPosts()
        .then((req) => JSON.parse(req))
        .then((favorites) => {
          dispatch(success(posts.data, favorites));
        });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_FAILURE, error };
  }
}

function readPostsByCategory(url, category, offset) {
  return (dispatch) => {
    // dispatch(request(category_name));
    return postsService
      .readPostsByCategory(url, category, offset)
      .then((response) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(response.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_REQUEST };
  }
  function success(posts, favorites) {
    return {
      type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_SUCCESS,
      posts,
      favorites,
    };
  }
  function failure(error) {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_FAILURE, error };
  }
}

function readPostsMoreByCategory(url, category, offset) {
  return (dispatch) => {
    // dispatch(request(category_name));
    return postsService
      .readPostsByCategory(url, category, offset)
      .then((response) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(response.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_REQUEST };
  }
  function success(posts, favorites) {
    return {
      type: postsConstants.READ_MORE_POSTS_BY_CATEGORY_SUCCESS,
      posts,
      favorites,
    };
  }
  function failure(error) {
    return { type: postsConstants.READ_ALL_POSTS_BY_CATEGORY_FAILURE, error };
  }
}

function readFavorites() {
  return (dispatch) => {
    return postsService
      .getFavoritesPosts()
      .then((req) => JSON.parse(req))
      .then((json) => {
        if (json !== null && json.length !== 0) {
          dispatch(success(json));
        } else {
          dispatch(failure('Ваш список избранных записей пуст.'));
        }
      });
  };

  function success(posts) {
    return { type: postsConstants.GET_FAVORITES_POSTS_SUCCESS, posts };
  }

  function failure(error) {
    return { type: postsConstants.GET_FAVORITES_POSTS_FAILURE, error };
  }
}

function toggleFavorites(item, posts) {
  return (dispatch) => {
    return postsService
      .getFavoritesPosts()
      .then((req) => JSON.parse(req))
      .then((json) => {
        if (json !== null) {
          var val = false;
          for (var i = 0; i < json.length; i++) {
            if (json[i].ID === item.ID) {
              val = true;
            }
          }
          if (val) {
            const result = json.filter((post) => post.ID !== item.ID);
            postsService.setFavoritesPosts(JSON.stringify(result));
            console.log('Убранно из избранного');
          } else {
            postsService.setFavoritesPosts(
              JSON.stringify([...json, { ...item, favorite: true }])
            );
            console.log('Добавленно в избраное');
          }
        } else {
          postsService.setFavoritesPosts(JSON.stringify([{ ...item, favorite: true }]));
        }
        dispatch(success(item, posts));
      });
  };
  
  function success(item, value) {
    return { type: postsConstants.SET_FAVORITES_POST, item, value };
  }
}

function searchPosts(url, keywords, offset) {
  return (dispatch) => {
    dispatch(request(url, keywords, offset));
    return postsService
      .searchPosts(url, keywords, offset)
      .then((posts) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(posts.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(url, keywords, offset) {
    return { type: postsConstants.SEARCH_POSTS_REQUEST, url, keywords, offset };
  }
  function success(posts, favorites) {
    return { type: postsConstants.SEARCH_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.SEARCH_POSTS_FAILURE, error };
  }
}

function searchMorePosts(url, keywords, offset) {
  return (dispatch) => {
    dispatch(request(url, keywords, offset));
    return postsService
      .searchPosts(url, keywords, offset)
      .then((posts) => {
        return postsService
          .getFavoritesPosts()
          .then((req) => JSON.parse(req))
          .then((favorites) => {
            dispatch(success(posts.data, favorites));
          });
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request() {
    return { type: postsConstants.SEARCH_POSTS_REQUEST };
  }
  function success(posts, favorites) {
    return { type: postsConstants.SEARCH_MORE_POSTS_SUCCESS, posts, favorites };
  }
  function failure(error) {
    return { type: postsConstants.SEARCH_POSTS_FAILURE, error };
  }
}
