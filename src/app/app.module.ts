import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { FirstChildComponent } from './components/first-child.component';
import { SecondChildComponent } from './components/second-child.component';

@NgModule({
  declarations: [AppComponent, FirstChildComponent, SecondChildComponent],
  imports: [BrowserModule, AppRoutingModule, AuthConfigModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
