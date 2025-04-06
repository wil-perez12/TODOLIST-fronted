import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  // Mostrar toast de éxito
  showSuccess(message: string) {
    this.Toast.fire({ icon: "success", title: message });
  }

  // Mostrar toast de error
  showError(message: string) {
    this.Toast.fire({ icon: "error", title: message });
  }

  // Mostrar loader
  showLoading(message: string = "Cargando...") {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
      }
    });
  }

  // Cerrar cualquier alerta activa (loader o mensaje)
  close() {
    Swal.close();
  }
}

