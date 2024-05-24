import { CarsService } from './../../services/cars.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cars } from '../../interfaces/cars';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { __values } from 'tslib';
import { LoginFormComponent } from '../forms/login-form/login-form.component';

@Component({
  selector: 'app-find-car',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CardComponent],
  templateUrl: './find-car.component.html',
  styleUrl: './find-car.component.scss'
})
export class FindCarComponent implements OnInit {

  cars: Cars []=[]

  carsFiltered: Cars []=[]

  

  searcherCars: FormGroup = this.FormBuilder.group({
    car : new FormControl(''),
    transmission: new FormControl(''),
    power: new FormControl(''),
    year: new FormControl('')
  })

  constructor(
    private CarsService: CarsService,
    private FormBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.CarsService.getAllCars().subscribe({
      next:(res:any)=>{
        this.cars=res as Cars[]
        console.log("Coches Cargados", this.cars);
      },
      error: (err:any)=> console.log('Error al cargar vehiculos')
      
    })
  }

  

  searcherCar(){
    const carFilterCar = this.searcherCars.get('car')?.value
    const carFilterTransmision = this.searcherCars.get('transmission')?.value
    const carFilterPower = this.searcherCars.get('power')?.value
    const carFilterYear = this.searcherCars.get('year')?.value



    if(carFilterCar === '' ){

      if(carFilterPower === 'descendant'){
        this.carsFiltered= this.cars.sort((a,b)=>b.hp - a.hp);
      console.log('Este es el orden desdendente potencia', this.carsFiltered);
      }else if(carFilterPower === 'ascendant'){
        this.carsFiltered = this.cars.sort((a,b)=>a.hp - b.hp);
        console.log('Este es el orden ascendente potencia', this.carsFiltered);
      }
        else(carFilterPower === '');{
          this.carsFiltered
        }
      

      if(carFilterYear === 'newerFirst'){
        this.carsFiltered = this.cars.sort((a,b)=>b.year -a.year)
        console.log('Este es el orden desdendente Año', this.carsFiltered);
      }else if(carFilterYear === 'olderFirst'){
        this.carsFiltered = this.cars.sort((a,b)=> a.year - b.year)
        console.log('Este es el orden ascendente año', this.carsFiltered);
      }else(carFilterYear === '');{

      }

      if(carFilterTransmision === 'Automatico'){
        this.carsFiltered = this.cars.filter((i)=>i.transmission.includes(carFilterTransmision))
        console.log('Este es el coche filtrado por transmission', this.carsFiltered);
      }else if(carFilterTransmision === 'Manual'){
        this.carsFiltered = this.cars.filter((i)=>i.transmission.includes(carFilterTransmision))
        console.log('coche filtrado por transmision manual', this.carsFiltered);
      }
      
    }else if(carFilterCar !== ''){
      this.carsFiltered = this.cars.filter((i)=>i.make.toLocaleLowerCase().includes(carFilterCar))
        console.log('Coche filtrado', carFilterCar)
    }

  }

  
 


}
