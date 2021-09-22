-- Adding average rating column into product.
alter table PRODUCT
    add column average_rating decimal(2,1) default null;

-- Function that returns the average rating of a product.
DELIMITER $$
CREATE FUNCTION averageRating(product_id varchar(255))
RETURNS DECIMAL(2,1) READS SQL DATA DETERMINISTIC
BEGIN
    DECLARE average DECIMAL(2,1) DEFAULT NULL;

    SELECT avg (rating_value)
    INTO average
    FROM PRODUCT p
    INNER JOIN REVIEW r
    ON p.product_id = r.product_id
    WHERE p.product_id = product_id;

    RETURN average;
END
$$

-- Procedure that updates the average rating of a product.
DELIMITER $$
CREATE PROCEDURE updateAverageRatingByProductId(productID varchar(255))
BEGIN
    UPDATE PRODUCT p
        SET p.average_rating = averageRating(productID)
    WHERE p.product_id = productID	;
END $$
DELIMITER ;

-- Procedure that update the average rating of all products
DELIMITER $$
CREATE PROCEDURE updateAllAverageRating()
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
		CALL updateAverageRatingByProductId(productID);
	END LOOP;

	CLOSE curProduct;

END
$$

-- Call procedure for sets the average rating of all products
DELIMITER $$
CALL updateAllAverageRating()
$$

-- Trigger that updates the average rating after insert a new review.
DELIMITER $$
CREATE TRIGGER updateAverageRatingAfterInsertReviewTrigger
    AFTER INSERT ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateAverageRatingByProductId(NEW.product_id);
END
$$

-- Trigger that updates the average rating after update a review.
DELIMITER $$
CREATE TRIGGER updateAverageRatingAfterUpdateReviewTrigger
    AFTER UPDATE ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateAverageRatingByProductId(NEW.product_id);

	-- In case product_id changes then update old
	IF OLD.product_id <> NEW.product_id THEN
	    CALL updateAverageRatingByProductId(OLD.product_id);
	END IF;

END
$$

-- Trigger that updates the average rating after delete a review.
DELIMITER $$
CREATE TRIGGER updateAverageRatingAfterDeleteReviewTrigger
    AFTER DELETE ON REVIEW
    FOR EACH ROW

BEGIN
    CALL updateAverageRatingByProductId(OLD.product_id);

END
$$
DELIMITER ;
