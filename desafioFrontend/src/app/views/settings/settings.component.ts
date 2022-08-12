import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn-primary ml-5',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8BB86',
        confirmButtonText: 'Yes, log off!',
        cancelButtonText: 'No, cancel!',
        cancelButtonColor: 'gray',
        reverseButtons: true,
        background: '#233238',
        color: '#fff',
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
        }
      });
  }
}
