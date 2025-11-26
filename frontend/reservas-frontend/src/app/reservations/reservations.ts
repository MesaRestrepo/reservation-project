import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../services/reservation.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.html',
  styleUrls: ['./reservations.css']
})
export class ReservationsComponent {

  reservations: Reservation[] = [];
  newReservation: Reservation = {
    id: 0,
    roomName: '',
    reservedBy: '',
    date: '',
    startTime: '',
    endTime: ''
  };

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservations = this.reservationService.getReservations();
  }

  saveReservation() {
    this.reservationService.addReservation(this.newReservation);
    this.newReservation = { id: 0, roomName: '', reservedBy: '', date: '', startTime: '', endTime: '' };
    this.loadReservations();
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id);
    this.loadReservations();
  }
}
