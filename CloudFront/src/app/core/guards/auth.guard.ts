import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn();
  if (!isAuthenticated) {
    router.navigate(['login-register']);
  }

  return isAuthenticated;
};
