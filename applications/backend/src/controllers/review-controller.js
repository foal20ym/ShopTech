import db from "../database-operations/db.js"
const REVIEW_USERNAME_MAX_LENGTH = 50;
const REVIEW_USERNAME_MIN_LENGTH = 2;
const REVIEW_DESCRIPTION_MAX_LENGTH = 300;
const REVIEW_DESCRIPTION_MIN_LENGTH = 5;
const REVIEW_STARS_MAX = 5;
const REVIEW_STARS_MIN = 0;
const DATABASE_ERROR_MESSAGE = "Internal server error";

function getErrorMessagesForReview(username, description, stars) {
  const errorMessages = [];
  console.log(stars);

  if (username.length > REVIEW_USERNAME_MAX_LENGTH) {
    errorMessages.push("Username may at most be " + REVIEW_USERNAME_MAX_LENGTH + " characters long");
  } else if (username.length < REVIEW_USERNAME_MIN_LENGTH) {
    errorMessages.push("Username can't be less than " + REVIEW_USERNAME_MIN_LENGTH + " characters long");
  }

  if (description.length > REVIEW_DESCRIPTION_MAX_LENGTH) {
    errorMessages.push("Description may at most be " + REVIEW_DESCRIPTION_MAX_LENGTH + " characters long")
  } else if (description.length < REVIEW_DESCRIPTION_MIN_LENGTH) {
    errorMessages.push("Description can't be less than " + REVIEW_DESCRIPTION_MIN_LENGTH + " characters long");
  }

  if (isNaN(stars)) {
    errorMessages.push("Stars must be a number");
  } else if (stars > REVIEW_STARS_MAX) {
    errorMessages.push("Stars may at most be " + REVIEW_STARS_MAX);
  } else if (stars < REVIEW_STARS_MIN) {
    errorMessages.push("Stars can't be negative");
  }
  return errorMessages;
}

export async function getReviews(requset, response) {
  try {
    const reviews = await db.query("SELECT * FROM reviews");
    response.status(200).json(reviews)
  } catch (error) {
    console.error(error);
    response.status(500).json(DATABASE_ERROR_MESSAGE)
  }
}

export async function getReviewById(request, response) {
  try {
    const review = await db.query("SELECT * FROM reviews WHERE id = ?", [request.params.id]);
    response.status(200).json(review[0]);
  } catch (error) {
    console.error(error);
    response.status(500).json(DATABASE_ERROR_MESSAGE);
  }
}

export async function createReview(request, response) {
  console.log(request.body.stars)
  const errorMessages = getErrorMessagesForReview(
    request.body.username,
    request.body.description,
    parseInt(request.body.stars)
  );
  if (!errorMessages.length == 0) {
    response.status(400).json(errorMessages);
    return;
  } else {
    try {
      const values = [
        request.body.username,
        request.body.description,
        request.body.stars,
      ];
      const newReview = await db.query(
        "INSERT INTO reviews (username, description, stars) VALUES (?, ?, ?)",
        values
      );
      const id = newReview.insertId;
      response
        .status(201)
        .location("/review/" + id.toString())
        .json();
    } catch (error) {
      console.error(error);
      response.status(500).json(DATABASE_ERROR_MESSAGE);
    }
  }
}

export async function updateReviewById(request, response) {
  const errorMessages = getErrorMessagesForReview(
    request.body.updatedUsername,
    request.body.updatedDescription,
    parseInt(request.body.updatedStars)
  );
  if (!errorMessages.length == 0) {
    response.status(400).json(errorMessages);
    return;
  } else {
    try {
      const values = [
        request.body.updatedUsername,
        request.body.updatedDescription,
        request.body.updatedStars.toString(),
        request.params.id,
      ];
      const updatedReview = await db.query(
        "UPDATE reviews SET username = ?, description = ?, stars = ? WHERE id = ?",
        values
      );
      response.status(200).send("Review updated successfully");
    } catch (error) {
      console.error(error);
      response.status(500).json(DATABASE_ERROR_MESSAGE);
    }
  }
}

export async function deleteReviewById(request, response) {
  try {
    await db.query("DELETE FROM reviews WHERE id = ?", [request.params.id]);
    response.status(204).send("Review deleted successfully");
  } catch (error) {
    console.error(error);
    response.status(500).json(DATABASE_ERROR_MESSAGE);
  }
}
