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

app.use("/api/faq", faqRouter);
app.use("/reviews", reviewRouter)
app.use("/", advertRouter);
app.use("/", authRouter);



app.listen(8080, () => console.log("Server started"));



