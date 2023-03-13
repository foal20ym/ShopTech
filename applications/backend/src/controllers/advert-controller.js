/*import db from "../database-operations/db.js"

export async function getAdverts(request, response) {
	try {
		const adverts = await db.query("SELECT * FROM adverts");
		response.status(200).json(adverts);
	} catch (error) {
		console.error(error);
		response.status(500).send("Error getting Adverts");
	}
}

export async function getAdvertById(request, response) {
	try {
		const advert = await db.query("SELECT * FROM adverts WHERE advertID = ?", [request.params.id]);
		response.status(200).json(advert);
	} catch (error) {
		response.status(500).send("Error getting advert");
	}
}

export async function createAdvert(request, response) {
	console.log(request.body);
	if (!request.body) {
		response.status(400).send("Missing request body")
		return;
	}
	try {
		console.log(request.body);
		const values = [advertData.category, advertData.title, advertData.price, advertData.description, advertData.img_src];
		const newAdvert = await db.query("INSERT INTO adverts (category, title, price, description, img_src) VALUES (?,?,?,?,?)", values);
		response.status(201).send("Advert created successfully").json(newAdvert);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}


export async function updateAdvertById(request, response) {
	if (!request.body) {
		response.status(400).send("Missing request body");
		return;
	}
	try {
		const values = [request.body.updatedQuestion, request.body.updatedAnswer, request.params.id];
		const updatedFAQ = await db.query("UPDATE faqs SET question = ?, answer = ? WHERE id = ?", values);
		response.status(200).send("FAQ updated successfully").json(updatedFAQ);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function deleteAdvertById(request, response) {
	try {
		await db.query("DELETE FROM faqs WHERE id = ?", [request.params.id])
		response.status(204).send("FAQ successfully deleted");
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}
*/