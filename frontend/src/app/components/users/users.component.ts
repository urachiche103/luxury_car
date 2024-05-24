import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  userId: string | undefined // Variable para almacenar el userId
  userForm: FormGroup
  user: User[]=[]
  

  constructor (
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.userForm =this.formBuilder.group({
      name:['', Validators.required],
      surname:['', Validators.required],
      license:['', Validators.required],
      dob:['', Validators.required],
      address:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
    })
  }

  
  ngOnInit(): void {
  const userId:any = localStorage.getItem('userId') // Obtener el valor de la localStorage
  this.userService.getUserById(userId).subscribe({
    next:(res:any)=>{
      this.user = res as User[],
      this.userForm.patchValue(this.user)
    },
      error:(err:any)=>console.log ('Error en getUsers', err)
    })
  }

  onSubmit():void{
    const userId:any = localStorage.getItem('userId')
    if(this.userForm.valid){
      console.log(this.userForm.value)
      this.userService.updateUser(userId, this.userForm.value).subscribe({
        next:(res: any) => this.router.navigate(['/users']),
        error:(err)=> console.error('Error modificando  usuario', err)
      });
    }
  }
}
