CREATE TABLE IF NOT EXISTS  posts (
	id							int						PRIMARY KEY,
	title						varchar(255),
	subtitle				varchar(255),
	body						TEXT,
	user_id					varchar(255),
	posted_time			timestamp with time zone
);
