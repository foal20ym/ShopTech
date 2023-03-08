CREATE TABLE humans (
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50)
);

INSERT INTO humans (name) VALUES ('Alice');
INSERT INTO humans (name) VALUES ('Fatima');
INSERT INTO humans (name) VALUES ('Conrad');


CREATE TABLE faqs (
	id INT PRIMARY KEY AUTO_INCREMENT,
	question VARCHAR(200),
	answer VARCHAR(200)
);

INSERT INTO faqs (question, answer) VALUES ('I can not find my ad, where is it?', 'Your ad is under review. To prevent incorrect ads from ending up on the page, all ads go through a review check, which means that it may take a little longer before your ad is pushblished.');
INSERT INTO faqs (question, answer) VALUES ('How do I remove my ad?', 'You can remove your published ad by signing in to your account and view your listings.');
INSERT INTO faqs (question, answer) VALUES ('Why do I have to leave my contact details when signing up to sell an item?', 'In order to sell an item you have to leave your contact details so that a potential seller can contact you.');