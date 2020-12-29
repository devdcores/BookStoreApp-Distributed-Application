create table PRODUCT (
    product_id varchar(255) not null,
    available_item_count integer not null,
    product_description varchar(255),
    price double not null,
    product_name varchar(255) not null,
    product_category_id varchar(255),
    product_image_id varchar(255),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (product_id)
);

create table PRODUCT_CATEGORY (
    product_category_id varchar(255) not null,
    description varchar(255),
    product_category_name varchar(255) not null,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (product_category_id)
);

alter table PRODUCT
    add constraint FKProductToProductCategory
    foreign key (product_category_id)
    references PRODUCT_CATEGORY(product_category_id);

create table REVIEW (
    review_id varchar(255) not null,
    user_id varchar(255),
    rating_value double not null,
    review_message varchar(1000),
    product_id varchar(255) not null,
    user_name varchar(255),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (review_id)
);