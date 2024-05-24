import { Component } from '@angular/core';
import { SearchRentComponent } from '../../components/admin-rent/search-rent/search-rent.component';

@Component({
  selector: 'app-admin-rent',
  standalone: true,
  imports: [SearchRentComponent],
  templateUrl: './admin-rent.component.html',
  styleUrl: './admin-rent.component.scss'
})
export class AdminRentComponent {

}
