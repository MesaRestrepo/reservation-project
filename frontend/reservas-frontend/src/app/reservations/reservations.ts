import { Component, OnInit } from '@angular/core';
import { Reservation } from '../services/reservation.model';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  templateUrl: './reservations.html',
  styleUrls: ['./reservations.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = [];

  newReservation: Reservation = {
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
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  saveReservation() {
    if (!this.newReservation.roomName ||
        !this.newReservation.reservedBy ||
        !this.newReservation.date ||
        !this.newReservation.startTime ||
        !this.newReservation.endTime) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.reservationService.createReservation(this.newReservation)
      .subscribe(() => {
        this.resetForm();
        this.loadReservations(); // 🔥 evita duplicados
      });
  }

  deleteReservation(id: number | undefined) {
    if (!id) return;

    if (!confirm('¿Seguro que deseas eliminar esta reserva?')) return;

    this.reservationService.deleteReservation(id).subscribe(() => {
      this.loadReservations(); // 🔥 evita duplicados
    });
  }

  resetForm() {
    this.newReservation = {
      roomName: '',
      reservedBy: '',
      date: '',
      startTime: '',
      endTime: ''
    };
  }
}
