import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { AutoLoginComponent } from './auto-login.component';
import { FirstChildComponent } from './components/first-child.component';
import { SecondChildComponent } from './components/second-child.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'first',
        component: FirstChildComponent,
        canActivate: [],
      },
      {
        path: 'second',
        component: SecondChildComponent,
        canActivate: [AutoLoginAllRoutesGuard],
      },
    ],
  },
  {
    path: 'auto-login',
    component: AutoLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
