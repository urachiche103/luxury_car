import { Component, Input, input } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { FindCarComponent } from '../find-car/find-car.component';
import { Cars } from '../../interfaces/cars';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterOutlet, FindCarComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() car?: Cars;

  constructor(private route: Router) {}

  navigateToCar(carId: any): void {
    this.route.navigate([`cars/${carId}`]);
  }
}
