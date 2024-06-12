import {
  AUTH_ERROR,
  AUTH_LOADING,
  GET_ORDERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_USER,
  USER_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

      
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
        loading: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        userLoading: false,
        loading: false,
        user: null
      };

    case REGISTER:
    case LOGIN:
      return {
        ...state,
        // loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
