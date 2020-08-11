import { SET_USER, LOGOUT } from "../actions/types";
import { SET_ADMIN } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  Admin: false,
  jwtToken: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        Admin: false,
        jwtToken: action.token,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAuthenticated: true,
        Admin: true,
        jwtToken: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        Admin: false,
        jwtToken: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
