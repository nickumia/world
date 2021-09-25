CREATE TABLE IF NOT EXISTS  users (
	id							int						PRIMARY KEY,
	username				varchar(255)	UNIQUE,
	email						varchar(255)	UNIQUE,
	password_hash		varchar(255)	UNIQUE
);
