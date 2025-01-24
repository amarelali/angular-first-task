import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from 'user-permissions';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
