-- Adding no of rating column into product.
alter table PRODUCT
    add column no_of_ratings int default null;

-- Function that returns the no of ratings of a product.
DELIMITER $$
CREATE FUNCTION noOfRatingByProductId(product_id varchar(255))
RETURNS INT READS SQL DATA DETERMINISTIC
BEGIN
    DECLARE total INT DEFAULT NULL;

    SELECT count(rating_value)
    INTO total
    FROM PRODUCT p
    INNER JOIN REVIEW r
    ON p.product_id = r.product_id
    WHERE p.product_id = product_id;

    RETURN total;
END
$$

-- Procedure that updates the no of rating of a product.
DELIMITER $$
CREATE PROCEDURE updateNoOfRatingByProductId(productID varchar(255))
BEGIN
    UPDATE PRODUCT p
        SET p.no_of_ratings = noOfRatingByProductId(productID)
    WHERE p.product_id = productID	;
END $$
DELIMITER ;

-- Procedure that update the no of rating of all products
DELIMITER $$
CREATE PROCEDURE updateAllNoOfRating()
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE productID varchar(255) DEFAULT NULL;

	-- declare cursor
	DEClARE curProduct
		CURSOR FOR
			SELECT product_id FROM PRODUCT;

	-- declare NOT FOUND handler
	DECLARE CONTINUE HANDLER
        FOR NOT FOUND SET finished = 1;

	OPEN curProduct;

	readLoop: LOOP
		FETCH curProduct INTO productID;
		IF finished = 1 THEN
			LEAVE readLoop;
		END IF;
		CALL updateNoOfRatingByProductId(productID);
	END LOOP;

	CLOSE curProduct;

END
$$

-- Call procedure for sets the no of rating of all products
DELIMITER $$
CALL updateAllNoOfRating()
$$

-- Trigger that updates the no of rating after insert a new review.
DELIMITER $$
CREATE TRIGGER updateNoOfRatingAfterInsertReviewTrigger
    AFTER INSERT ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateNoOfRatingByProductId(NEW.product_id);
END
$$

-- Trigger that updates the no of rating after update a review.
DELIMITER $$
CREATE TRIGGER updateNoOfRatingAfterUpdateReviewTrigger
    AFTER UPDATE ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateNoOfRatingByProductId(NEW.product_id);

	-- In case product_id changes then update old
	IF OLD.product_id <> NEW.product_id THEN
	    CALL updateNoOfRatingByProductId(OLD.product_id);
	END IF;

END
$$

-- Trigger that updates the no of rating after delete a review.
DELIMITER $$
CREATE TRIGGER updateNoOfRatingAfterDeleteReviewTrigger
    AFTER DELETE ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateNoOfRatingByProductId(OLD.product_id);

END
$$
DELIMITER ;
