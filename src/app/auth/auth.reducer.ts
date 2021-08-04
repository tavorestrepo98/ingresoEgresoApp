import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';

import { User } from '../core/models/user.model';

export interface State {
    user: User;
}

export const initialState: State = {
   user: null
}

const _authReducer = createReducer(initialState,

    on(actions.setUser, (state, {user}) => ({ ...state, user: {...user} }) ),
    on(actions.unSetUser, (state) => ({ user: null }) ),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
