import db from "../database-operations/db.js"

export async function getReviews(requset, response) {
	try {
		const reviews = await db.query("SELECT * FROM reviews");
		response.status(200).json(reviews)
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error")
	}
}

export async function getReviewById(request, response) {
	try {
		const review = await db.query("SELECT * FROM reviews WHERE id = ?", [request.params.id]);
		response.status(200).json(review[0]);
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function createReview(request, response) {
	if (!request.body) {
		response.status(400).send("Missing request body");
		return;
	}
	try {
		const values = [request.body.username, request.body.description, request.body.stars];
		const newReview = await db.query("INSERT INTO reviews (username, description, stars) VALUES (?, ?, ?)", values);
		const id = newReview.insertId;
		response.status(201).location("/review/"+id.toString()).json();
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function updateReviewById(request, response) {
	if (!request.body) {
		response.status(400).send("Missing request body");
		return;
	}
	try {
		const values = [request.body.updatedUsername, request.body.updatedDescription, request.body.updatedStars.toString(), request.params.id];
		const updatedReview = await db.query("UPDATE reviews SET username = ?, description = ?, stars = ? WHERE id = ?", values);
		response.status(200).send("Review updated successfully");
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}

export async function deleteReviewById(request, response) {
	try {
		await db.query("DELETE FROM reviews WHERE id = ?", [request.params.id]);
		response.status(204).send("Review deleted successfully");
	} catch (error) {
		console.error(error);
		response.status(500).send("Internal server error");
	}
}
