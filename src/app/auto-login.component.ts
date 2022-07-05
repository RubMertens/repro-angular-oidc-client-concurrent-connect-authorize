import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'auto-login',
  template: ``,
})
export class AutoLoginComponent implements OnInit {
  constructor(private oidc: OidcSecurityService) {}

  ngOnInit() {
    this.oidc.checkAuth().subscribe(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        this.oidc.authorize();
      }
    });
  }
}
