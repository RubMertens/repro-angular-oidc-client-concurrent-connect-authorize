# Repro steps

open the developer console to see when the idtoken (or accessstoken) is about to renew.

_Just_ when that is happening start navigating between first and second child component. Because both are guarded by the `AutoLoginAllRoutesGuard` they will trigger a normal `authorize`.

If the silent renew triggers before the page navigation flow has completed you will get a **400 BAD REQUEST** on the connect/token endpoint.

![error logs](Screenshot%202022-07-05%20075425.png)

## issue

The [code-flow-callback-handler](https://github.com/damienbod/angular-auth-oidc-client/blob/00dd0556f4de35d2a6aeb920624636dd0583e48e/projects/angular-auth-oidc-client/src/lib/flows/callback-handling/code-flow-callback-handler.service.ts#L26) checks if a silent renew is running when handling the callback for a code flow.

[Here](https://github.com/damienbod/angular-auth-oidc-client/blob/00dd0556f4de35d2a6aeb920624636dd0583e48e/projects/angular-auth-oidc-client/src/lib/utils/url/url.service.ts#L219) a `flowsDataService` is checked to see wether a silent renew is currently running. Setting the redirect_uri to `/silent-renew.html` instead of the `oidc-callback` redirect_uri.

IdentityServer4 checks this and throws a 400 on the token request as a result of them being different (and thus not belonging to the same code flow).

The `isSilentRenewRunning` by default uses sessionStorage to check if a silent-renew is running.

I think the offending `setSilentRenewRunning` happens [here](https://github.com/damienbod/angular-auth-oidc-client/blob/00dd0556f4de35d2a6aeb920624636dd0583e48e/projects/angular-auth-oidc-client/src/lib/callback/periodically-token-check.service.ts#L128)

## version info

package.json
Angular 14.0.4 with angular-auth-oidc-client 14.1.0

```
{
  "name": "repro-angular-oidc-client",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^14.0.4",
    "@angular/common": "^14.0.4",
    "@angular/compiler": "^14.0.4",
    "@angular/core": "^14.0.4",
    "@angular/forms": "^14.0.4",
    "@angular/platform-browser": "^14.0.4",
    "@angular/platform-browser-dynamic": "^14.0.4",
    "@angular/router": "^14.0.4",
    "angular-auth-oidc-client": "14.1.0",
    "rxjs": "~7.5.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^14.0.4",
    "@angular/cli": "^14.0.4",
    "@angular/compiler-cli": "^14.0.4",
    "@types/jasmine": "~3.10.0",
    "@types/node": "^12.11.1",
    "jasmine-core": "~4.0.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.1.0",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "typescript": "~4.6.2"
  }
}
```

### tracked here
