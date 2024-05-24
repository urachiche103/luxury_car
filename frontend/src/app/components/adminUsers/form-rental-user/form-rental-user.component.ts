import { Rent } from './../../../interfaces/rent';
import { UserService } from './../../../services/user.service';
import { RentService } from '../../../services/rent.service';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-rental-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-rental-user.component.html',
  styleUrl: './form-rental-user.component.scss',
})
export class FormRentalUserComponent implements OnInit {
  userId: string | undefined;
  rentForm: FormGroup;
  rents: Rent[] = [];

  constructor(
    private rentService: RentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.rentForm = this.formBuilder.group({
      car: ['', Validators.required],
      user: ['', Validators.required],
      dateIn: ['', Validators.required],
      dateOut: [''],
      price: [''],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userId: any = localStorage.getItem('userId');
    this.rentService.getRentByUserId(userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.rents = res as Rent[];
        this.rentForm.patchValue(this.rents);
        console.log(this.rents);
      },
      error: (err: string) => console.log('Error al obtener alquileres', err),
    });
  }

  getStatusDescription(status: Number): String {
    switch (status) {
      case 1:
        return 'Solicitado';
      case 2:
        return 'Alquilado';
      default:
        return 'Disponible';
    }
  }

  onSubmit(): void {
    if (this.rentForm.valid) {
      this.rentService.createRent(this.rentForm.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: '¡Alquiler agregado exitosamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/adminRent']);
            }
          });
        },
        error: (err: string) => {
          console.error('Error agregando alquiler: ', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Error agregando alquiler!',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }
}
