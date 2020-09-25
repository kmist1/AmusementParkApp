import {IUserState} from "../states/IUserState";
import {AnyAction} from "redux";
import {EUserActions} from "../actions/UserActions";


const DEFAULT_STATE: IUserState = {

    email: ''
}

export function userReducer (state= DEFAULT_STATE, action: AnyAction) : IUserState {


    switch(action.type) {

        case EUserActions.CHANGE_EMAIL:
            console.log('email at reducer');
            return {...state, email: action.email}



        default:
            return state;

    }
}