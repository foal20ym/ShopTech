import { createPool } from "mariadb"

const db = createPool({
	host: "db",
	port: 3306,
	user: "root",
	password: "abc123",
	database: "abc",
	connectionLimit: 100,
	connectTimeout: 20000
})

db.on('error', function (error) {
	console.log("Error from pool", error)
})

db.getConnection(function (error, connection) {
	if (error) {
		if (error.code == "PROTOCOL_CONNECTION_LOST") {
			console.error("Database connection lost");
		}
		if (error.code == "ER_CON_COUNT_ERROR") {
			console.error("Database has too many connections");
		}
		if (error.code == "ECONNREFUSED") {
			console.error("Database connection was refused");
		}
	}
	if (connection) connection.release();
	return;
});

export default db;
