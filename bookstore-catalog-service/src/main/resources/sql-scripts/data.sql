
-- Insert into product category table.
insert into product_category (product_category_id, created_at, updated_at, description, product_category_name) values ('402880e46b2erce9016b2d7d07c60000', now(), now(), 'Fiction Books Category', 'Fiction');

insert into product_category (product_category_id, created_at, updated_at, description, product_category_name) values ('402880e46b2erce9016b2d7d07c60001', now(), now(), 'Horror Books Category', 'Horror');

insert into product_category (product_category_id, created_at, updated_at, description, product_category_name) values ('402880e46b2erce9016b2d7d07c60002', now(), now(), 'Technology Books Category', 'Technology');


--Insert into products table
insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350001', now(), now(), 345, 'Five Point Someone Book', 100, 'Five Point Someone', '402880e46b2erce9016b2d7d07c60000');

insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350002', now(), now(), 987, 'The White Tiger Book', 499, 'The White Tiger', '402880e46b2erce9016b2d7d07c60000');

insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350003', now(), now(), 872, 'Spring Framework Book', 399, 'Spring Framework', '402880e46b2erce9016b2d7d07c60002');

insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350004', now(), now(), 678, 'Hibernate Basics Book', 299, 'Hibernate', '402880e46b2erce9016b2d7d07c60002');

insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350005', now(), now(), 3545, 'Nun Book', 500, 'The Nun', '402880e46b2erce9016b2d7d07c60001');

insert into product (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('402880e46b2d7ce9016b2d7d28350006', now(), now(), 454, 'Conjuring Book', 999, 'Conjuring', '402880e46b2erce9016b2d7d07c60001');