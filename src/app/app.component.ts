import { Component } from '@angular/core';
import { UserPermissionsComponent } from 'user-permissions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserPermissionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assignment';
}
