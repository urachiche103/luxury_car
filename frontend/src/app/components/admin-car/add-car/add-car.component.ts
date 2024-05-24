import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarsService } from '../../../services/cars.service';
import { Router } from '@angular/router';
import { Cars } from '../../../interfaces/cars';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss'
})
export class AddCarComponent implements OnInit {
  carForm: FormGroup;


  constructor(
    private formbuilder: FormBuilder,
    private carsService: CarsService,
    private router: Router
  ) {
    this.carForm = this.formbuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      year: ['', Validators.required],
      hp: ['', Validators.required],
      cc: ['', Validators.required],
      colour: ['', Validators.required],
      seats: ['', Validators.required],
      price: ['', Validators.required],
      transmission: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      console.log(this.carForm.value)
      this.carsService.createCar(this.carForm.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: '¡Coche agregado exitosamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/adminCars']);
            }
          });
        },
        error: (err) => {
          console.error('No se pudo añadir el coche a Base de Datos: ', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡No se pudo añadir el coche a Base de Datos!',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
