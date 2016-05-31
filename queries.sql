DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS posts_ext CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS comments_ext CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS threads_ext CASCADE;

CREATE TABLE IF NOT EXISTS users(
	uid SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE,
	password TEXT,
	ip TEXT,
	location text,
	date DATE
);

CREATE TABLE IF NOT EXISTS posts(
	pid SERIAL PRIMARY KEY,
	username VARCHAR(30) REFERENCES users(username),
	ip TEXT,
	content text,
	location text,
	datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts_ext(
	pid INT REFERENCES posts(pid),
	likes INT,
	optionOne VARCHAR(20),
	optionTwo VARCHAR(20),
	optionOneNum INT,
	optionTwoNum INT,
	users_voted VARCHAR[]
);

CREATE TABLE IF NOT EXISTS comments(
	cid SERIAL PRIMARY KEY,
	pid INT REFERENCES posts(pid),
	username VARCHAR(30),
	comment text,
	voteUp INT,
	voteDown INT,
	voters VARCHAR[],
	datetime TIMESTAMP
);

-- FOR NESTED COMMENTS
CREATE TABLE IF NOT EXISTS comments_ext(
	cid INT REFERENCES comments(cid),
	username VARCHAR(30),
	response text,
	datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threads(
	tid SERIAL PRIMARY KEY,
	username1 VARCHAR(30),
	username2 VARCHAR(30),
	ip1 TEXT,
	ip2 TEXT,
	starter VARCHAR(30),
	datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threads_ext(
	tid INT REFERENCES threads(tid),
	username VARCHAR(30),
	ip TEXT,
	content text,
	datetime TIMESTAMP
);

-- THREAD STUFF --------------------------------------------------

-- CREATE A NEW THREAD
INSERT INTO threads(username1, username2, starter, datetime)
VALUES(username1, username2, usernameOfPersonWhoStarted, NOW());

-- WHILE CHATTING WITH EACH OTHER
SELECT alias
FROM users
WHERE username = username OR userid = id;

-- SENDING NEW MESSAGE
INSERT INTO threads_ext(tid, username, ip, content, datetime)
VALUES(idOfThread, username, usersIP, content, NOW());


-- USER STUFF ----------------------------------------------------

-- ADD USER
INSERT INTO users(username, password, ip, location, date);
VALUES(username, password, ip, location, current_date);

-- DELETE USER
DELETE FROM users where id = userid;

-- POST STUFF -----------------------------------------------------

-- ADD POST
INSERT INTO posts(username, ip, content, location, datetime)
VALUES(username, ip, content, location, NOW());

INSERT INTO posts_ext(id, optionOne, optionTwo)
VALUES(pid, optionOne, optionTwo);

-- VOTE ON POST OPTIONONE
UPDATE posts_ext
SET likes = likes + 1
WHERE posts_ext.pid = post.pid;

UPDATE posts_ext
SET optionOneNum = optionOne + 1
WHERE posts_ext.pid = post.pid;

UPDATE posts_ext
SET voters = array_append(voters, username);

-- VOTE ON POST OPTIONTWO
UPDATE posts_ext
SET likes = likes + 1
WHERE posts_ext.pid = post.pid;

UPDATE posts_ext
SET optionTwoNum = optionTwo + 1
WHERE posts_ext.pid = post.pid;

UPDATE posts_ext
SET voters = array_append(voters, username);

-- DELETE POST
DELETE FROM posts
WHERE pid = pid; -- CHECK IF USER IS ORIGINAL POSTER

-- COMMENT STUFF ----------------------------------------------------

-- ADD COMMENT TO POST
INSERT INTO comments(pid, username, comment, datetime)
VALUES(pid, username, comment, NOW());

-- EDIT COMMENT
UPDATE comments
SET comment = comment
WHERE cid = cid; -- CHECK IF ORIGINAL COMMENTER

-- DELETE COMMENT
DELETE FROM comments
WHERE cid = cid; -- CHECK IF ORIGINAL COMMENTER

-- VOTEUP ON COMMENT
UPDATE comments
SET voteUp = voteUp + 1
WHERE cid = cid;

UPDATE comments
SET voters = array_append(voters, username);

-- VOTEDOWN ON COMMENT
UPDATE comments
SET voteDown = voteDown + 1
WHERE cid = cid;

UPDATE comments
SET voters = array_append(voters, username);

-- BASIC COMMANDS
SELECT * FROM posts;

SELECT * FROM comments
WHERE postid = somePostID;

SELECT * FROM comments_ext
WHERE cid = cid; -- TO GET NESTED COMMENTS