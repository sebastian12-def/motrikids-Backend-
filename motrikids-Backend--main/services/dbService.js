import { pool } from '../config/db.js';

export const executeQuery = async (sql, params = []) => {
	let connection;
	try {
		connection = await pool.getConnection();
		const [rows] = await connection.query(sql, params);
		return rows;
	} catch (error) {
		console.error('Error en dbService:', error);
		throw error;
	} finally {
		if (connection) connection.release();
	}
};

export const closePool = async () => {
	try {
		await pool.end();
		console.log('Pool de MySQL cerrado correctamente');
	} catch (error) {
		console.error('Error cerrando pool:', error);
	}
};
