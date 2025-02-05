import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { User } from '../models/User';
import { UsersApiSevice } from '../services/users-api.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UsersService } from '../services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { Store } from '@ngrx/store';
import { UsersActions } from '../store/users/users.actions';
import { selectUsers } from '../store/users/users.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  readonly usersApiService = inject(UsersApiSevice);
  readonly usersService = inject(UsersService);
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public users$: Observable<User[]> = this.store.select(selectUsers);

  constructor() {}

  ngOnInit() {
    this.usersApiService.getUsers().subscribe((res: User[]) => {
      this.usersService.setUsers(res);
      this.store.dispatch(UsersActions.set({ users: res }));
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((createResult) => {
      if (createResult) {
        this.usersService.createUser({
          id: new Date().getTime(),
          name: createResult.name,
          email: createResult.email,
          company: {
            name: createResult.company.name,
          },
          website: createResult.website,
          phone: createResult.phone,
        });
        this.store.dispatch(
          UsersActions.create({
            user: {
              id: new Date().getTime(),
              name: createResult.name,
              email: createResult.email,
              company: {
                name: createResult.company.name,
              },
              website: createResult.website,
              phone: createResult.phone,
            },
          })
        );
        this.snackBar.open('Пользователь успешно создан!', 'Ок', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Ошибка! пользователь не создан', 'Ок', {
          duration: 3000,
        });
      }
    });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
    this.store.dispatch(UsersActions.delete({ id }));
  }

  editUser(user: User) {
    this.store.dispatch(UsersActions.edit({ user }));
  }
}
