import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink, RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TODOLIST-fronted';
}
