import { Component } from '@angular/core';
import { FormFindUserComponent } from '../../components/adminUsers/form-find-user/form-find-user.component';




@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [FormFindUserComponent],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {
  
}
