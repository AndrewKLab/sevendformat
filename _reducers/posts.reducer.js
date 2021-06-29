import { postsConstants } from '../_constants';
import { favorites } from '../_helpers';

const initialState = {
  randomposts: [],
  randomposts_loading: true,
  randomposts_error: '',
  morerandomposts_loading: false,
  morerandomposts_error: '',
  randomposts: [],
  posts: [],
  favorites_posts: [],
  search_posts: [],
};


export function posts(state = initialState, action) {
  switch (action.type) {
    // READ RANDOM POSTS
    case postsConstants.READ_RANDOM_POSTS_REQUEST:
      return {
        ...state,
        randomposts_loading: true,
        randomposts_error: '',
      };

    case postsConstants.READ_RANDOM_POSTS_SUCCESS:
      var newposts = favorites.mergePostsAndFavorites(action);
      return {
        ...state,
        randomposts: newposts,
        randomposts_loading: false,
        randomposts_error: '',
      };

    case postsConstants.READ_RANDOM_POSTS_FAILURE:
      return {
        ...state,
        randomposts_error: action.error.message,
        randomposts_loading: false,
      };

    // READ MORE RANDOM POSTS
    case postsConstants.READ_MORE_RANDOM_POSTS_REQUEST:
      return {
        ...state,
        morerandomposts_loading: true,
        morerandomposts_error: '',
      };

    case postsConstants.READ_MORE_RANDOM_POSTS_SUCCESS:
      var newmoreposts = favorites.mergePostsAndFavorites(action);
      return {
        ...state,
        randomposts: [...state.randomposts, ...newmoreposts],
        morerandomposts_loading: false,
        morerandomposts_error: '',
      };

    case postsConstants.READ_MORE_RANDOM_POSTS_FAILURE:
      return {
        ...state,
        morerandomposts_loading: action.error.message,
        morerandomposts_error: false,
      };

    case postsConstants.READ_ALL_POSTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        urls: action.urls,
        posts_loading: true,
        posts_error: '',
      };

    case postsConstants.READ_ALL_POSTS_BY_CATEGORY_SUCCESS:
      var posts = favorites.mergePostsAndFavorites(action);
      return {
        ...state,
        posts: posts,
        posts_loading: false,
        posts_error: '',
      };

    case postsConstants.READ_MORE_POSTS_BY_CATEGORY_SUCCESS:
      var moreposts = favorites.mergePostsAndFavorites(action);
      return {
        ...state,
        posts: [...state.posts, ...moreposts],
        posts_loading: false,
        posts_error: '',
      };

    case postsConstants.READ_ALL_POSTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        posts_loading: false,
        posts_error: action.error.message,
      };

    case postsConstants.SET_FAVORITES_POST:
      if (action.value === 'favorites_posts') {
        const result = state.favorites_posts.filter(
          (post) => post.ID !== action.item.ID
        );
        return {
          ...state,
          favorites_posts: result,
          randomposts:
            state.randomposts.length !== 0
              ? state.randomposts.map((post) =>
                post.ID === action.item.ID
                  ? { ...post, favorite: !post.favorite }
                  : post
              )
              : [],
        };
      } else {
        var favresult = [];
        if (action.item.favorite) {
          favresult = state.favorites_posts.filter(
            (post) => post.ID !== action.item.ID
          );
        } else {
          favresult = [
            ...state.favorites_posts,
            { ...action.item, favorite: true },
          ];
        }
        return {
          ...state,
          [action.value]: state[action.value].map((post) =>
            post.ID === action.item.ID
              ? { ...post, favorite: !post.favorite }
              : post
          ),
          favorites_posts: favresult,
        };
      }

    case postsConstants.GET_FAVORITES_POSTS_SUCCESS:
      return {
        ...state,
        favorites_posts: action.posts,
        favorites_error: null,
      };

    case postsConstants.GET_FAVORITES_POSTS_FAILURE:
      return {
        ...state,
        favorites_error: action.error,
      };

    case postsConstants.SEARCH_POSTS_REQUEST:
      return {
        ...state,
        posts_loading: true,
        posts_error: '',
      };

    case postsConstants.SEARCH_POSTS_SUCCESS:
      var searchposts = favorites.mergePostsAndFavorites(action);

      return {
        ...state,
        search_posts: searchposts,
        posts_loading: false,
        posts_error: '',
      };
    case postsConstants.SEARCH_MORE_POSTS_SUCCESS:
      var more_search_posts = favorites.mergePostsAndFavorites(action);
      return {
        ...state,
        search_posts: [...state.search_posts, ...more_search_posts],
        posts_loading: false,
        posts_error: '',
      };

    case postsConstants.SEARCH_POSTS_FAILURE:
      return {
        ...state,
        posts_error: action.error.message,
        posts_loading: false,
      };

    default:
      return state;
  }
}
