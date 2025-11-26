export interface Reservation {
  id: number;            // ← ID ahora es obligatorio
  roomName: string;
  reservedBy: string;
  date: string;
  startTime: string;
  endTime: string;
}
