import * as ACTION_TYPES from '../actions/action_types'


const authReducer = (state = null, action) => {
    switch (action.type) {
        case ACTION_TYPES.SIGN_IN:
            const payload = action.payload
            return {
                ...state,
                payload
            }
        case ACTION_TYPES.SIGN_OUT:
            return null

        default:
            return state

    }

}

export default authReducer;