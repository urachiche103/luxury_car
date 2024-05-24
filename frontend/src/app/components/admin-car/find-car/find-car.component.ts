import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CarsService } from './../../../services/cars.service';
import { Cars } from '../../../interfaces/cars';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-find-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.scss'],
})
export class FindCarComponent implements OnInit {
  cars: Cars[] = [];
  filteredCars: Cars[] = []; // Inicializo el filtro con todos los coches
  searchControl = new FormControl(''); // Documentacion dice que puedo comenzar el form control así

  //inyecto el servicio de coches (httpclient)
  constructor(private carsService: CarsService, private route: Router) {}

  // Cargo los coches y la funcion que se suscribe al evento en la barra de busqueda al principio de la página
  ngOnInit(): void {
    this.fetchAllCars();
    this.setupSearch();
  }

  // Cargo todos los coches
  fetchAllCars(): void {
    this.carsService.getAllCars().subscribe({
      next: (res: any) => {
        this.cars = res as Cars[];
        this.filteredCars = res; // Inicializo con todos los coches
      },
      error: (err) => console.log('Error cargando coches:', err),
    });
  }

  // logica para escuchar los cambios al escribir en la barra de busqueda
  setupSearch(): void {
    // escucha los cambios en la barra, el metodo pipe me permite encadenar subscripciones, debounceTime pausa la escucha para esperar mas caracteres antes de filtrar
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => value || '')
      )
      .subscribe((term) => {
        this.filterCars(term as string);
      });
  }

  // Filtro los coches de acuerdo a lo escrito en la barra de busqueda
  filterCars(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredCars = this.cars;
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      this.filteredCars = this.cars.filter(
        (car) =>
          car.make.toLowerCase().includes(lowerTerm) ||
          car.model.toLowerCase().includes(lowerTerm) ||
          car.plate.toLowerCase().includes(lowerTerm) ||
          car.colour.toLowerCase().includes(lowerTerm) ||
          car.transmission.toLowerCase().includes(lowerTerm)
      );
    }
  }

  navigateToEditCar(carId: string): void {
    this.route.navigate([`adminCars/editCar/${carId}`]);
  }
  navigateToAddCar(): void {
    this.route.navigate([`adminCars/addCar`]);
  }

  deleteCar(carId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este coche!',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carsService.deleteCar(carId).subscribe({
          next: (res) => {
            this.fetchAllCars();
            Swal.fire(
              '¡Eliminado!',
              'El coche ha sido eliminado.',
              'success'
            );
          },
          error: (err) => {
            console.error('Error borrando coche: ', err);
            Swal.fire(
              '¡Error!',
              'Error al borrar el coche.',
              'error'
            );
          },
        });
      }
    });
  }}
