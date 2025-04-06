import { ToastService } from './../../Services/toast.service';
import { AccesoService } from './../../Services/acceso.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ILogin } from '../../Interfaces/ILogin';


@Component({
  selector: 'app-login',
  imports: [RouterLink,  CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private ToastService = inject(ToastService);
  private AccesoService = inject(AccesoService);
  private router = inject(Router);
  private FormBuilder = inject(FormBuilder);
  public mensaje: string = "";
  public isBadRequest:boolean = false;

// formulario de inicio de sesión y validaciones
  public loginForm:FormGroup = this.FormBuilder.group({
    Correo: ["",[Validators.required, Validators.email]],
    Contrasena: ["",[Validators.required, Validators.minLength(5)]]
  });

  //metodo login que se ejecuta al enviar el formulario
  //muestra un mensaje de carga y verifica las credenciales
  //si son correctas navega a la pagina de tareas
  //si son incorrectas muestra un mensaje de error
  Login()
  {
    if (this.loginForm.invalid) return;

    this.ToastService.showLoading("Verificando credenciales...");

    const objeto:ILogin =
    {
      Correo: this.loginForm.value.Correo,
      Contrasena: this.loginForm.value.Contrasena
    }

    this.AccesoService.Login(objeto).subscribe({
      next:(data) =>{
      this.ToastService.close();

        if (data.succes) {
          this.ToastService.showSuccess("Signed in successfully");
          localStorage.setItem("token",data.token);
          this.router.navigate(["/task"]);
        }
      },

      error:(err) =>{
        this.ToastService.showError("Credenciales incorrectas");
        console.log(err.message);
      }
    })
  }

  //metodo para manejar el error de los campos del formulario
  //verifica si el campo tiene error y si ha sido tocado
  hasError(controlName:string, errorName:string){
    return this.loginForm.get(controlName)?.hasError(errorName) &&
    this.loginForm.get(controlName)?.touched;
  }
}
