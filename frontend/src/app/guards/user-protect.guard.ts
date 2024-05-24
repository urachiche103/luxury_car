import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const userProtectGuard: CanActivateFn = (route, state) => {
  const cookies =inject (CookieService)
  if (cookies.get('token')){
    return true
  }else {
    return false
  }
};
