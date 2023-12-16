// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class LoggedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  canActivateExit(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.getLoggedValue()) {
      return true;
    }
    this.router.navigate(['/routine']);
    return true;
  }

  private checkLogin(): boolean {
    if (this.authService.getLoggedValue()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

export const isLoggedGuard = (): boolean => {
  return inject(LoggedGuard).canActivate();
};

export const isNotLoggedGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LoggedGuard).canActivateExit(route, state);
};
