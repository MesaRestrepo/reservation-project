const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// "Base de datos" en memoria
let reservations = [];
let nextId = 1;

// GET todas
app.get('/api/reservations', (req, res) => {
  res.json(reservations);
});

// POST crear
app.post('/api/reservations', (req, res) => {
  const reservation = { id: nextId++, ...req.body };
  reservations.push(reservation);
  res.status(201).json(reservation);
});

// DELETE una
app.delete('/api/reservations/:id', (req, res) => {
  const id = Number(req.params.id);
  reservations = reservations.filter(r => r.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
