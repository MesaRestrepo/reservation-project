import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../services/reservation.model';

interface DayStat {
  label: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  reservations: Reservation[] = [];

  totalReservations = 0;
  todayReservations = 0;
  upcomingReservations = 0;

  last7DaysStats: DayStat[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.reservationService.getReservations().subscribe((data) => {
      this.reservations = data;
      this.calculateStats();
    });
  }

  private calculateStats() {
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // yyyy-mm-dd

    this.totalReservations = this.reservations.length;
    this.todayReservations = this.reservations.filter(r => r.date === todayStr).length;

    const now = today.getTime();
    this.upcomingReservations = this.reservations.filter(r => {
      const d = new Date(r.date).getTime();
      return d > now;
    }).length;

    this.buildLast7DaysStats();
  }

  private buildLast7DaysStats() {
    const today = new Date();

    const stats: DayStat[] = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);

      const label = day.toLocaleDateString('es-ES', { weekday: 'short' });
      const dateStr = day.toISOString().slice(0, 10);

      const count = this.reservations.filter(r => r.date === dateStr).length;

      stats.push({ label, count });
    }

    this.last7DaysStats = stats;
  }
}
