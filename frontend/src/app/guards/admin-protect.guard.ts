import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Inject, inject } from '@angular/core';

export const adminProtectGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  const role = cookies.get('role');
  if (role==="admin"){
    return true
  }else{
    return false
  }
};
