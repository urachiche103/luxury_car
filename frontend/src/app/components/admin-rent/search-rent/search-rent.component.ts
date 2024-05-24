import { RentService } from './../../../services/rent.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Rent } from '../../../interfaces/rent';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-rent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-rent.component.html',
  styleUrl: './search-rent.component.scss',
})
export class SearchRentComponent implements OnInit {
  rents: Rent[] = [];
  filteredRents: Rent[] = [];
  searchControl = new FormControl('');

  constructor(private rentService: RentService, private route: Router) {}

  ngOnInit(): void {
    this.fetchAllRents();
    this.setupSearch();
  }

  fetchAllRents(): void {
    this.rentService.getAllRents().subscribe({
      next: (res: any) => {
        this.rents = res as Rent[];
        this.filteredRents = res;
      },
      error: (err) => console.log('Error cargando solicitudes:', err),
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => value || '')
      )
      .subscribe((term) => {
        this.filterRents(term as string);
      });
  }

  filterRents(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredRents = this.rents;
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      this.filteredRents = this.rents.filter(
        (rent) =>
          rent.car.make.toLowerCase().includes(lowerTerm) ||
          rent.car.model.toLowerCase().includes(lowerTerm) ||
          rent.user.email.toLowerCase().includes(lowerTerm) ||
          rent.dateIn.toLowerCase().includes(lowerTerm) ||
          rent.dateOut.toLowerCase().includes(lowerTerm) ||
          rent.price.toLowerCase().includes(lowerTerm) ||
          rent.status.toString().includes(searchTerm)
      );
    }
  }

  navigateToEditRent(rentId: any): void {
    this.route.navigate([`adminRent/editRent/${rentId}`]);
  }
  navigateToAddRent(): void {
    this.route.navigate([`adminRent/addRent`]);
  }

  deleteRent(rentId: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este alquiler!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentService.deleteRent(rentId).subscribe({
          next: (res) => {
            this.fetchAllRents();
            Swal.fire(
              '¡Eliminado!',
              'El alquiler ha sido eliminado.',
              'success'
            );
          },
          error: (err) => {
            console.error('Error borrando el alquiler: ', err);
            Swal.fire(
              '¡Error!',
              'Error al borrar el alquiler.',
              'error'
            );
          },
      });
    }
  });
}
  getStatusDescription(status: Number): String {
    switch (status) {
      case 1:
        return 'Solicitado';
      case 2:
        return 'Rentado';
      default:
        return 'Disponible';
    }
  }
}
