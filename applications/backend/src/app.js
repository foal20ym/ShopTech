import express from "express";
import faqRouter from "./routers/faq-router.js";

const app = express();
app.use(express.json());

app.use("/faq", faqRouter);

app.use(function (request, response, next) {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "*");
  response.set("Access-Control-Allow-Headers", "*");
  response.set("Access-Control-Expose-Headers", "*");

  next();
});



/*app.get("/", async function (request, response) {
  console.log("Hello there from shoptech");

  try {
    const connection = await pool.getConnection();

    const query = "SELECT * FROM adverts";

    const adverts = await connection.query(query);

    response.status(200).json(adverts);

    connection.end();
  } catch (error) {
    console.log(error);
    response.status(500).end();
  }
});

app.get("/advert/:id", async function (request, response) {
  console.log("Fetching an advert");

  try {
    const id = request.params.id;

    const connection = await pool.getConnection();

    const advert = await connection.query(
      "SELECT * FROM adverts WHERE advertID = ?",
      [id]
    );

    console.log(advert);

    response.status(200).json(advert[0]);

    connection.end();
  } catch (error) {
    console.log(error);
    console.log("Failed to fetch an advert");
    response.status(500).end();
  }
});*/

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

app.listen(8080, () => console.log("Server started"));
