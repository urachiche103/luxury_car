import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFindUserComponent } from './form-find-user.component';

describe('FormFindUserComponent', () => {
  let component: FormFindUserComponent;
  let fixture: ComponentFixture<FormFindUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFindUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFindUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
