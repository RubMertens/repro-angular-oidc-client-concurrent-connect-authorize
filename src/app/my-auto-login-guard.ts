import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MyAutoLoginGuard implements CanActivate {
  constructor(private oidc: OidcSecurityService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.oidc.checkAuth().pipe(
      map((x) => {
        if (x.isAuthenticated) return true;
        return this.router.createUrlTree(['/auto-login']);
      })
    );
  }
}
