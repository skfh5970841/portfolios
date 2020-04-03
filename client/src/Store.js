import { createStore } from "redux";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const login = (isLogined) => {
    return {
        type : LOGIN,
        isLogined: isLogined
    }
}

const logout = () => {
    return {
        type : LOGOUT,
        isLogined: false
    }
}

const reducer = (state = false, action) =>{
    switch (action.type) {
        case LOGIN:
            return action.isLogined;  
        case LOGOUT: 
            return false;
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    login,
    logout
}

export default store;