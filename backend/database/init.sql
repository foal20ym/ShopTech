CREATE TABLE accounts (
	accountID INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50),
	password VARCHAR(255),
	address VARCHAR(50),
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	phoneNumber VARCHAR(50),
	createdAt VARCHAR(50)
);

CREATE TABLE adverts (
	advertID INT PRIMARY KEY AUTO_INCREMENT,
	category VARCHAR(50),
	title VARCHAR(50),
	price INT,
	description VARCHAR(50),
	img_src VARCHAR(50),
	createdAt VARCHAR(50),
	accountID INT,
	FOREIGN KEY (accountID) REFERENCES accounts(accountID)
);

CREATE TABLE comments (
	commentID INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(50),
	createdAt VARCHAR(50),
	accountID INT,
	advertID INT,
	FOREIGN KEY (accountID) REFERENCES accounts(accountID),
	FOREIGN KEY (advertID) REFERENCES adverts(advertID)
);