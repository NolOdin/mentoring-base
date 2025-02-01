import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { YelBackgroundDirective } from './directives/yel-background.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from './auth/auth.component';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    RouterLink,
    YelBackgroundDirective,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'mentoring-first-project';

  public readonly dialog = inject(MatDialog);
  public readonly userServ = inject(UserService);

  public openAuthDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {});

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'admin') {
        this.userServ.loginAsAdmin();
      } else if (res === 'user') {
        this.userServ.loginAsUser();
      } else {
        return undefined;
      }
    });
  }
  public logout() {
    if (confirm('Вы точно хотите выйти ?')) {
      return this.userServ.logout();
    } else {
      return false;
    }
  }

  isUpperCase = true;

  menuItems = [
    'Каталог',
    'Стройматериалы',
    'Инструменты',
    'Электрика',
    'Интерьер и одежда',
  ];

  upperCaseVal = this.menuItems.map((e) => {
    return e.toUpperCase();
  });

  changeMenuText() {
    this.menuItems = this.upperCaseVal.map((e) =>
      this.isUpperCase ? e.toUpperCase() : e.toLowerCase()
    );

    this.isUpperCase = !this.isUpperCase;
  }

  headerItem1 = 'Главная';
  aboutCompany = 'О компании';
  headerItem3 = 'Каталог';
  headerItem4 = 'Пользователи';
  headerItem5 = 'Тудушки';
  headerItem6 = 'Админка';

  secondHeaderItem1 = 'Стройматериалы';
  secondHeaderItem2 = 'Инструменты';
  secondHeaderItem3 = 'Электрика';
  secondHeaderItem4 = 'Интерьер и одежда';
}
