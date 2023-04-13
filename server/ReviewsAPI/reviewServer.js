const express = require('express');
const app =express();
const port =3001;
app.use(express.json());
//will this interfere with server on front end that is calling this API? IDK!!!
const bodyParser = require('body-parser');
const controllers = require('./controllers.js');
app.use((req, res, next) => {
  console.log('serving: ', req.method, req.path, req.query);
  next();
})

app.get('/reviews/', (req, res) => {
  controllers.getReviews(req, res)
});

app.get('/reviews/meta', (req, res) => {
  controllers.getReviewsMeta(req, res)
});

app.post('/reviews/', (req, res) => {
  console.log('I am in app.post yo!')
  controllers.createReview(req, res)
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('AM I HINTTING THIS ENDPOINT!! HELLO')
  controllers.markReviewHelpful(req, res)
});

app.put('/reviews/:review_id/report', (req, res) => {
  console.log('Hi, I  would like to report a review, I am in ReviewServer.js')
  controllers.reportReview(req, res)
});

app.listen(port, () => console.log(`app listening on port ${port}`));