-- ClothingStore Initial Data: Insert clothing products and categories
-- Clear existing data
DELETE FROM REVIEW;
DELETE FROM PRODUCT;
DELETE FROM PRODUCT_CATEGORY;

-- Insert clothing categories
insert into PRODUCT_CATEGORY (product_category_id, created_at, updated_at, description, product_category_name) values
 ('1', now(), now(), 'Comfortable and stylish t-shirts for everyday wear', 'T-Shirts'),
 ('2', now(), now(), 'Premium denim jeans in various styles and fits', 'Jeans'),
 ('3', now(), now(), 'Beautiful dresses for all occasions', 'Dresses'),
 ('4', now(), now(), 'Jackets and outerwear for style and warmth', 'Jackets'),
 ('5', now(), now(), 'Footwear collection for comfort and fashion', 'Shoes'),
 ('6', now(), now(), 'Active wear and fitness clothing', 'Activewear'),
 ('7', now(), now(), 'Formal shirts and business attire', 'Formal'),
 ('8', now(), now(), 'Fashion accessories and extras', 'Accessories');

-- Insert clothing products (Based on your exact JSON data)
insert into PRODUCT (product_id, created_at, updated_at, available_item_count, product_description, price, product_name, product_category_id, product_image_id) values
-- T-Shirts (Category 1)
('1', now(), now(), 50, 'Classic white cotton t-shirt, comfortable fit for everyday wear', 25.99, 'Classic White T-Shirt - Nike', '1', 'nike-white-tshirt.jpg'),
('2', now(), now(), 35, 'Vintage band t-shirt with retro graphics and soft fabric', 19.99, 'Vintage Band Tee - H&M', '1', 'vintage-band-tee.jpg'),
('3', now(), now(), 42, 'Premium cotton t-shirt with modern slim fit design', 29.99, 'Premium Cotton Tee - Uniqlo', '1', 'premium-cotton-tee.jpg'),

-- Jeans (Category 2)
('4', now(), now(), 30, 'Classic slim fit jeans in premium denim with modern styling', 79.99, 'Slim Fit Jeans - Levis 511', '2', 'levis-slim-jeans.jpg'),
('5', now(), now(), 25, 'High-waisted skinny jeans perfect for casual and semi-formal wear', 65.99, 'High-Waisted Skinny Jeans - Zara', '2', 'zara-skinny-jeans.jpg'),
('6', now(), now(), 28, 'Distressed boyfriend jeans with relaxed fit and vintage look', 89.99, 'Distressed Boyfriend Jeans - Diesel', '2', 'diesel-boyfriend-jeans.jpg'),

-- Dresses (Category 3)
('7', now(), now(), 20, 'Beautiful floral summer dress in lightweight fabric', 89.99, 'Summer Floral Dress - Zara', '3', 'zara-floral-dress.jpg'),
('8', now(), now(), 15, 'Elegant little black dress perfect for evening occasions', 49.99, 'Little Black Dress - H&M', '3', 'hm-black-dress.jpg');

-- Insert sample reviews for clothing items (matching your JSON ratings)
insert into REVIEW (review_id, rating_value, user_id, review_message, product_id, user_name, CREATED_AT, UPDATED_AT) values
(1, 5, 1, 'Amazing quality t-shirt! The fabric is so soft and comfortable. Perfect for everyday wear and the fit is exactly as expected.', '1', 'fashionlover', now(), now()),
(2, 4, 2, 'Great jeans! The slim fit is perfect and the quality is outstanding. Definitely worth the investment for a premium denim piece.', '4', 'denimfan', now(), now()),
(3, 5, 3, 'Beautiful dress! The floral pattern is gorgeous and the fabric feels luxurious. Perfect for summer occasions.', '7', 'summerstyle', now(), now());