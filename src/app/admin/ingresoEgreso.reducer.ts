import { IngresoEgreso } from './../core/models/ingresoEgreso.model';
import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from './ingresoEgreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(actions.setItems, (state, {items}) => ({ ...state, items: [...items] })),
    on(actions.unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
