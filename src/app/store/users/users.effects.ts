import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UsersApiSevice } from '../../services/users-api.service';
import { of } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsersEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly usersApiService: UsersApiSevice = inject(UsersApiSevice);
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.load),
      mergeMap(() => {
        const localStorageUsers = localStorage.getItem('users');

        if (localStorageUsers) {
          const users = JSON.parse(localStorageUsers);
          return of(UsersActions.set({ users }));
        } else {
          return this.usersApiService.getUsers().pipe(
            map((users) => {
              localStorage.setItem('users', JSON.stringify(users));
              return UsersActions.set({ users });
            }),
            catchError(() => {
              return of({ type: '[Users] Load Error' });
            })
          );
        }
      })
    )
  );
  saveUsersToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.create, UsersActions.edit, UsersActions.delete),
        tap((action) => {
          const currentUsers = JSON.parse(
            localStorage.getItem('users') || '[]'
          );

          if (action.type === UsersActions.create.type) {
            const updatedUsers = [...currentUsers, action.user];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
          } else if (action.type === UsersActions.edit.type) {
            const updatedUsers = currentUsers.map((user: User) =>
              user.id === action.user.id ? action.user : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
          } else if (action.type === UsersActions.delete.type) {
            const updatedUsers = currentUsers.filter(
              (user: User) => user.id !== action.id
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
          }
        })
      ),
    { dispatch: false }
  );
}
