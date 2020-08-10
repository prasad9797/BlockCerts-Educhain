import { SET_USER } from '../actions/types';
import { SET_ADMIN } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    isUser: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: false,
                isUser: true
            };
        case SET_ADMIN:
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: true,
                isUser: false
            };
        default:
            return state;
    }
}

export default auth;