import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../../models/Todo';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    load: emptyProps(),
    set: props<{ todos: Todo[] }>(),
    edit: props<{ todo: Todo }>(),
    create: props<{ todo: Todo }>(),
    delete: props<{ id: number }>(),
  },
});
