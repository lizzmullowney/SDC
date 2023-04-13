
COPY reviews(review_id, product_id, rating, review_date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/lizzmullowney/SDC/server/reviewsCSV/reviews.csv' DELIMITER ',' CSV HEADER;


COPY review_photos(photo_id, review_id, photo_url) FROM '/Users/lizzmullowney/SDC/server/reviewsCSV/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics(characteristic_id, product_id, characteristic_name) FROM '/Users/lizzmullowney/SDC/server/reviewsCSV/characteristics.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_rating(characteristics_rating_id, characteristic_id, review_id, rating_value) FROM '/Users/lizzmullowney/SDC/server/reviewsCSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;