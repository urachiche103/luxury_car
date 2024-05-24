import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarComponent } from './admin-car.component';

describe('AdminCarComponent', () => {
  let component: AdminCarComponent;
  let fixture: ComponentFixture<AdminCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
