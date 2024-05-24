import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { Cars } from '../../interfaces/cars';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss'
})
export class CarDetailComponent {
  car?: Cars;
  carId: string = '';
  isLoading = true;
  
  constructor(private carService: CarsService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe({
      next: (res: any) => {
        this.carId = res.id;
        console.log(this.carId)
        this.carService.getCarById(this.carId).subscribe({
          next: (res) => (this.car = res as Cars, this.isLoading = false),
          error: (err) => console.log(err),
        });
      },
    })
      }
  
  goToReservation(carId: any): void {
    this.router.navigate([`/contact/${carId}`])
  }
}
