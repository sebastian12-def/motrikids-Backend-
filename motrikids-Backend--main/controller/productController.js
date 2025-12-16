import { executeQuery } from '../services/dbService.js';

/* GET ALL */
export const getProducts = async (req, res, next) => {
  try {
    const ninos = await executeQuery('SELECT * FROM ninos');
    res.json({
      success: true,
      data: ninos,
      count: ninos.length
    });
  } catch (error) {
    next(error);
  }
};

/* GET BY ID */
export const getNinoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await executeQuery(
      'SELECT * FROM ninos WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Niño no encontrado'
      });
    }

    res.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    next(error);
  }
};

/* CREATE */
export const createProduct = async (req, res, next) => {
  try {
    const { nombre, edad, grado, tutor_id } = req.body;

    await executeQuery(
      'INSERT INTO ninos (nombre, edad, grado, tutor_id) VALUES (?, ?, ?, ?)',
      [nombre, edad, grado, tutor_id || null]
    );

    res.json({ success: true, message: 'Niño registrado' });
  } catch (error) {
    next(error);
  }
};

/* UPDATE */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, edad, grado, tutor_id } = req.body;

    await executeQuery(
      'UPDATE ninos SET nombre=?, edad=?, grado=?, tutor_id=? WHERE id=?',
      [nombre, edad, grado, tutor_id || null, id]
    );

    res.json({ success: true, message: 'Niño actualizado' });
  } catch (error) {
    next(error);
  }
};

/* DELETE */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await executeQuery(
      'DELETE FROM ninos WHERE id = ?',
      [id]
    );

    res.json({ success: true, message: 'Niño eliminado' });
  } catch (error) {
    next(error);
  }
};
