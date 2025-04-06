import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from './../../Services/acceso.service';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IRegister } from '../../Interfaces/IRegister';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private AccesoService = inject(AccesoService);
  private router = inject(Router);
  private FormBuilder = inject(FormBuilder);
  public mensaje: string = "";
  public isBadRequest:boolean = false;

  //formulario reactivo para el registro y sus validaciones
  public registerForm : FormGroup = this.FormBuilder.group({
    Nombre: ["",[Validators.required, Validators.minLength(3)]],
    Apellido: ["",[Validators.required, Validators.minLength(3)]],
    Correo: ["",[Validators.required, Validators.email]],
    Contrasena: ["",[Validators.required, Validators.minLength(5)]]
  });

  //Metodo para validar el formulario y registrar al usuario
  //Se inyecta el servicio de acceso y el router para redireccionar al login en caso de true
  public register()
  {
    if(this.registerForm.invalid) return;

    const objeto:IRegister ={
      Nombre: this.registerForm.value.Nombre,
      Apellido: this.registerForm.value.Apellido,
      Correo: this.registerForm.value.Correo,
      Contrasena: this.registerForm.value.Contrasena
    };

    this.AccesoService.Register(objeto).subscribe({
      next:(data) =>{
        if(data.succes){
          this.router.navigate(['/login']);
        }
      },

      error:(err) =>{
        this.isBadRequest = true;
        this.mensaje = "Existe una cuenta con este correo";
        console.log(err.message);
      }
    });
  }

  //Metodo para motrar errores
  hasError(ControlName: string, errorName: string) {
    return this.registerForm.get(ControlName)?.hasError(errorName) &&
    this.registerForm.get(ControlName)?.touched;
  }
}
