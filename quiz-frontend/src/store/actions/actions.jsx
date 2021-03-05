import * as ACTION_TYPES from './action_types';

export const SIGN_IN = (data) => {
    return {
        type: ACTION_TYPES.SIGN_IN,
        payload: data
    }
}

export const SIGN_OUT = () => {
    return {
        type: ACTION_TYPES.SIGN_OUT
    }
}

