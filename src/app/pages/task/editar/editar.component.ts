import { Component, inject, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { TareasService } from '../../../Services/tareas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITarea } from '../../../Interfaces/ITarea';
import { TokenService } from '../../../Services/token.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent{

  private TareasService = inject(TareasService);
  private router = inject(Router);
  private routeActive = inject(ActivatedRoute);
  private idUser = inject(TokenService);
  private FormBuilder = inject(FormBuilder);
  public mensaje:string = "";
  public idTask:number=0

  //Formulario reactivo para editar la tarea y sus validaciones
  public formEditar:FormGroup = this.FormBuilder.group({
    Titulo:["",Validators.required],
    Descripcion:["", Validators.required],
    Estado:["", Validators.required]
  })

  //Metodo para obtener la tarea por id desde la url y cargarla en el formulario
  EditarTarea(){

    const ID = this.idUser.idUserByToken();

    const idTarea = this.idTask = +this.routeActive.snapshot.paramMap.get('id')!;

    if (this.formEditar.invalid) return;

    if (this.idTask !== 0 ) {

      const objeto:ITarea=
    {
      id: idTarea,
      titulo: this.formEditar.value.Titulo,
      descripcion: this.formEditar.value.Descripcion,
      estado: this.formEditar.value.Estado,
      idUsuario: ID
    }

    this.TareasService.EditarTarea(idTarea,objeto).subscribe({
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
  }

  //Metodo para mostrat errores en el formulario
  hasError(controlName:string, error:string){
    const ShowError = this.formEditar.get(controlName)?.hasError(error) &&
          this.formEditar.get(controlName)?.touched;

    return ShowError;
  }
}
