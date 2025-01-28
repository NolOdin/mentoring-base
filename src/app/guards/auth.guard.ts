import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userServ = inject(UserService);
  const router = inject(Router);

  if (userServ.isAdmin === true) {
    console.log(userServ.isAdmin)
    return true;
  } else {
    console.log(userServ.isAdmin)
    router.navigate(['./todos'])
    return false;
  }
};
