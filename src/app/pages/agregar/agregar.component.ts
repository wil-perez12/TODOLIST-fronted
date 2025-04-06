import { TareasService } from './../../Services/tareas.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { TokenService } from '../../Services/token.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITarea } from '../../Interfaces/ITarea';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent {

  private TareasService = inject(TareasService);
  private router = inject(Router);
  private idUser = inject(TokenService);
  private FormBuilder = inject(FormBuilder);
  public mensaje:string = "";



// formulario de agregar tarea y validaciones
  public formAgregar:FormGroup = this.FormBuilder.group({
    Titulo:["",Validators.required],
    Descripcion:["", Validators.required],
    Estado:["", Validators.required]
  })

  //metodo agregar tarea que se ejecuta al enviar el formulario
  // recibe el id del usuario logueado y crea un objeto de tipo ITarea
  //con los datos del formulario y el id del usuario
  AgregarTarea(){
    const ID = this.idUser.idUserByToken();

    if (this.formAgregar.invalid) return;

    const objeto:ITarea=
    {
      id: 0,
      titulo: this.formAgregar.value.Titulo,
      descripcion: this.formAgregar.value.Descripcion,
      estado: this.formAgregar.value.Estado,
      idUsuario: ID
    }

    this.TareasService.CrearTarea(objeto).subscribe({
      next:(data)=>{
        if (data.succes) {
          this.router.navigate(["/task"]);
        }
      },

      error:(err)=>{
        console.log("El error es:", err);
      }
    })
  }

  //metodo que maneja los errores de los formularios
  hasError(controlName:string, error:string){
    const ShowError = this.formAgregar.get(controlName)?.hasError(error) &&
          this.formAgregar.get(controlName)?.touched;

    return ShowError;
  }

}
