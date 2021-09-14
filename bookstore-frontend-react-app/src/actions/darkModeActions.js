import { DARK_MODE_ENABLE, DARK_MODE_DISABLE } from '../constants/darkModeConstants';

export const ENABLE_DARK_MODE = () => (dispatch) => {
  dispatch({ type: DARK_MODE_ENABLE });
};

export const DISABLE_DARK_MODE = () => (dispatch) => {
  dispatch({ type: DARK_MODE_DISABLE });
};