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
	optionOneNum INT,
	optionTwoNum INT,
	users_who_voted VARCHAR[]
);	

CREATE TABLE IF NOT EXISTS comments(
	cid SERIAL PRIMARY KEY,
	username VARCHAR(30),
	post_id INT REFERENCES posts(id), 
	comment text,
	voteUp INT,
	voteDown INT,
	voters VARCHAR[],
	datetime TIMESTAMP
);	

#FOR NESTED COMMENTS
CREATE TABLE IF NOT EXISTS comments_ext(
	username VARCHAR(30),
	response text,
	cid INT REFERENCES comments(cid), 
	datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threads(
	id SERIAL PRIMARY KEY,
	username1 VARCHAR(30),
	username2 VARCHAR(30),
	datetime TIMESTAMP,
	ip1 VARCHAR(100),
	ip2 VARCHAR(100),
	whoStarted VARCHAR(30)
);	

CREATE TABLE IF NOT EXISTS threads_ext(
	id INT REFERENCES threads(id),
	username VARCHAR(30),
	ip VARCHAR(100),
	content text,
	datetime TIMESTAMP
);

#THREAD STUFF --------------------------------------------------

#CREATE A NEW THREAD
INSERT INTO threads(username1, username2, datetime, whoStarted) VALUES(username1, username2, NOW(), usernameOfPersonWhoStarted);

#WHILE CHATTING WITH EACH OTHER
SELECT alias from users where username = username OR userid = id;

#SENDING NEW MESSAGE
INSERT INTO threads_ext(id, username, ip, content, datetime) VALUES(idOfThread, username, usersIP, content, NOW());


#USER STUFF ----------------------------------------------------

#ADD USER
INSERT INTO users(username, password, date, location, ip) VALUES(username, password, current_date, location, ip);

#DELETE USER
DELETE FROM users where id = userid;

#POST STUFF -----------------------------------------------------

#ADD POST
INSERT INTO posts(content, username, datetime, location, ip) VALUES(content, username, NOW(), location, ip);
INSERT INTO posts_ext(id, optionOne, optionTwo) VALUES(post_id, optionOne, optionTwo);

#VOTE ON POST OPTIONONE
UPDATE posts_ext SET no_of_likes = no_of_likes + 1 WHERE posts_ext.id = post.id;
UPDATE posts_ext SET optionOneNum = optionOne + 1 WHERE posts_ext.id = post.id;
UPDATE posts_ext SET users_who_voted = array_append(users_who_voted, username);

#VOTE ON POST OPTIONTWO
UPDATE posts_ext SET no_of_likes = no_of_likes + 1 WHERE posts_ext.id = post.id;
UPDATE posts_ext SET optionTwoNum = optionTwo + 1 WHERE posts_ext.id = post.id;
UPDATE posts_ext SET users_who_voted = array_append(users_who_voted, username);

#DELETE POST
DELETE FROM posts where id = id; #CHECK IF USER IS ORIGINAL POSTER

#COMMENT STUFF ----------------------------------------------------

#ADD COMMENT TO POST
INSERT INTO comments(username, post_id, comment, datetime) VALUES(username, post_id, comment, NOW());

#EDIT COMMENT
UPDATE comments SET comment = comment WHERE cid = cid; #CHECK IF ORIGINAL COMMENTER

#DELETE COMMENT
DELETE FROM comments WHERE cid = cid; #CHECK IF ORIGINAL COMMENTER

#VOTEUP ON COMMENT
UPDATE comments SET voteUp = voteUp + 1 WHERE cid = cid;
UPDATE comments SET voters = array_append(voters, username);

#VOTEDOWN ON COMMENT
UPDATE comments SET voteDown = voteDown + 1 WHERE cid = cid;
UPDATE comments SET voters = array_append(voters, username);

#BASIC COMMANDS
SELECT * FROM posts;
SELECT * FROM comments WHERE postid = somePostID;
SELECT * FROM comments_ext WHERE cid = cid; #TO GET NESTED COMMENTS











