import { createAction, props } from '@ngrx/store';

import { User } from '../core/models/user.model';

export const setUser = createAction(
  '[AUTH] Set User',
  props<{user: User}>()
);

export const unSetUser = createAction('[AUTH] UnSet User');
