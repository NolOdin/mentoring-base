import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LimitTextPipe } from '../../pipes/limit-text.pipe';
import { SetDatePipe } from '../../pipes/set-date.pipe';
import { DatePipe } from '@angular/common';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [LimitTextPipe, SetDatePipe ],
  providers: [DatePipe],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() todo: Todo;
  @Output()

  deleteTodo = new EventEmitter()
  readonly myDate = new Date()
  onDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId)
  }
}
