import express, { json } from 'express'
import faqRouter from "./routers/faq-router.js";
import advertRouter from "./routers/advert-router.js";
import authRouter from "./routers/auth-router.js"
import reviewRouter from "./routers/review-router.js"
import bodyParser from 'body-parser'
import multer from 'multer'

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
app.use("/reviews", reviewRouter)
app.use("/", advertRouter);
app.use("/", authRouter);

/*
const ACCESS_TOKEN_SECRET = "83hrb4gruyeiw24kdwe7"
const SALT_ROUNDS = 10
const MIN_EMAIL_LENGTH = 6
const MAX_EMAIL_LENGTH = 128
const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 128
const MIN_FIRSTNAME_LENGTH = 2
const MAX_FIRSTNAME_LENGTH = 128
const MIN_LASTNAME_LENGTH = 2
const MAX_LASTNAME_LENGTH = 128



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

function validatePassword(password){
	const errorMessages = []
	var regexCheckNumber = /^(?=.*[0-9])/;
	var regexCheckSpecialCharacter = /^(?=.*[!@#$%^&*])/;

    if(regexCheckNumber.test(password)){
		errorMessages.push("Password must contain at least one digit")
	}
	if(regexCheckSpecialCharacter.test(password)){
		errorMessages.push("Password must contain at least one special character")
	}
	return errorMessages;
}

function validateEmail(email){
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
    return true;
	} else {
		return false;
	}
}

app.post("/signup", async function(request, response){

	console.log("Creating account")
	const accountData = request.body
	const errorMessages = []
	console.log(accountData)
	const hashedPassword = await bcrypt.hash(accountData.password, SALT_ROUNDS)

	const regexCheckNumber = /^(?=.*[0-9])/;
	const regexCheckSpecialCharacter = /^(?=.*[!@#$%^&*])/;

	if(!validateEmail(accountData.email)){
		errorMessages.push("Invalid email")
	}
    if(regexCheckNumber.test(accountData.password)){
		errorMessages.push("Password must contain at least one digit")
	}
	if(regexCheckSpecialCharacter.test(accountData.password)){
		errorMessages.push("Password must contain at least one special character")
	}
	if(accountData.password.length == 0){
		errorMessages.push("Password length can't be 0")
	} else if(accountData.password.length < MIN_PASSWORD_LENGTH){
		errorMessages.push("Password must be at least " + MIN_PASSWORD_LENGTH + " characters long")
	} else if(MAX_PASSWORD_LENGTH < accountData.password.length){
		errorMessages.push("Password can't be more than " + MAX_PASSWORD_LENGTH + " characters long")
	}

	if(accountData.email.length == 0){
		errorMessages.push("Email length can't be 0")
	} else if(MAX_EMAIL_LENGTH < accountData.email.length){
		errorMessages.push("Email can't be more than " + MAX_EMAIL_LENGTH + " characters long")
	}

	if(accountData.firstName.length == 0){
		errorMessages.push("First name length can't be 0")
	} else if(accountData.firstName.length < MIN_FIRSTNAME_LENGTH){
		errorMessages.push("First name must be at least " + MIN_FIRSTNAME_LENGTH + " characters long")
	} else if(MAX_FIRSTNAME_LENGTH < accountData.firstName.length){
		errorMessages.push("First name can't be more than " + MAX_FIRSTNAME_LENGTH + " characters long")
	}

	if(accountData.lastName.length == 0){
		errorMessages.push("Last name length can't be 0")
	} else if(accountData.lastName.length < MIN_LASTNAME_LENGTH){
		errorMessages.push("Last name must be at least " + MIN_LASTNAME_LENGTH + " characters long")
	} else if(MAX_LASTNAME_LENGTH < accountData.lastName.length){
		errorMessages.push("Last name can't be more than " + MAX_LASTNAME_LENGTH + " characters long")
	}

	if(0 < errorMessages.length){
		response.status(400).json(errorMessages)
		console.log("Statuscode: 400, [errors]")
		return
	}

	try {
		const values = [accountData.email, hashedPassword, accountData.firstName, accountData.lastName, accountData.phoneNumber];
		const newAccount = await db.query("INSERT INTO accounts (email, password, firstName, lastName, phoneNumber) VALUES (?,?,?,?,?)", values);
		response.status(201).send("Account created successfully").json();
		console.log("Account created successfully")
	} catch (error) {
		console.error(error);
		console.log("error")
		response.status(500).send("Internal server error");
	}
})

*/

app.listen(8080, () => console.log("Server started"));



