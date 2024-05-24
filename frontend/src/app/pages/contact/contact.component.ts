import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

  contactForm: FormGroup =  this.formBuilder.group({
    name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    surname: new FormControl(null,[Validators.required, Validators.pattern('[a-zA-Z ]*')] ),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    phone: new FormControl(null, [ Validators.required,Validators.maxLength(9), Validators.pattern('[0-9]') ] ),
    mensaje: new FormControl(null, [Validators.required])
})
constructor (private formBuilder: FormBuilder){}

  deleteForm(){
    this. contactForm.reset()
    alert('Has contactado con LUXURY CAR RENTAL, en breves nos pondremos en contacto con usted')
  }

}
