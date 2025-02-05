import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/users/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todosReducer } from './store/todos/todos.reducer';
import { reducers } from './store/root.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideStore(reducers), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects(UsersEffects)]
};
