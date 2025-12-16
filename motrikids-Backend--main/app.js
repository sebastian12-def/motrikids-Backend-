import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import mongoose from 'mongoose';
import { closePool } from './services/dbService.js';

dotenv.config();

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const PORT = process.env.PORT || 8000;
console.log('Variables de entorno:', {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '***' : '(vacio)',
}, '\n Número de puerto: ', PORT);

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public')));

// Rutas
app.use('/api', apiRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(_dirname, 'public', 'index.html'));
});

// ===============================
// MongoDB (CORREGIDO)
// ===============================
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🍃 Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};

// Conectar a MongoDB
connectMongo();

// ===============================
// Error global
// ===============================
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// ===============================
// Shutdown para MySQL y MongoDB
// ===============================
const shutdown = async () => {
  console.log('\nRecibiendo señal de apagado...');
  await closePool(); // Cerrar la conexión MySQL
  await mongoose.connection.close(); // Cerrar MongoDB
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
