import { Cars } from './../../../interfaces/cars';
import { CarsService } from './../../../services/cars.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RentService } from '../../../services/rent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-rent.component.html',
  styleUrl: './edit-rent.component.scss',
})
export class EditRentComponent implements OnInit {
  rentForm: FormGroup;
  cars: Cars[] = [];
  users: User[] = [];
  rentId: any = '';

  constructor(
    private formbuilder: FormBuilder,
    private rentService: RentService,
    private carsService: CarsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rentForm = this.formbuilder.group({
      car: ['', Validators.required],
      user: ['', Validators.required],
      dateIn: ['', Validators.required],
      dateOut: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.rentId = params.get('id'); // Assuming 'id' is the route parameter name
      this.fetchRentData();
    });
    this.fetchAllCars();
    this.fetchAllUsers();
  }

  onSubmit(): void {
    if (this.rentForm.valid) {
      const rent = this.rentForm.value;
      console.log(this.rentId)
      console.log(rent)
      this.rentService.editRent(this.rentId, rent).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: 'Alquiler editado exitosamente!',
            confirmButtonColor: '3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/adminRent']);
            }
          });
        },
        error: (err) => {
          console.error('No se pudo modificar renta en Base de Datos: ', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo editar el alquiler',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
  
  fetchRentData() {
    if (this.rentId) {
      this.rentService.getRentbyId(this.rentId).subscribe({
        next: (rent) => {
          this.rentForm.patchValue({
            car: rent.car._id,
            user: rent.user._id,
            dateIn: rent.dateIn,
            dateOut: rent.dateOut,
            price: rent.price,
            status: rent.status
          });
        },
        error: (err) => console.error('Failed to fetch rent data', err)
      });
    }
  }
  fetchAllCars() {
    this.carsService.getAllCars().subscribe({
      next: (res: any) => {
        this.cars = res as Cars[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  fetchAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res as User[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
