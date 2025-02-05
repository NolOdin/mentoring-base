import { createSelector } from '@ngrx/store';
import { User } from '../../models/User';
import { AppState } from '../root.reducer';

export interface UserState {
  users: User[];
}

export const selectUsersFeature = (state: AppState) => state.users;
export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users
);
