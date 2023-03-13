import db from "../database-operations/db.js"

export async function getFAQ(request, response) {
	try {
		const faqs = await db.query("SELECT * FROM faqs");
		response.status(200).json(faqs);
	} catch (error) {
		console.error(error);
		response.status(500).send("Error getting FAQ");
	}
}

export async function getFAQById(request, response) {
	try {
		const faq = await db.query("SELECT * FROM faqs WHERE id = ?", [request.params.id]);
		response.status(200).json(faq[0]);
	} catch (error) {
		response.status(500).send("Error getting FAQ");
	}
}

export async function createFAQ(request, response) {
	console.log(request.body);
	if (!request.body) {
		response.status(400).send("Missing request body")
		return;
	}
	try {
		console.log(request.body);
		const values = [request.body.question.toString(), request.body.answer.toString()];
		const newFAQ = await db.query("INSERT INTO faqs (question, answer) VALUES (?, ?)", values);
		const id = newFAQ.insertId;
		console.log("här kommer id: "+id.toString())
		response.status(201).location("/faq/"+id.toString()).json();
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function updateFAQById(request, response) {
	if (!request.body) {
		response.status(400).send("Missing request body");
		return;
	}
	try {
		const values = [request.body.updatedQuestion, request.body.updatedAnswer, request.params.id];
		const updatedFAQ = await db.query("UPDATE faqs SET question = ?, answer = ? WHERE id = ?", values);
		response.status(200).send("FAQ updated successfully");
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function deleteFAQById(request, response) {
	try {
		await db.query("DELETE FROM faqs WHERE id = ?", [request.params.id])
		response.status(204).send("FAQ successfully deleted");
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}


