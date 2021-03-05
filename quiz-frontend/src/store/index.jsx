import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
    isLogged: authReducer
})

export default rootReducer