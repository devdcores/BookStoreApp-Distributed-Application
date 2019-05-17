

-- USER
-- non-encrypted password: jwtpass
INSERT INTO user (user_id, first_name, last_name, password, user_name, email) VALUES (1, 'John', 'Doe', '$2a$10$qtH0F1m488673KwgAfFXEOWxsoZSeHqqlB/8BTt3a6gsI5c2mdlfe', 'john.doe', 'john.doe@gmail.com');
INSERT INTO user (user_id, first_name, last_name, password, user_name, email) VALUES (2, 'Admin', 'Admin', '$2a$10$qtH0F1m488673KwgAfFXEOWxsoZSeHqqlB/8BTt3a6gsI5c2mdlfe', 'admin.admin', 'admin@gmail.com');

INSERT INTO role (role_id, role_name, role_description) VALUES (1, 'STANDARD_USER', 'Standard User - Has no admin rights');
INSERT INTO role (role_id, role_name, role_description) VALUES (2, 'ADMIN_USER', 'Admin User - Has permission to perform admin tasks');

INSERT INTO user_roles(user_id, role_id) VALUES(1,1);
INSERT INTO user_roles(user_id, role_id) VALUES(2,1);
INSERT INTO user_roles(user_id, role_id) VALUES(2,2);

-- -- Populate random city table
--
-- INSERT INTO random_city(id, name) VALUES (1, 'Bamako');
-- INSERT INTO random_city(id, name) VALUES (2, 'Nonkon');
-- INSERT INTO random_city(id, name) VALUES (3, 'Houston');
-- INSERT INTO random_city(id, name) VALUES (4, 'Toronto');
-- INSERT INTO random_city(id, name) VALUES (5, 'New York City');
-- INSERT INTO random_city(id, name) VALUES (6, 'Mopti');
-- INSERT INTO random_city(id, name) VALUES (7, 'Koulikoro');
-- INSERT INTO random_city(id, name) VALUES (8, 'Moscow');