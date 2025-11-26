export interface Reservation {
  id?: number;          // opcional al crear, definido al venir del backend
  roomName: string;
  reservedBy: string;
  date: string;
  startTime: string;
  endTime: string;
}
