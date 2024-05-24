import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentComponent } from './admin-rent.component';

describe('AdminRentComponent', () => {
  let component: AdminRentComponent;
  let fixture: ComponentFixture<AdminRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
