import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCarComponent } from './find-car.component';

describe('FindCarComponent', () => {
  let component: FindCarComponent;
  let fixture: ComponentFixture<FindCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
