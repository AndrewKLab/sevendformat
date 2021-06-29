import { stylesConstants } from '../_constants';
import { styleService } from '../_services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const stylesActions = {
  getTheme,
  setTheme,
  getFontSize,
  setFontSize,
  getOrintation,
  setOrintation,
};

function getTheme() {
  return (dispatch) => {
    return styleService.getTheme().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('theme', 'default');
        dispatch(failure('default'));
      }
    });
  };

  function success(theme) {
    return { type: stylesConstants.GET_THEME, theme };
  }
  function failure(theme) {
    return { type: stylesConstants.GET_THEME, theme };
  }
}

function setTheme(theme) {
  AsyncStorage.setItem('theme', theme);
  return { type: stylesConstants.SET_THEME, theme };
}

function getFontSize() {
  return (dispatch) => {
    return styleService.getFontSize().then((response) => {
      if (response !== null) {
        dispatch(success(response));
      } else {
        AsyncStorage.setItem('fontSize', '14');
        dispatch(failure('14'));
      }
    });
  };

  function success(fontsize) {
    return { type: stylesConstants.GET_FONTSIZE, fontsize };
  }
  function failure(fontsize) {
    return { type: stylesConstants.GET_FONTSIZE, fontsize };
  }
}

function setFontSize(fontsize) {
  AsyncStorage.setItem('fontSize', fontsize);
  return { type: stylesConstants.SET_FONTSIZE, fontsize };
}

function getOrintation(orintation) {
  return { type: stylesConstants.GET_ORINTATION, orintation };
}

function setOrintation(orintation) {
  return { type: stylesConstants.SET_ORINTATION, orintation };
}
