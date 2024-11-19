import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(AuthService);

  return login.isAuth();
};

export const loginGuard: CanActivateFn = (route, state) => {
  const login = inject(AuthService);

  return login.isLoggedIn();
};
