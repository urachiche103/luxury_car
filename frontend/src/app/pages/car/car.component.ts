import { Component, OnInit } from '@angular/core';
import { CarDetailComponent } from '../../components/car-detail/car-detail.component';
import { RentRequestComponent } from '../../components/rent-request/rent-request.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CarDetailComponent, RentRequestComponent],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  storedUserId: string | null = '';

  ngOnInit(): void {
    const sessionUserId = localStorage.getItem('userId');
    if (sessionUserId !== null) {
      this.storedUserId = sessionUserId;
    }
  }
}
