import {
  DARK_MODE_ENABLE,
  DARK_MODE_DISABLE
} from '../constants/darkModeConstants';

export const darkModeReducer = (state = { isDark: false }, action) => {
  switch (action.type) {
    case DARK_MODE_ENABLE:
      return { isDark: true };
    case DARK_MODE_DISABLE:
      return { isDark: false };
    default:
      return state;
  }
};
