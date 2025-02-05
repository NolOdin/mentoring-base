import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TodosApiService } from '../services/todos-api.service';
import { Todo } from '../models/Todo';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosService } from '../services/todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { Store } from '@ngrx/store';
import { selectTodos } from '../store/todos/todos.selectors';
import { TodosActions } from '../store/todos/todos.actions';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent implements OnInit{
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {}
  
  ngOnInit(): void {
    this.todosApiService.getTodos().subscribe((res: Todo[]) => {
      this.todosService.setTodos(res);
      this.store.dispatch(TodosActions.set({ todos: res }));
    });
  }

  deleteTodos(id: number) {
    this.todosService.deleteTodo(id);
    this.store.dispatch(TodosActions.delete({ id }));
  }
  public createTodo(formData: Todo) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formData.title,
      userId: new Date().getTime(),
      completed: formData.completed,
    });
    this.store.dispatch(
      TodosActions.create({
        todo: {
          id: new Date().getTime(),
          title: formData.title,
          userId: new Date().getTime(),
          completed: formData.completed,
        },
      })
    );
  }
}
