import {
  SET_USER,
  SET_ADMIN,
  LOGOUT,
  UPLOAD_SVG,
  UPLOAD_CSV,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  Admin: false,
  jwtToken: null,
  username: null,
  svgName: null,
  svgSlug: null,
  svg: {},
  csv: null,
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
    case UPLOAD_SVG:
      console.log("Payload", action.svgPayload);
      console.log("Name", action.svgName);
      return {
        ...state,
        svgName: action.svgName,
        svgSlug: action.svgSlug,
        svg:
          action.isSvgUploaded == true
            ? URL.createObjectURL(action.svgPayload)
            : action.svgPayload,
      };
    case UPLOAD_CSV:
      return {
        ...state,
        csv: action.csvPayload,
      };
    default:
      return state;
  }
};

export default rootReducer;
