const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <h1>Bienvenido, ${req.session.username}!</h1>
      <a href="/search">Ir a búsqueda</a>
      <br>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Login</h1>
      <form method="POST" action="/login">
        <label>Usuario:</label>
        <input type="text" name="username" required>
        <br>
        <label>Contraseña:</label>
        <input type="password" name="password" required>
        <br>
        <button type="submit">Ingresar</button>
      </form>
    `);
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send('Credenciales incorrectas. <a href="/">Inténtalo de nuevo</a>');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error al hacer logout.');
    }
    res.redirect('/');
  });
});

module.exports = router;
