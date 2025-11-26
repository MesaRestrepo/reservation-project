import { Injectable } from '@angular/core';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  getReservations(): Reservation[] {
    return [...this.reservations]; // evita referencias duplicadas
  }

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
  }

  deleteReservation(id: number) {
    this.reservations = this.reservations.filter(r => r.id !== id);
  }
}
