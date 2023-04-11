//require database file
const db = require('./db.js');

async function getReviewsById(params) {
  //parameters could include .page .count .sort
  // create sortedBY query
  //if params.sort
  const ReviewQuery =
     `SELECT
      review_id, rating, summary, recommend, response, body, review_date, reviewer_name, helpfulness
      FROM reviews
      WHERE reported = false
      AND product_id = ${params.product_id}`
      ;

  try {

    const reviewsResult = await db.query(ReviewQuery);

    for (var i = 0; i < reviewsResult.rows.length; i++) {

      const unixTime = Number(reviewsResult.rows[i].review_date);
      const dateObj = new Date(unixTime);
      const isoTimestamp = dateObj.toISOString();
      reviewsResult.rows[i].review_date = isoTimestamp;
    }
    const reviews = [];
    for (const review of reviewsResult.rows) {
      const photosQuery = 'SELECT * FROM review_photos WHERE review_id = $1'
      const photosResult = await db.query(photosQuery, [review.review_id]);
      const photos = photosResult.rows.map((photo) => ({
        photo_id: photo.photo_id,
        photo_url: photo.photo_url,
      }));

      const reviewWithPhotos = {
        ...review,
        photos: photos || [],
      }

      reviews.push(reviewWithPhotos);
    }
    console.log(reviews);
    //if params.page
     //slicing or result array
    return reviews;
    db.end();
  } catch (err) {
    console.log('IN CATCH BLOCK', err);
    return err.stack;
    db.end();
  }
}


async function markReviewHelpful(params) {
  const id = params.review_id;
  const query = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${id}`
  // const value = [id];
  try {
    await db.query(query).then((res) => console.log(res));
  } catch (err) {
    console.log('IN CATCH BLOCK, heres the err', err);
    db.end();
  }
}

async function reportReview(params) {
  const id = params.review_id;
  const query = `UPDATE reviews SET reported = false WHERE review_id = ${id}`
  console.log('THIS REVIEW SUCKS, AM REPORTING')
  try {
    await db.query(query).then((res) => console.log(res));
  } catch (err) {
    console.log('IN CATCH BLOCK, heres the err', err);
    db.end();
  }
}

async function getReviewsMeta(params) {
  const id = params.product_id;
  const resultObject ={};
  resultObject['product_id'] = id;
  resultObject.ratings = {};

  const ratingsQuery = `SELECT rating, COUNT(*) as count FROM reviews WHERE product_id =${id} GROUP BY RATING`
  const recommendQuery = `SELECT COUNT(CASE WHEN recommend = TRUE THEN 1 END) as yes, COUNT(CASE WHEN recommend = FALSE THEN 1 END) as no FROM reviews WHERE product_id = ${id}`;

  const charQuery = `
  SELECT c.characteristic_id, c.characteristic_name, AVG(cr.rating_value) AS avg_rating
  FROM characteristics c
  INNER JOIN characteristics_rating cr
    ON c.characteristic_id = cr.characteristic_id
  WHERE c.product_id = ${id}
  GROUP BY c.characteristic_id, c.characteristic_name
`;

  try {
    const ratingsData = await db.query(ratingsQuery);
    const ratingsDataArray = ratingsData.rows;
    const recData = await db.query(recommendQuery);
    const charData = await db.query(charQuery);
    const charObjects = charData.rows;
    for (var key in recData.rows[0]) {
      recData.rows[0][key] = Number(recData.rows[0][key]);
    }
    resultObject.recommended = recData.rows[0];
    for (var i = 0; i < ratingsDataArray.length; i++ ) {

     resultObject.ratings[ratingsDataArray[i].rating] = Number(ratingsDataArray[i].count);
    }
    const characteristics = {};
      charObjects.forEach(obj => {
        characteristics[obj.characteristic_name] = {
          id: obj.characteristic_id,
          value: obj.avg_rating.toString().slice(0, 6)
        }
      });
      resultObject.characteristics = characteristics;
    console.log(resultObject);
    return resultObject;
    db.end();
  } catch (err) {
    console.log('IN CATCH BLOCK, heres the err', err);
    db.end();
  }
}

module.exports = {
  getReviewsById,
  markReviewHelpful,
  reportReview,
  getReviewsMeta,
}