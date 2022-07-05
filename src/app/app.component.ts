import { Component, OnInit } from '@angular/core';
import {
  OidcSecurityService,
  PublicEventsService,
} from 'angular-auth-oidc-client';
import { EMPTY, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isAuthenticated$: Observable<boolean> = EMPTY;
  constructor(
    public oidc: OidcSecurityService,
    private events: PublicEventsService
  ) {}
  ngOnInit(): void {
    this.oidc.checkAuth().subscribe((x) => {
      console.log(x);
    });

    this.events.registerForEvents().subscribe((e) => console.log(e));

    this.isAuthenticated$ = this.oidc.isAuthenticated$.pipe(
      map((res) => res.isAuthenticated)
    );
  }

  public login() {
    this.oidc.authorize();
  }

  public logout() {
    this.oidc.logoff();
  }
}
