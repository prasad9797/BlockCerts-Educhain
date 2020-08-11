import { SET_USER } from "../actions/types";
import { SET_ADMIN } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  Admin: false,
  isUser: false,
};

const auth = (state = initialState, action) => {
  console.log(action.type);
  console.log(action.isAdmin);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        Admin: false,
        isUser: true,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAuthenticated: true,
        Admin: action.isAdmin,
        isUser: false,
      };
    default:
      return state;
  }
};

export default auth;
