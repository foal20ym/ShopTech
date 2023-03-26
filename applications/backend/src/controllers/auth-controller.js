import db from "../database-connection/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const ACCESS_TOKEN_SECRET = "83hrb4gruyeiw24kdwe7";
const SALT_ROUNDS = 10;
const MIN_EMAIL_LENGTH = 6;
const MAX_EMAIL_LENGTH = 128;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 128;
const MIN_FIRSTNAME_LENGTH = 2;
const MAX_FIRSTNAME_LENGTH = 128;
const MIN_LASTNAME_LENGTH = 2;
const MAX_LASTNAME_LENGTH = 128;
export const ADMIN_EMAIL = "admin@shoptech.com";

export async function getUserByEmail(request, response) {
  try {
    const user = await db.query("SELECT * FROM accounts WHERE email = ?", [
      request.params.id,
    ]);
    response.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
  }
}

export async function getUserByAdvertId(request, response) {
  let accountID = "";

  try {
    const adverts = await db.query("SELECT * FROM adverts WHERE advertID = ?", [
      request.params.id,
    ]);
    accountID = adverts[0].accountID;
    console.log("accountID", accountID);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
  }

  try {
    const user = await db.query("SELECT * FROM accounts WHERE accountID = ?", [
      accountID,
    ]);
    console.log("owner email", user[0].email);
    response.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(request, response) {
  const grantType = request.body.grant_type;
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;
  let existingPassword = "";
  console.log("granttype:", grantType);
  console.log("email:", email);
  console.log("username:", username);
  console.log("password:", password);

  try {
    const user = await db.query(
      "SELECT * FROM accounts WHERE email = ?",
      username
    );
    console.log(user);
    existingPassword = user[0]?.password || "";
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
    return;
  }

  if (grantType != "password") {
    response.status(400).json({ error: "unsupported_grant_type" });
    return;
  }

  console.log("password:", password);
  console.log("existing password", existingPassword);
  const isMatch = await bcrypt.compare(password, existingPassword);

  if (grantType != "password") {
    response.status(400).json({ error: "unsupported_grant_type" });
    return;
  }

  if (isMatch) {
    let payload = null;

    if (username == ADMIN_EMAIL) {
      payload = {
        isAdmin: true,
        isLoggedIn: true,
      };
    } else {
      payload = {
        isAdmin: false,
        isLoggedIn: true,
      };
    }

    jwt.sign(payload, ACCESS_TOKEN_SECRET, function (error, accessToken) {
      if (error) {
        response.status(500).end();
      } else {
        if (payload.isAdmin) {
          response.status(200).json({
            access_token: accessToken,
            type: "bearer",
            username: username,
            admin: "admin",
          });
        } else {
          response.status(200).json({
            access_token: accessToken,
            type: "bearer",
            username: username,
            admin: "",
          });
        }
      }
    });
  } else {
    response.status(400).json({ error: "invalid_grant" });
    console.log("Login failed");
  }
}

function validatePassword(password) {
  const errorMessages = [];
  var regexCheckNumber = /^(?=.*[0-9])/;
  var regexCheckSpecialCharacter = /^(?=.*[!@#$%^&*])/;

  if (regexCheckNumber.test(password)) {
    errorMessages.push("Password must contain at least one digit");
  }
  if (regexCheckSpecialCharacter.test(password)) {
    errorMessages.push("Password must contain at least one special character");
  }
  return errorMessages;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export async function signUp(request, response) {
  console.log("Creating account");
  const accountData = request.body;
  const errorMessages = [];
  console.log(accountData);
  const hashedPassword = await bcrypt.hash(accountData.password, SALT_ROUNDS);

  const date = new Date();
  const createdAt = date.toISOString().split("T")[0];

  const regexCheckNumber = /^(?=.*[0-9])/;
  const regexCheckSpecialCharacter = /^(?=.*[!@#$%^&*])/;

  if (!validateEmail(accountData.email)) {
    errorMessages.push("Invalid email");
  }
  if (accountData.address.length == 0) {
    errorMessages.push("Address can't be null, please enter a valid address.");
  }
  if (accountData.phoneNumber.length == 0) {
    errorMessages.push("Invalid phone number: Too short");
  } else if (!regexCheckNumber.test(accountData.phoneNumber)) {
    errorMessages.push("Invalid phone number: Must be digits only");
  }
  if (regexCheckSpecialCharacter.test(accountData.password)) {
    errorMessages.push("Password must contain at least one special character");
  } else if (accountData.password.length == 0) {
    errorMessages.push("Password length can't be 0");
  } else if (accountData.password.length < MIN_PASSWORD_LENGTH) {
    errorMessages.push(
      "Password must be at least " + MIN_PASSWORD_LENGTH + " characters long"
    );
  } else if (MAX_PASSWORD_LENGTH < accountData.password.length) {
    errorMessages.push(
      "Password can't be more than " + MAX_PASSWORD_LENGTH + " characters long"
    );
  }

  if (accountData.email.length == 0) {
    errorMessages.push("Email length can't be 0");
  } else if (accountData.email.length < MIN_EMAIL_LENGTH) {
    errorMessages.push(
      "Email can't be less than " + MIN_EMAIL_LENGTH + " characters long"
    );
  } else if (MAX_EMAIL_LENGTH < accountData.email.length) {
    errorMessages.push(
      "Email can't be more than " + MAX_EMAIL_LENGTH + " characters long"
    );
  }

  if (accountData.firstName.length == 0) {
    errorMessages.push("First name length can't be 0");
  } else if (accountData.firstName.length < MIN_FIRSTNAME_LENGTH) {
    errorMessages.push(
      "First name must be at least " + MIN_FIRSTNAME_LENGTH + " characters long"
    );
  } else if (MAX_FIRSTNAME_LENGTH < accountData.firstName.length) {
    errorMessages.push(
      "First name can't be more than " +
        MAX_FIRSTNAME_LENGTH +
        " characters long"
    );
  }

  if (accountData.lastName.length == 0) {
    errorMessages.push("Last name length can't be 0");
  } else if (accountData.lastName.length < MIN_LASTNAME_LENGTH) {
    errorMessages.push(
      "Last name must be at least " + MIN_LASTNAME_LENGTH + " characters long"
    );
  } else if (MAX_LASTNAME_LENGTH < accountData.lastName.length) {
    errorMessages.push(
      "Last name can't be more than " + MAX_LASTNAME_LENGTH + " characters long"
    );
  }

  if (0 < errorMessages.length) {
    response.status(400).json(errorMessages);
    console.log("Statuscode: 400, [errors]");
    return;
  }

  try {
    const values = [
      accountData.email,
      accountData.username,
      hashedPassword,
      accountData.address,
      accountData.firstName,
      accountData.lastName,
      accountData.phoneNumber,
      createdAt,
    ];
    const newAccount = await db.query(
      "INSERT INTO accounts (email, username, password, address, firstName, lastName, phoneNumber, createdAt) VALUES (?,?,?,?,?,?,?,?)",
      values
    );
    response.status(201).send("Account created successfully").json();
    console.log("Account created successfully");
  } catch (error) {
    console.error(error);
    console.log("error");
    response.status(500).send("Internal server error");
  }
}

export async function registerGoogleAuthUser(request, response) {
  console.log("registerGoogleAuthUser");
  const accountData = request.body;
  const date = new Date();
  const createdAt = date.toISOString().split("T")[0];

  try {
    const values = [
      accountData.emailFromUserStore,
      accountData.firstName,
      accountData.lastName,
      createdAt,
    ];
    const newAccount = await db.query(
      "INSERT INTO accounts (email, firstName, lastName, createdAt) VALUES (?,?,?,?)",
      values
    );
    response.status(201).send("Account created successfully").json();
    console.log("Account created successfully");
  } catch (error) {
    console.error(error);
    console.log("error");
    response.status(500).send("Internal server error");
  }
}

export async function updateAccountByEmail(request, response) {
  const accountData = request.body;

  if (!request.body) {
    response.status(400).send("Missing request body");
    return;
  }
  try {
    const values = [
      accountData.firstName,
      accountData.lastName,
      accountData.address,
      accountData.phoneNumber,
      request.params.id,
    ];
    const updatedAccount = await db.query(
      "UPDATE accounts SET firstName = ?, lastName = ?, address = ?, phoneNumber = ? WHERE email = ?",
      values
    );
    response.status(200).send("Account updated successfully").json();
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
  }
}

export async function deleteAccountByEmail(request, response) {
  console.log("DELETE ACCOUNT");
  try {
    console.log([request.params.id]);
    await db.query("DELETE FROM accounts WHERE email = ?", [request.params.id]);
    response.status(204).send("Account successfully deleted");
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal server error");
  }
}
