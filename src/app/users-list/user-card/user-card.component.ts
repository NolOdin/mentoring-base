import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { UpperCasePipe } from '@angular/common';
import { CustomUpperCasePipe } from '../../pipes/upper-case.pipe';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { RedDirective } from '../../directives/red.directive';
import { ElShadowDirective } from '../../directives/el-shadow.directive';
import { ElTooltipDirective } from '../../directives/el-tooltip.directive';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    UpperCasePipe,
    CustomUpperCasePipe,
    NumberFormatPipe,
    RedDirective,
    ElShadowDirective,
    ElTooltipDirective,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user: User;
  @Output() deleteUser = new EventEmitter();
  @Output() eidtUser = new EventEmitter();

  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user },
    });
    

    dialogRef.afterClosed().subscribe((editResult) => {
      if (editResult) {
        this.eidtUser.emit(editResult);
        this.snackBar.open('Данные пользователя успешно обновлены!', 'Ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Ошибка при обновлении данных!', 'Ok', {
          duration: 3000,
        });
      }
    });
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((deleteResult) => {
      if (deleteResult) {
        this.deleteUser.emit(deleteResult.id);
        this.snackBar.open('Пользователь успешно удален!', 'Ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Ошибка при удалении пользователя!', 'Ok', {
          duration: 3000,
        });
      }
    });
  }
}
