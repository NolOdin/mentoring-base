import { createSelector } from '@ngrx/store';
import { Todo } from '../../models/Todo';
import { AppState } from '../root.reducer';

export interface TodoState {
  todos: Todo[];
}

export const selectTodosFeature = (state: AppState) => state.todos;
export const selectTodos = createSelector(
  selectTodosFeature,
  (state: TodoState) => state.todos
);
