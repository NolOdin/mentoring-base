import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface IUser {
  name: string
  email: string
  isAdmin: boolean | null
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSubject$ = new BehaviorSubject<IUser | null>(null)
  public readonly user$ = this.userSubject$.asObservable()

  private user: IUser = {
    name: 'Maga',
    email: 'maga@email.com',
    isAdmin: null
  }

  loginAsAdmin () {
    this.userSubject$.next({...this.user, isAdmin: true, })
    console.log('Вы вошли как Админ')
  }
  loginAsUser () {
    this.userSubject$.next({...this.user, isAdmin: false, })
    console.log('Вы вошли как Пользователь')
  }
  logout () {
    this.userSubject$.next(null)
  }

  get isAdmin () {
    return this.userSubject$.value?.isAdmin
  }

}
