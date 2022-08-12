import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(title: string, textMessage: string, textbutton: string) {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: textMessage,
      confirmButtonText: textbutton,
      confirmButtonColor: '#233238',
    });
  }

  error(title: string, textMessage: string, textbutton: string) {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: textMessage,
      confirmButtonText: textbutton,
    });
  }

  warning(title: string, textMessage: string, textbutton: string) {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: textMessage,
      confirmButtonText: textbutton,
    });
  }

  info(title: string, textMessage: string, textbutton: string) {
    return Swal.fire({
      icon: 'info',
      title: title,
      text: textMessage,
      confirmButtonText: textbutton,
    });
  }

  question(title: string, textMessage: string, textbutton: string) {
    return Swal.fire({
      icon: 'question',
      title: title,
      text: textMessage,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#233238',
      confirmButtonText: textbutton,
    });
  }
}
