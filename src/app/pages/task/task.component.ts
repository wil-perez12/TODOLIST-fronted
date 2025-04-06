import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { TareasService } from '../../Services/tareas.service';
import { TokenService } from '../../Services/token.service';
import { ITarea } from '../../Interfaces/ITarea';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-task',
  imports: [RouterLink,CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  private tareaService = inject(TareasService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  public listaTareas:ITarea[] = [];
  public mensaje:string = "";
  public isListInBlank:boolean = false;


  constructor(){}

  //paso como parametro el id del usuario y obtengo la lista de tareas de dicho user
  ngOnInit(): void {
      const Id:number =this.tokenService.idUserByToken();

      this.tareaService.ListaTareasByUserId(Id).subscribe({
        next:(data)=>{
        if (data.values.length > 0) {
          this.listaTareas = data.values;
        }else{
          this.isListInBlank = true;
          this.mensaje = "¡Comienza agregar tareas y pon tu dia en orden!";
        }
    },
        error:(err)=>{
          console.log("El error es:", err);
        }
      });
  }

  //metodo para eliminar una tarea obtiene el id de la lista de tareas y  actualiza la lista
  //envia un cuadro de confirmación antes de eliminar la tarea
  DeleteTask(id: number) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    })
    .then((result) => {
      // Solo ejecuta si el usuario confirma
      if (result.isConfirmed) {
        this.tareaService.EliminarTarea(id).subscribe({
          next: (data) => {
            if (data.succes) {
              this.listaTareas = this.listaTareas.filter(task => task.id !== id);
              Swal.fire("Eliminado", "La tarea ha sido eliminada.", "success");
            }
          },

          error: (err) => {
            console.log("El error es", err);
            Swal.fire("Error", "Hubo un problema al eliminar la tarea.", "error");
          }
        });
      }
    });
  }



  //metodo para cerrar sesion
  LogOut(){
    this.router.navigate(["/login"]);
  }
}
