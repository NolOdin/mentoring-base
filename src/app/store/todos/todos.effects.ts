import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosApiService } from '../../services/todos-api.service';
import { inject } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodosActions } from './todos.actions';

export class TodosEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly todosApiService: TodosApiService = inject(TodosApiService);
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      mergeMap(() => {
        const localStorageTodos = localStorage.getItem('todos');

        if (localStorageTodos) {
          const todos = JSON.parse(localStorageTodos);
          return of(TodosActions.set({ todos }));
        } else {
          return this.todosApiService.getTodos().pipe(
            map((todos) => {
              localStorage.setItem('todos', JSON.stringify(todos));
              return TodosActions.set({ todos });
            }),
            catchError(() => {
              return of({ type: '[Todos] Load Error' });
            })
          );
        }
      })
    )
  );
}
