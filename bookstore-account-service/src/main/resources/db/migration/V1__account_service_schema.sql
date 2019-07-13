-- create user table
CREATE TABLE IF NOT EXISTS USER (
	user_id VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255),
	password VARCHAR(255) NOT NULL,
	user_name VARCHAR(255) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    cart_id varchar(255),
	CONSTRAINT CONSTRAINT_36 PRIMARY KEY (user_id)
);
CREATE UNIQUE INDEX USER_ID_INDEX ON USER (user_id);

-- create role table
CREATE TABLE IF NOT EXISTS ROLE (
	role_id VARCHAR(255) NOT NULL,
	role_description VARCHAR(255),
	role_name VARCHAR(255) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT CONSTRAINT_3 PRIMARY KEY (role_id)
);
CREATE UNIQUE INDEX ROLE_ID_INDEX ON ROLE (role_id);

-- create user-roles mapping table
CREATE TABLE IF NOT EXISTS USER_ROLES (
	user_id VARCHAR(255) NOT NULL,
	role_id VARCHAR(255) NOT NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT USER_FK FOREIGN KEY (user_id) REFERENCES USER (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT ROLE_FK FOREIGN KEY (role_id) REFERENCES ROLE (role_id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE INDEX USER_FK_INDEX ON USER_ROLES (user_id);
CREATE INDEX ROLE_FK_INDEX ON USER_ROLES (role_id);

-- create oauth_client_details table
create table IF NOT EXISTS oauth_client_details (
    client_id VARCHAR(255) PRIMARY KEY,
    resource_ids VARCHAR(255),
    client_secret VARCHAR(255),
    scope VARCHAR(255),
    authorized_grant_types VARCHAR(255),
    web_server_redirect_uri VARCHAR(255),
    authorities VARCHAR(255),
    access_token_validity INTEGER,
    refresh_token_validity INTEGER,
    additional_information VARCHAR(4096),
    autoapprove VARCHAR(255),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);