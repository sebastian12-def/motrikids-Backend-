import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'motrikids',
	port: Number(process.env.DB_PORT) || 3306,

	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,

	timezone: 'local',
	charset: 'utf8mb4',
	decimalNumbers: true,
	enableKeepAlive: true,
	keepAliveInitialDelay: 10000
};

console.log('Configuración MySQL:', {
	host: poolConfig.host,
	user: poolConfig.user,
	database: poolConfig.database,
	port: poolConfig.port
});

export const pool = createPool(poolConfig);

/* 🔌 Probar conexión al iniciar el servidor */
const testConnection = async () => {
	try {
		const connection = await pool.getConnection();
		console.log(
			'✅ Conectado a MySQL - Base de datos:',
			connection.config.database
		);
		connection.release();

		const [rows] = await pool.query('SELECT DATABASE() AS db');
		console.log('📦 Base de datos en uso:', rows[0].db);
	} catch (error) {
		console.error('❌ Error de conexión a MySQL:', error.message);
		process.exit(1);
	}
};

testConnection();
