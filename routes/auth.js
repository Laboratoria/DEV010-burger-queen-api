const jwt = require('jsonwebtoken');
const { getDb } = require('../connect');
const config = require('../config');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    const db = getDb();
    const usersCollection = db.collection('users');
    try {
      // Se verifican las credenciales de la usuaria en la db
      const user = await usersCollection.findOne({ email, password });

      if (!user) {
        // Credenciales inválidas
        return next(401);
      }

      // Generar token JWT
      const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '3h' });

      // Enviar el token como respuesta
      resp.json({ token });
    } catch (error) {
      console.error('Error in authentication:', error);
      return next(500);
    }
  });

  return nextMain();
};
