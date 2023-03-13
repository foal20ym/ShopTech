import express, { json } from 'express'
//import faqRouter from "./routers/faq-router.js";
//import advertRouter from "./routers/advert-router.js";
import { createPool } from 'mariadb'
//import multer from 'multer'

const MIN_TITLE_LENGTH = 6
const MAX_TITLE_LENGTH = 25
const MIN_DESCRIPTION_LENGTH = 15
const MAX_DESCRIPTION_LENGTH = 128
const MIN_PRICE = 1
const MAX_PRICE = Number.MAX_SAFE_INTEGER




const app = express();
app.use(express.json());

//app.use("/faq", faqRouter);
//app.use("/adverts", advertRouter);

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

	const errorMessages = []
	const advertData = request.body
	
	if (advertData.title.length == 0) {
		errorMessages.push("Title can't be null");
	} else if (MAX_TITLE_LENGTH < advertData.title.length) {
		errorMessages.push(
			"Title can't be more than " + MAX_TITLE_LENGTH + " characters long."
		);
	} else if (advertData.title.length < MIN_TITLE_LENGTH) {
		errorMessages.push(
			"Title can't be less than " + MIN_TITLE_LENGTH + " characters long."
		);
	}

	if (advertData.description.length == 0) {
		errorMessages.push("Description can't be null");
	} else if (MAX_DESCRIPTION_LENGTH < advertData.description.length) {
		errorMessages.push(
			"Description can't be more than " +
			MAX_DESCRIPTION_LENGTH +
			"characters long."
		);
	} else if (advertData.description.length < MIN_DESCRIPTION_LENGTH) {
		errorMessages.push(
			"Description can't be less than " +
			MIN_DESCRIPTION_LENGTH +
			" characters long."
		);
	}

	if (advertData.price == 0) {
		errorMessages.push("Price can't be 0");
	} else if (MAX_PRICE < advertData.price) {
		errorMessages.push(
			"Price can't be more than " +
			MAX_PRICE +
			"."
		);
	} else if (advertData.price < MIN_PRICE) {
		errorMessages.push(
			"Price can't be less than " +
			MIN_PRICE +
			"."
		);
	}

	if(0 < errorMessages.length){
		response.status(400).json(errorMessages)
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

		response.status(200).json(advert[0])

		console.log("Advert created")

		connection.end()

	} catch (error) {

		console.log(error);
		console.log("Failed to create advert")
		response.status(500).end()
	}
	
})


app.listen(8080, () => console.log("Server started"));





