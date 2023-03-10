import express, { json } from 'express'
import { createPool } from 'mariadb'

/*
const pool = createPool({
	host: "172.19.0.2",
	port: 3306,
	user: "root",
	password: "abc123",
	database: "abc",
})
*/

const pool = createPool({
	host: "db",
	port: 3306,
	user: "root",
	password: "abc123",
	database: "abc",
	connectionLimit: 100,
	connectTimeout: 20000
})

pool.on('error', function(error){
	console.log("Error from pool", error)
})

const app = express()

app.use(function(request, response, next){

	response.set("Access-Control-Allow-Origin", "*")
	response.set("Access-Control-Allow-Methods", "*")
	response.set("Access-Control-Allow-Headers", "*")
	response.set("Access-Control-Expose-Headers", "*")

	next()
})

app.use(express.json())

app.get("/faq", async function (request, response) {

	console.log("Hello there from shoptech")

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

		const faq = await connection.query("SELECT * FROM faqs WHERE id = ?", [id])

		response.status(200).json(faq);

	}	catch (error) {

		console.log(error);
		response.status(500).end();
	}

});

app.get("/", async function(request, response){
	
	console.log("Hello there from shoptech")
	
	try{
		
		const connection = await pool.getConnection()
		
		const query = "SELECT * FROM adverts"
		
		const adverts = await connection.query(query)
		
		response.status(200).json(adverts)

		connection.end()
		
	}catch(error){
		console.log(error)
		response.status(500).end()
	}
	
})

app.get("/advert/:id", async function (request, response) {

	console.log("Fetching an advert")

	try {

		const id = request.params.id
		
		const connection = await pool.getConnection()

		const advert = await connection.query("SELECT * FROM adverts WHERE advertID = ?", [id])

		console.log(advert)

		response.status(200).json(advert[0])

		connection.end()

	}	catch (error) {

		console.log(error);
		console.log("Failed to fetch an advert")
		response.status(500).end()
	}

});



/*
app.get("/humans", async function(request, response){
	
	console.log("Hello there hi from shoptech")
	
	try{
		
		const connection = await pool.getConnection()
		
		const query = "SELECT * FROM humans ORDER BY name"
		
		const humans = await connection.query(query)
		
		response.status(200).json(humans)
		
	}catch(error){
		console.log(error)
		response.status(500).end()
	}
	
})

app.get("/", function(request, response){
	response.send("It works, shoptech")
})
*/

app.listen(8080)