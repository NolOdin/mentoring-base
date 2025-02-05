import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/User';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    set: props<{ users: User[] }>(),
    edit: props<{ user: User }>(),
    create: props<{ user: User }>(),
    delete: props<{ id: number }>(),
  },
});
