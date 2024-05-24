import { Component } from '@angular/core';
import { FindCarComponent } from '../../components/admin-car/find-car/find-car.component';

@Component({
  selector: 'app-admin-car',
  standalone: true,
  imports: [FindCarComponent],
  templateUrl: './admin-car.component.html',
  styleUrl: './admin-car.component.scss'
})
export class AdminCarComponent {

}
