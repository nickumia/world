CREATE TABLE IF NOT EXISTS  users (
	id							int						PRIMARY KEY,
	username				varchar(255)	UNIQUE,
	email						varchar(255)	UNIQUE,
	password_hash		varchar(255)	UNIQUE,
	last_seen				timestamp with time zone
);

insert into users values (100, 'asdf', 'nick@not.com', 'pbkdf2:sha256:260000$1CRXFZ2QdJM8hymf$dc06edbad9c7c009584499ee23268549402ea5b01088e98fd51e7e91999772b4');
