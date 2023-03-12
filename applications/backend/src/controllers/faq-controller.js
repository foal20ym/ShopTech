import db from "../database-operations/db.js"

export async function getFAQ(request, response) {
	try {
		const faqs = await db.query("SELECT question, answer FROM faqs");
		response.status(200).json(faqs);
	} catch (error) {
		console.error(error);
		response.status(500).send("Error getting FAQ");
	}
}

export async function getFAQById(request, response) {
	try {
		const faq = await db.query("SELECT question, answer FROM faqs WHERE id = ?", [request.params.id]);
		response.status(200).json(faq);
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
		const values = [request.body.question, request.body.answer];
		const newFAQ = await db.query("INSERT INTO faqs (question, answer) VALUES (?, ?)", values);
		response.status(201).send("FAQ created successfully").json(newFAQ);
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
		response.status(200).send("FAQ updated successfully").json(updatedFAQ);
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


