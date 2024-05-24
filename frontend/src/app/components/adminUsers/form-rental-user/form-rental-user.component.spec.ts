import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRentalUserComponent } from './form-rental-user.component';

describe('FormRentalUserComponent', () => {
  let component: FormRentalUserComponent;
  let fixture: ComponentFixture<FormRentalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRentalUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRentalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
