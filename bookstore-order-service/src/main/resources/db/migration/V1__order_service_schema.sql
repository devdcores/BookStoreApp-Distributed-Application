CREATE TABLE IF NOT EXISTS BILLINGADDRESS (
       billindAddressId varchar(255) not null,
        address varchar(255),
        city varchar(255),
        country varchar(255),
        state varchar(255),
        zipcode varchar(255),
        primary key (billindAddressId)
    );

CREATE TABLE IF NOT EXISTS CART (
       cartId varchar(255) not null,
        totalPrice double not null,
        userName varchar(255) not null,
        primary key (cartId)
    );


CREATE TABLE IF NOT EXISTS CARTITEM (
       cartItemId varchar(255) not null,
        price double not null,
        productId varchar(255),
        quantity integer not null,
        cartId varchar(255),
        primary key (cartItemId)
    );