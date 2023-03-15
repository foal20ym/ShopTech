import db from "../database-operations/db.js"
import path from 'path'
import multer from 'multer'


const MIN_TITLE_LENGTH = 6
const MAX_TITLE_LENGTH = 25
const MIN_DESCRIPTION_LENGTH = 15
const MAX_DESCRIPTION_LENGTH = 128
const MIN_PRICE = 1
const MAX_PRICE = Number.MAX_SAFE_INTEGER

const storage = multer.diskStorage({
	destination: (request, file, cb) => {
		cb(null, "../public");
	},

	filename: (request, file, cb) => {
		const fileName = Date.now() + path.extname(file.originalname);

		request.filePath = fileName;
		cb(null, fileName);
	},
});

export const upload = multer({
	storage: storage,

	fileFilter: (req, file, cb) => {
		if (allowedFileTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			req.isUploadError = true;

			cb(null, false);
		}
	},
});

export async function getUserAdverts(request, response) {

	console.log("FETCHING USER ADVERTS")
	let accountID = ""

    try {
        const user = await db.query("SELECT * FROM accounts WHERE email = ?", [request.params.id]);
		accountID = user[0].accountID
		console.log(accountID)
    } catch (error) {
        console.error(error);
    }

    try {
        const adverts = await db.query("SELECT * FROM adverts WHERE accountID = ?", [accountID]);
        response.status(200).json(adverts);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal server error");
    }
}

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
		response.status(200).json(advert[0]);
	} catch (error) {
		response.status(500).send("Error getting advert");
	}
}

export async function createAdvert(request, response) {
	
    console.log("Create advert!")





	const errorMessages = []
	const advertData = request.body

	const date = new Date();
	const timeNow = date.toISOString().split("T")[0];
	
	if (advertData.title.length == 0) {
		errorMessages.push("Title can't be null");
	} else if (MAX_TITLE_LENGTH < advertData.title.length) {
		errorMessages.push(
			"Title can't be more than " + MAX_TITLE_LENGTH + " characters long."
		);
	} else if (advertData.title.length < MIN_TITLE_LENGTH) {
		errorMessages.push(
			"Title can't be less than " + MIN_TITLE_LENGTH + " characters long."
		);
	}

	if (advertData.description.length == 0) {
		errorMessages.push("Description can't be null");
	} else if (MAX_DESCRIPTION_LENGTH < advertData.description.length) {
		errorMessages.push(
			"Description can't be more than " +
			MAX_DESCRIPTION_LENGTH +
			"characters long."
		);
	} else if (advertData.description.length < MIN_DESCRIPTION_LENGTH) {
		errorMessages.push(
			"Description can't be less than " +
			MIN_DESCRIPTION_LENGTH +
			" characters long."
		);
	}

	if (advertData.price == 0) {
		errorMessages.push("Price can't be 0");
	} else if (MAX_PRICE < advertData.price) {
		errorMessages.push(
			"Price can't be more than " +
			MAX_PRICE +
			"."
		);
	} else if (advertData.price < MIN_PRICE) {
		errorMessages.push(
			"Price can't be less than " +
			MIN_PRICE +
			"."
		);
	}

	if(0 < errorMessages.length){
		response.status(400).json(errorMessages)
		return
	}

	const userData = request.body.userData
	let accountID = ""
	console.log("email:", userData.email)

    try {
        const user = await db.query("SELECT * FROM accounts WHERE email = ?", [userData.email]);
		accountID = user[0].accountID
		console.log(accountID)
    } catch (error) {
        console.error(error);
    }

	try {
		const values = [advertData.category, advertData.title, advertData.price, advertData.description, advertData.img_src, timeNow, accountID];
		const newAdvert = await db.query("INSERT INTO adverts (category, title, price, description, img_src, createdAt, accountID) VALUES (?,?,?,?,?,?,?)", values);
		response.status(201).send("Advert created successfully").json();
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
