import express from 'express'
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
})

pool.on('error', function(error){
	console.log("Error from pool", error)
})

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get("/", async function(request, response){
	
	console.log("Hello there from shoptech")
	
	try{
		
		const connection = await pool.getConnection()
		
		const query = "SELECT * FROM adverts"
		
		const adverts = await connection.query(query)
		
		response.status(200).json(adverts)
		
	}catch(error){
		console.log(error)
		response.status(500).end()
	}
	
})





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

app.listen(8080)