const express = require('express');

function createReservationController(service) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const reservations = await service.list();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const reservation = await service.create(req.body);
      res.status(201).json(reservation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return router;
}

module.exports = { createReservationController };
