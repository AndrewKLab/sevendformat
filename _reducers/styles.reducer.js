import React from 'react';
import { stylesConstants } from '../_constants';

const initialState = {};

export function style(state = initialState, action) {
  switch (action.type) {
    case stylesConstants.GET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case stylesConstants.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case stylesConstants.GET_FONTSIZE:
      return {
        ...state,
        fontsize: action.fontsize,
      };
    case stylesConstants.SET_FONTSIZE:
      return {
        ...state,
        fontsize: action.fontsize,
      };
    case stylesConstants.GET_ORINTATION:
      return {
        ...state,
        orintation: action.orintation,
      };
    case stylesConstants.SET_ORINTATION:
      return {
        ...state,
        orintation: action.orintation,
      };
    default:
      return state;
  }
}
