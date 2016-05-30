CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY, 
	username VARCHAR(30) UNIQUE, 
	password VARCHAR(15), 
	date DATE, 
	location text, 
	ip VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS posts(
	id SERIAL PRIMARY KEY, 
	content text, 
	username VARCHAR(30) REFERENCES users(username), 
	datetime TIMESTAMP,
	location text, 
	ip VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS posts_ext(
	id INT REFERENCES posts(id), 
	no_of_likes INT, 
	optionOne VARCHAR(20), 
	optionTwo VARCHAR(20), 
	users_who_voted INT[]
);	