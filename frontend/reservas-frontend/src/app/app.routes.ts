import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationsComponent } from './reservations/reservations';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];
