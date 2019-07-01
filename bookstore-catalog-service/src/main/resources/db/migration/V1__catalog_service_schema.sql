create table PRODUCT (
    product_id varchar(255) not null,
    available_item_count integer not null,
    product_description varchar(255),
    price double not null,
    product_name varchar(255) not null,
    product_category_id varchar(255),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    primary key (product_id)
);

create table PRODUCT_CATEGORY (
    product_category_id varchar(255) not null,
    description varchar(255),
    product_category_name varchar(255) not null,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    primary key (product_category_id)
);

alter table PRODUCT
    add constraint FKProductToProductCategory
    foreign key (product_category_id)
    references PRODUCT_CATEGORY(product_category_id);