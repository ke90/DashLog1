
//import {BUCHUNGDATE_LIST_REQUEST, BUCHUNGDATE_LIST_SUCCESS, BUCHUNGDATE_LIST_FAIL} from '../constants/buchungConstants'

const initialState = { loggedInUser: [], loggedIn: false};
export const userReducer = (state = initialState, action) => {
    
    switch(action.type){            
        
        case 'SET_USER':
            return { ...state,loggedIn: true, loggedInUser: action.payload };
        case 'RESET_USER':
            return { ...state,loggedIn: false, loggedInUser: [] };

        default:
            return state
    }
}
