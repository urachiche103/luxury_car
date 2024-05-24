import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cars } from '../../interfaces/cars';
import { CarsService } from '../../services/cars.service';
import { FindCarComponent } from '../../components/find-car/find-car.component';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [RouterModule, FindCarComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent implements OnInit {
  cars: Cars[] = [];
  constructor(private carsService: CarsService) {}
  
  ngOnInit(): void {
    this.carsService.getAllCars().subscribe({
      next: (res) => (this.cars = res as Cars[]),
      error: (err) => console.log('No se han podido cargar nuestos Vehiculos'),
    });
  }
}
