// project/backend/src/app.js
import express from "express";
import { createPool } from "mariadb";

const pool = createPool({
  host: "db",
  port: 3306,
  user: "root",
  password: "abc123",
  database: "abc",
});

pool.on("error", function (error) {
  console.log("Error from pool", error);
});

const app = express();

app.get("/faq", async function (request, response) {
  try {
    const connection = await pool.getConnection();
    const query = "SELECT * FROM faqs";
    const faqs = await connection.query(query);
    response.status(200).json(faqs);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});

app.get("/faq/:id", async function (request, response) {
	try {
		const id = request.params.id;
		const connection = await pool.getConnection();
		const faq = await connection.query("SELECT * FROM faqs WHERE id = ?", [request.params.id])
		response.status(200).json(faq);
	}	catch (error) {
		console.log(error);
		response.status(500).end();
	}

});

app.get("/humans", async function (request, response) {
  console.log("Hello there hi from shoptech");

  try {
    const connection = await pool.getConnection();

    const query = "SELECT * FROM humans ORDER BY name";

    const humans = await connection.query(query);

    response.status(200).json(humans);
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});

app.get("/", function (request, response) {
  response.send("It works, shoptech");
});

app.listen(8080);
