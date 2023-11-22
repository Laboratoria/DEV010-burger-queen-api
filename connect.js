/* const config = require('./config');
const { MongoClient } = require('mongodb');
const { dbUrl } = config;

async function connect() {
  try {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db('auth_post_login');
    console.log('Conexión exitosa a la base de datos');
    return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

connect();

module.exports = { connect }; */

const { MongoClient } = require('mongodb');
const { dbUrl } = require('./config');

async function connect() {
  try {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db('auth');
    console.log('Successful connection to the database');

    // Operaciones en la base de datos
    const collection = db.collection('post/login');

    // Insertar un documento de prueba
    const result = await collection.insertOne({
      _id: '655e6306c54fe7d18e1c989e',
      email: 'alejandra@gmail.com',
      password: '12345qwerty',
    });
    console.log(`Document inserted with ID: ${result.insertedId}`);

    // Indicar que todas las operaciones se han completado con éxito antes de cerrar la conexión
    console.log('Operations completed');

    // Cerrar la conexión
    await client.close();
    console.log('Closed connection');
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Llamada a la función connect
connect();
