import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentComponent } from './user-rent.component';

describe('UserRentComponent', () => {
  let component: UserRentComponent;
  let fixture: ComponentFixture<UserRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
