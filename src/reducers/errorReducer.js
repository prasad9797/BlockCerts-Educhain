import { SET_ERROR } from '../actions/types';

const initialState = {
    errors: ""
};

const error = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                errors: action.errors
            }

        default:
            return state;
    }
}

export default error;