import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService } from '../../services/rent.service';
@Component({
  selector: 'app-rent-request',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './rent-request.component.html',
  styleUrl: './rent-request.component.scss'
})
export class RentRequestComponent {
  rentForm: FormGroup;
  carId: string = '';
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private rentService: RentService
  ) {
    this.rentForm = this.formBuilder.group({
      dateIn: ['', Validators.required],
      dateOut: ['', Validators.required],
      car: [this.carId, Validators.required],
      user: [this.userId, Validators.required],
      price: ['1200', Validators.required], // Donde tenemos los precios?
      status: ['2', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUserId = localStorage.getItem('userId');
    // console.log(storedUserId)
    if (storedUserId !== null) {
      this.userId = storedUserId;
      // console.log(id)
    }
    if (id !== null) {
      this.carId = id;
    } else {
      console.error('No existe ID de coche en los parametros de ruta');
      this.router.navigate(['/error']); // Crearemos una pagina de error, o lo redirige a un 404?
    }
    this.rentForm = this.formBuilder.group({
      dateIn: ['', Validators.required],
      dateOut: ['', Validators.required],
      car: [id, Validators.required],
      user: [storedUserId, Validators.required],
      price: ['1200', Validators.required],
      status: ['2', Validators.required],
    });
  }
  submitRentRequest() {
    if (this.rentForm.valid) {
      console.log(this.rentForm.value);
      this.rentService.createRent(this.rentForm.value).subscribe({
        next: (res: any) => this.router.navigate(['/requestSent']),
        error: (err) => console.error('No se pudo solicitar la renta: ', err),
      });
    }
  }
}
