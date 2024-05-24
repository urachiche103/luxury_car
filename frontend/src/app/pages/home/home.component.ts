import { Component } from '@angular/core';
import { CarsLayoutComponent } from '../../components/cars-layout/cars-layout.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarsLayoutComponent, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
