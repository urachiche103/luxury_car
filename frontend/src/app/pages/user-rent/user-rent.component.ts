import { Component } from '@angular/core';
import { FormRentalUserComponent } from '../../components/adminUsers/form-rental-user/form-rental-user.component';

@Component({
  selector: 'app-user-rent',
  standalone: true,
  imports: [FormRentalUserComponent],
  templateUrl: './user-rent.component.html',
  styleUrl: './user-rent.component.scss'
})
export class UserRentComponent {

}
