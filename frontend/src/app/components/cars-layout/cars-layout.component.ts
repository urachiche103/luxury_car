import { CarsService } from './../../services/cars.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarsComponent } from '../../pages/cars/cars.component';
import { Cars } from '../../interfaces/cars';

@Component({
  selector: 'app-cars-layout',
  standalone: true,
  imports: [RouterModule, CarsComponent],
  templateUrl: './cars-layout.component.html',
  styleUrl: './cars-layout.component.scss'
})
export class CarsLayoutComponent implements OnInit {
  cars: Cars []=[]
  constructor(private carsService: CarsService){}
  ngOnInit(): void {
    this.carsService.getAllCars().subscribe({
      next:(res) => this.cars = res as Cars[],
      error:(err) => console.log('No se han podido cargar nuestos Vehiculos'),
      
    })
  }

}
