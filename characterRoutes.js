const express = require('express');
const axios = require('axios');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/characters', isAuthenticated, async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personajes.' });
  }
});

router.get('/character/:nombre', isAuthenticated, async (req, res) => {
  const nombre = req.params.nombre;
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${nombre}`);
    if (response.data.results && response.data.results.length > 0) {
      const character = response.data.results[0]; 
      res.send(`
        <h1>${character.name}</h1>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Especie:</strong> ${character.species}</p>
        <p><strong>Origen:</strong> ${character.origin.name}</p>
        <img src="${character.image}" alt="${character.name}" style="width:200px">
        <br><br>
        <a href="/search">Volver a la búsqueda</a>
        <br>
        <a href="/logout">Logout</a>
      `);
    } else {
      res.send(`<p>No se encontró el personaje "${nombre}".</p><a href="/search">Volver</a>`);
    }
  } catch (error) {
    res.status(500).send(`<p>Error al obtener el personaje.</p><a href="/search">Volver</a>`);
  }
});

module.exports = router;
