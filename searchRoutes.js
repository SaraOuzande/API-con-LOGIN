const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/search', isAuthenticated, (req, res) => {
  const nombre = req.query.nombre;
  if (nombre) {
    res.redirect(`/character/${encodeURIComponent(nombre)}`);
  } else {
    res.send(`
      <h1>Búsqueda de Personajes de Rick and Morty</h1>
      <form method="GET" action="/search">
        <label>Nombre del personaje:</label>
        <input type="text" name="nombre" required>
        <button type="submit">Buscar</button>
      </form>
      <br>
      <a href="/logout">Logout</a>
    `);
  }
});

module.exports = router;
