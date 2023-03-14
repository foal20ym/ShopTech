import express, { json } from 'express'
import faqRouter from "./routers/faq-router.js";
import advertRouter from "./routers/advert-router.js";
import jwt from "jsonwebtoken"
import db from './database-operations/db.js';
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

const ACCESS_TOKEN_SECRET = "83hrb4gruyeiw24kdwe7"

const SALT_ROUNDS = 10


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded())


app.use(function(request, response, next){

	response.set("Access-Control-Allow-Origin", "*")
	response.set("Access-Control-Allow-Methods", "*")
	response.set("Access-Control-Allow-Headers", "*")
	response.set("Access-Control-Expose-Headers", "*")

	next()
})

app.use("/faq", faqRouter);
app.use("/", advertRouter);




app.post("/tokens", async function(request, response){

	const grantType = request.body.grant_type
	const username = request.body.username
	const password = request.body.password
	let existingPassword = ""
	console.log(grantType)
	console.log(username)
	console.log(password)


	try {
		const user = await db.query("SELECT * FROM accounts WHERE email = ?", username);
		console.log(user)
		existingPassword = user[0]?.password || ""
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
		return
	}


	if(grantType != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}
	
	console.log(password)
	console.log(existingPassword)
	const isMatch = await bcrypt.compare(password, existingPassword)

	if(grantType != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}

	if(isMatch){

		const payload = {
			isLoggedIn: true, 
		}

		jwt.sign(payload, ACCESS_TOKEN_SECRET, function(error, accessToken){

			if(error){
				response.status(500).end()
			} else {
				response.status(200).json({
					access_token: accessToken,
					type: "bearer", 
				})
			}
		})

	} else {

		response.status(400).json({error: "invalid_grant"})
		console.log("Login failed")

	}
})

app.post("/signup", async function(request, response){

	console.log("Creating account")
	const accountData = request.body
	console.log(accountData)
	const hashedPassword = await bcrypt.hash(accountData.password, SALT_ROUNDS)

	try {
		const values = [accountData.email, hashedPassword, accountData.firstName, accountData.lastName, accountData.phoneNumber];
		const newAccount = await db.query("INSERT INTO accounts (email, password, firstName, lastName, phoneNumber) VALUES (?,?,?,?,?)", values);
		response.status(201).send("Account created successfully").json();
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
})


app.listen(8080, () => console.log("Server started"));


/*
const username = ""
	const password = ""
	const accountID = request.params.id

	try {
		const values = accountID;
		const user = await db.query("SELECT * FROM accounts WHERE accountID = ?", values);
		username = user.email
		password = user.password
		response.status(201).send("Account created successfully").json();
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}




	if(grantType != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}
	
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
	const isMatch = await bcrypt.compare(password, hashedPassword)

	if(isMatch){
		*/



