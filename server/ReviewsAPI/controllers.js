//require db file that connects us to postgres db
const pool = require('./db.js');
//require queries file that queries from db
const Queries = require('./queries.js');

const getReviews = (req, res) => {
  const params = req.query;
  console.log('in controllers.getReviews, these are the parameters', params);
  Queries.getReviewsById(params).then((data) => res.send(data));
}

const getReviewsMeta = (req, res) => {
  const params = req.query;
  console.log('in controllers.getReviewsMeta, these are the parameters', params);
  Queries.getReviewsMeta(params).then((data) => res.send(data));
}

const createReview = (req, res) => {
  const params = req.body;

  Queries.createReview(params).then(() => res.status(201).end());
}

const markReviewHelpful = (req, res) => {
  const params = req.params; //is this different for put?
  console.log('these are the params', params)
  Queries.markReviewHelpful(params).then(() => res.status(204).end());
}

const reportReview = (req, res) => {
  const params = req.params;
  console.log('params in reportREview:', params)
  Queries.reportReview(params).then(() => res.status(204).end()).catch(err => console.log(err))
}
//export functions so they are available to us in other files that require this file
module.exports = {
  getReviews,
  getReviewsMeta,
  createReview,
  markReviewHelpful,
  reportReview,
}