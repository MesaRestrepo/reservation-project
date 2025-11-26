class InMemoryReservationRepository {
  constructor() {
    this.reservations = [];
    this.nextId = 1;
  }

  async findAll() {
    return this.reservations;
  }

  async create(data) {
    const reservation = {
      id: this.nextId++,
      roomName: data.roomName,
      reservedBy: data.reservedBy,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    this.reservations.push(reservation);
    return reservation;
  }
}

module.exports = { InMemoryReservationRepository };
