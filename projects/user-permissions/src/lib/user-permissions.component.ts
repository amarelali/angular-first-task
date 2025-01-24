import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'lib-user-permissions',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: 'user-permission.component.html',
})
export class UserPermissionsComponent {

}
