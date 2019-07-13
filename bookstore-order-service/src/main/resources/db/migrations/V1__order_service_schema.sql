create table billingAddress (
       billindAddressId varchar(255) not null,
        address varchar(255),
        city varchar(255),
        country varchar(255),
        state varchar(255),
        zipcode varchar(255),
        primary key (billindAddressId)
    ) engine=InnoDB

create table cart (
       cartId varchar(255) not null,
        totalPrice double precision not null,
        customerId varchar(255),
        primary key (cartId)
    ) engine=InnoDB


create table cartitem (
       cartItemId varchar(255) not null,
        price double precision not null,
        productId varchar(255),
        quantity integer not null,
        cartId varchar(255),
        primary key (cartItemId)
    ) engine=InnoDB


create table customer (
       customerId varchar(255) not null,
        customerPhone varchar(255),
        firstName varchar(255),
        lastName varchar(255),
        billingAddressId varchar(255),
        cartId varchar(255),
        shippingAddressId varchar(255),
        primary key (customerId)
    ) engine=InnoDB


create table customerorder (
       customerOrderId varchar(255) not null,
        billingAddressId varchar(255),
        cartId varchar(255),
        customerId varchar(255),
        shippingAddressId varchar(255),
        primary key (customerOrderId)
    ) engine=InnoDB


create table shippingAddress (
       shippingAddressId varchar(255) not null,
        address varchar(255),
        city varchar(255),
        country varchar(255),
        state varchar(255),
        zipcode varchar(255),
        primary key (shippingAddressId)
    ) engine=InnoDB


alter table cart
       add constraint FK61b13xd3epu1lxhphpgoa58wn
       foreign key (customerId)
       references customer (customerId)

alter table cartitem
       add constraint FKqwjiex7c2l8l6r5iduyqb2e01
       foreign key (cartId)
       references cart (cartId)

alter table customer
       add constraint FK95dxtkeffc5gtse7wsiy7xiw5
       foreign key (billingAddressId)
       references billingAddress (billindAddressId)

alter table customer
       add constraint FKfrlxfkkf7ibdofqnhvknvkipy
       foreign key (cartId)
       references cart (cartId)

alter table customer
       add constraint FKt4k4gqltmjrikayrnjtqk6skc
       foreign key (shippingAddressId)
       references shippingAddress (shippingAddressId)

alter table customerorder
       add constraint FKgqhecxrq48r18495w3lok1eah
       foreign key (billingAddressId)
       references billingAddress (billindAddressId)

alter table customerorder
       add constraint FKi6vc89oq71e52vjvuv77y48bc
       foreign key (cartId)
       references cart (cartId)

alter table customerorder
       add constraint FKok8nlguayly9hhkdb7ku0bcvp
       foreign key (customerId)
       references customer (customerId)

alter table customerorder
       add constraint FK6lasckps6e341rusf4g3yhg9s
       foreign key (shippingAddressId)
       references shippingAddress (shippingAddressId)
