import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getNinoById
} from '../controller/productController.js';

// 👉 IMPORTAMOS EL MODELO DE MONGO
import Nino from '../models/nino.mongo.js';

const router = express.Router();

/* =========================
   CRUD NIÑOS - MySQL
   ========================= */

// Obtener todos los niños (MySQL)
router.get('/ninos', getProducts);

// Obtener niño por ID (MySQL)
router.get('/ninos/:id', getNinoById);

// Crear nuevo niño (MySQL)
router.post('/ninos', createProduct);

// Actualizar niño por ID (MySQL)
router.put('/ninos/:id', updateProduct);

// Eliminar niño por ID (MySQL)
router.delete('/ninos/:id', deleteProduct);

/* =========================
   CRUD NIÑOS - MongoDB
   ========================= */

// Crear niño (Mongo)
router.post('/mongo/ninos', async (req, res) => {
  try {
    const nino = await Nino.create(req.body);
    res.status(201).json(nino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los niños (Mongo)
router.get('/mongo/ninos', async (req, res) => {
  try {
    const ninos = await Nino.find();
    res.json(ninos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener niño por ID (Mongo)
router.get('/mongo/ninos/:id', async (req, res) => {
  try {
    const nino = await Nino.findById(req.params.id);
    if (!nino) {
      return res.status(404).json({ message: 'Niño no encontrado' });
    }
    res.json(nino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar niño por ID (Mongo)
router.put('/mongo/ninos/:id', async (req, res) => {
  try {
    const nino = await Nino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(nino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar niño por ID (Mongo)
router.delete('/mongo/ninos/:id', async (req, res) => {
  try {
    await Nino.findByIdAndDelete(req.params.id);
    res.json({ message: 'Niño eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
