const express = require('express');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'mi_secreto_super_seguro', 
  resave: false,
  saveUninitialized: false
}));

app.use('/', authRoutes);
app.use('/', searchRoutes);
app.use('/', characterRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
