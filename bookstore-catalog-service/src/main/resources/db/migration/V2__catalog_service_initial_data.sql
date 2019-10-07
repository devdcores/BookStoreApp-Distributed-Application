
-- add data into PRODUCT category table.
insert into PRODUCT_CATEGORY (product_category_id, created_at, updated_at, description, product_category_name) values ('c6eec3f6-35f0-4a11-8dae-a859aa2b53d4', now(), now(), 'Fiction Books Category', 'Fiction');

insert into PRODUCT_CATEGORY (product_category_id, created_at, updated_at, description, product_category_name) values ('3925c6a6-351c-4067-b021-ced0e80988e4', now(), now(), 'Horror Books Category', 'Horror');

insert into PRODUCT_CATEGORY (product_category_id, created_at, updated_at, description, product_category_name) values ('8f825617-9522-4195-bfea-c396d9b966a0', now(), now(), 'Technology Books Category', 'Technology');

-- add data into products table
insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('db1b4a0e-b8a9-4d98-90cf-45c6ca246601', now(), now(), 345, 'Five Point Someone Book', 100, 'Five Point Someone', 'c6eec3f6-35f0-4a11-8dae-a859aa2b53d4');

insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('222fa837-e425-40ed-84ce-8f5f0ce83855', now(), now(), 987, 'The White Tiger Book', 499, 'The White Tiger', 'c6eec3f6-35f0-4a11-8dae-a859aa2b53d4');

insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('358638cf-42aa-4fc9-8e05-bd77569ffe72', now(), now(), 872, 'Spring Framework Book', 399, 'Spring Framework', '8f825617-9522-4195-bfea-c396d9b966a0');

insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('b7a6182f-c0bf-43de-9d19-0efaa08e102a', now(), now(), 678, 'Hibernate Basics Book', 299, 'Hibernate', '8f825617-9522-4195-bfea-c396d9b966a0');

insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('8fabb3a1-27c2-4ee3-a3a4-be43af946a76', now(), now(), 3545, 'Nun Book', 500, 'The Nun', '3925c6a6-351c-4067-b021-ced0e80988e4');

insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id) values ('0b75f97f-b4ff-4a95-afa0-1e64b2035497', now(), now(), 454, 'Conjuring Book', 999, 'Conjuring', '3925c6a6-351c-4067-b021-ced0e80988e4');