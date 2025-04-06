import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskComponent } from './pages/task/task.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EditarComponent } from './pages/task/editar/editar.component';
import { authGuard } from './Custom/auth.guard';


export const routes: Routes =
[
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'task', component: TaskComponent,canActivate:[authGuard]},
  {path: 'agregar', component: AgregarComponent,canActivate:[authGuard]},
  {path: 'task/editar/:id', component: EditarComponent,canActivate:[authGuard]},
  {path	: '**', redirectTo: ''}

];
