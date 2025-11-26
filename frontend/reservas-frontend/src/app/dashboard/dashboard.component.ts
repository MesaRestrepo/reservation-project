import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalReservations = 0;
  todayReservations = 0;
  upcomingReservations = 0;

  last7DaysStats: number[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const data = this.reservationService.getReservations();
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    this.totalReservations = data.length;

    this.todayReservations = data.filter(r => r.date === today).length;

    this.upcomingReservations = data.filter(r => new Date(r.date) > now).length;

    // Últimos 7 días
    this.last7DaysStats = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split("T")[0];

      const count = data.filter(r => r.date === dStr).length;
      this.last7DaysStats.push(count);
    }
  }
}
