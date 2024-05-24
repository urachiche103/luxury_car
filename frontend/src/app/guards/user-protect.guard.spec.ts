import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userProtectGuard } from './user-protect.guard';

describe('userProtectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userProtectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
