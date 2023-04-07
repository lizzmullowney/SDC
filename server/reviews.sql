/* Do I need to create a database? Don't forget to put semicolons in CLI!!  */
/* Do I need to use SERIAL*/



CREATE TABLE reviews (
  review_id INT PRIMARY KEY,
  product_id INT  NOT NULL,
  rating INT  NOT NULL,
  epoch_time BIGINT NOT NULL,
  summary VARCHAR ( 255 ),
  body VARCHAR ( 1000) ,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR ( 255 ),
  reviewer_email VARCHAR ( 255 ),
  response VARCHAR ( 1000 ) DEFAULT NULL,
  helpfulness INT
);

CREATE TABLE review_photos (
  photo_id INT PRIMARY KEY,
  review_id INT,
  CONSTRAINT fk_review_id
  FOREIGN KEY (review_id)
    REFERENCES reviews (review_id),
  photo_url VARCHAR (255)
);

CREATE TABLE characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  characteristic_name VARCHAR ( 255 )
);

CREATE TABLE characteristics_rating (
  characteristics_rating_id serial PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  CONSTRAINT fk_characteristic_id
  FOREIGN KEY (characteristic_id)
    REFERENCES characteristics (characteristic_id),
  CONSTRAINT fk_review_id
  FOREIGN KEY (review_id)
    REFERENCES reviews (review_id),
  rating_value INT
);
