import express, { json } from 'express'
import faqRouter from "./routers/faq-router.js";
import advertRouter from "./routers/advert-router.js";
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = "83hrb4gruyeiw24kdwe7"


const app = express();
app.use(express.json());

app.use(function(request, response, next){

	response.set("Access-Control-Allow-Origin", "*")
	response.set("Access-Control-Allow-Methods", "*")
	response.set("Access-Control-Allow-Headers", "*")
	response.set("Access-Control-Expose-Headers", "*")

	next()
})

app.use("/faq", faqRouter);
app.use("/", advertRouter);


app.post("/tokens", function(request, response){

	const grantType = request.body.grant_type
	const username = request.body.username
	const password = request.body.password

	if(grantType != "password"){
		response.status(400).json({error: "unsupported_grant_type"})
		return
	}
	if(username == null){
		response.status(400).json({error: "invalid_request"})
		return
	}
	if(password == null){
		response.status(400).json({error: "invalid_request"})
		return
	}

	if(username == "abc" && password == "abc123"){

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

		response.status(400).json({error: "inavlid_grant"})

	}
})






app.listen(8080, () => console.log("Server started"));





