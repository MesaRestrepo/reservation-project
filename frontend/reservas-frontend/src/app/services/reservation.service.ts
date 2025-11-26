import { Injectable } from '@angular/core';
import { Reservation } from './reservation.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private reservations: Reservation[] = [];
  private autoId = 1;

  constructor() {}

  getReservations(): Observable<Reservation[]> {
    return of(this.reservations);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const newReservation = { ...reservation, id: this.autoId++ };
    this.reservations.push(newReservation);
    return of(newReservation);
  }

  deleteReservation(id: number): Observable<void> {
    this.reservations = this.reservations.filter(r => r.id !== id);
    return of(void 0);
  }
}
