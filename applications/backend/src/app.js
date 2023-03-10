import express, { json } from 'express'
import { createPool } from 'mariadb'
import multer from 'multer'


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

	} catch (error) {

		console.log(error);
		console.log("Failed to fetch an advert")
		response.status(500).end()
	}

});



app.post("/createad", async function(request, response){

	console.log("Create advert!")

	const errorCodes = []
	const advertData = request.body
	
	if(advertData.title.length < 1){
		errorCodes.push("Title can't be empty")
	}
	if(0 < errorCodes.length){
		response.status(400).json(errorCodes)
		return
	}

	const timestamp = Date.now()

	try {

		const connection = await pool.getConnection()

		const advert = await connection.query
		(
			"INSERT INTO adverts (category, title, price, description, img_src) VALUES (?,?,?,?,?)",
			[advertData.category, advertData.title, advertData.price, advertData.description, advertData.img_src]
		)

		console.log("Creating advert 2")
		response.status(200).json(advert[0])

		console.log("Advert created")
		//response.set("Location", "/advert/${advertData.advertID}")

		connection.end()

	} catch (error) {

		console.log(error);
		console.log("Failed to create advert")
		response.status(500).end()
	}
	
})


app.listen(8080)