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

CREATE TABLE faqs (
	id INT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(200),
	answer VARCHAR(200)
);

INSERT INTO faqs (question, answer) VALUES ('I can not find my ad, where is it?', 'Your ad is under review. To prevent incorrect ads from ending up on the page, all ads go through a review check, which means that it may take a little longer before your ad is pushblished.');
INSERT INTO faqs (question, answer) VALUES ('How do I remove my ad?', 'You can remove your published ad by signing in to your account and view your listings.');
INSERT INTO faqs (question, answer) VALUES ('Why do I have to leave my contact details when signing up to sell an item?', 'In order to sell an item you have to leave your contact details so that a potential seller can contact you.');

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 16\" M1 2021',2227, 'Cool laptop','/MacBook_Pro_13-inch_M1_2020.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 16\" M1 2021','18768', 'Cool laptop','/MacBook_Pro_13-inch_M1_2020.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 13\" M1 2020','4563', 'Cool laptop','/macbook2016.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 13\" M2 2022','2345', 'Cool laptop','/macbook2016.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 16\" M1 2021',2227, 'Cool laptop','/MacBook_Pro_13-inch_M1_2020.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 16\" M1 2021','18768', 'Cool laptop','/MacBook_Pro_13-inch_M1_2020.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 13\" M1 2020','4563', 'Cool laptop','/macbook2016.png', CURRENT_TIMESTAMP);

INSERT INTO adverts (category, title, price, description, img_src, createdAt)
VALUES('MacBook', 'MacBook Pro 13\" M2 2022','2345', 'Cool laptop','/macbook2016.png', CURRENT_TIMESTAMP);

