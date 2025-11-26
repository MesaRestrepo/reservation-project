const EventEmitter = require('events');

class ReservationService extends EventEmitter {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  async list() {
    return this.repository.findAll();
  }

  async create(dto) {
    if (!dto.roomName || !dto.reservedBy) {
      throw new Error('Datos incompletos');
    }

    const reservation = await this.repository.create(dto);

    this.emit('reservationCreated', reservation);

    return reservation;
  }
}

module.exports = { ReservationService };
