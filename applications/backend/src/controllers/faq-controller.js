import db from "../database-connection/db.js";
import { ACCESS_TOKEN_SECRET } from "./auth-controller.js";
import jwt from "jsonwebtoken";
const FAQ_QUESTION_MAX_LENGTH = 100;
const FAQ_QUESTION_MIN_LENGTH = 5;
const FAQ_ANSWER_MAX_LENGTH = 420;
const FAQ_ANSWER_MIN_LENGTH = 2;
const DATABASE_ERROR_MESSAGE = "Internal server error";
const UNAUTHORIZED_USER_ERROR = "Unauthorized action performed";

function getErrorMessagesForFAQ(question, answer) {
  const errorMessages = [];

  if (question.length > FAQ_QUESTION_MAX_LENGTH) {
    errorMessages.push(
      "Question may at most be " + FAQ_QUESTION_MAX_LENGTH + " characters long"
    );
  } else if (question.length < FAQ_QUESTION_MIN_LENGTH) {
    errorMessages.push(
      "Question can't be less than " +
        FAQ_QUESTION_MIN_LENGTH +
        " characters long"
    );
  }

  if (answer.length > FAQ_ANSWER_MAX_LENGTH) {
    errorMessages.push(
      "Answer may at most be " + FAQ_ANSWER_MAX_LENGTH + " characters long"
    );
  } else if (answer.length < FAQ_ANSWER_MIN_LENGTH) {
    errorMessages.push(
      "Answer may at most be " + FAQ_ANSWER_MIN_LENGTH + " characters long"
    );
  }
  return errorMessages;
}

export async function getFAQ(request, response) {
  try {
    const faqs = await db.query("SELECT * FROM faqs");
    response.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    response.status(500).json([DATABASE_ERROR_MESSAGE]);
  }
}

export async function getFAQById(request, response) {
  try {
    const faq = await db.query("SELECT * FROM faqs WHERE id = ?", [
      request.params.id,
    ]);
    response.status(200).json(faq[0]);
  } catch (error) {
    response.status(500).json([DATABASE_ERROR_MESSAGE]);
  }
}

export async function createFAQ(request, response) {
  const errorMessages = getErrorMessagesForFAQ(
    request.body.question,
    request.body.answer
  );
  if (!errorMessages.length == 0) {
    response.status(400).json(errorMessages);
    return;
  } else {
    try {
      const authorizationHeaderValue = request.get("Authorization");
      const accessToken = authorizationHeaderValue.substring(7);
      const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      if (!decodedToken.isAdmin) {
        throw new jwt.JsonWebTokenError();
      }

      console.log(request.body);
      const values = [
        request.body.question.toString(),
        request.body.answer.toString(),
      ];
      const newFAQ = await db.query(
        "INSERT INTO faqs (question, answer) VALUES (?, ?)",
        values
      );
      const id = newFAQ.insertId;
      response
        .status(201)
        .location("/faq/" + id.toString())
        .json();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        response.status(401).json([UNAUTHORIZED_USER_ERROR]);
      } else {
        response.status(500).json([DATABASE_ERROR_MESSAGE]);
      }
    }
  }
}

export async function updateFAQById(request, response) {
  const errorMessages = getErrorMessagesForFAQ(
    request.body.updatedQuestion,
    request.body.updatedAnswer
  );
  if (!errorMessages.length == 0) {
    response.status(400).json(errorMessages);
    return;
  } else {
    try {
      const authorizationHeaderValue = request.get("Authorization");
      const accessToken = authorizationHeaderValue.substring(7);
      const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

      if (!decodedToken.isAdmin) {
        throw new jwt.JsonWebTokenError();
      }

      const values = [
        request.body.updatedQuestion,
        request.body.updatedAnswer,
        request.params.id,
      ];
      const updatedFAQ = await db.query(
        "UPDATE faqs SET question = ?, answer = ? WHERE id = ?",
        values
      );
      response.status(200).send("FAQ updated successfully");
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        response.status(401).json([UNAUTHORIZED_USER_ERROR]);
      } else {
        console.log(error.status);
        console.error(error.status);
        response.status(500).json([DATABASE_ERROR_MESSAGE]);
      }
    }
  }
}

export async function deleteFAQById(request, response) {
  try {
    const authorizationHeaderValue = request.get("Authorization");
    const accessToken = authorizationHeaderValue.substring(7);
    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    if (!decodedToken.isAdmin) {
      throw new jwt.JsonWebTokenError();
    }

    await db.query("DELETE FROM faqs WHERE id = ?", [request.params.id]);
    response.status(204).send("FAQ successfully deleted");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      response.status(401).json([UNAUTHORIZED_USER_ERROR]);
    } else {
      console.error(error.status);
      response.status(500).json([DATABASE_ERROR_MESSAGE]);
    }
  }
}
