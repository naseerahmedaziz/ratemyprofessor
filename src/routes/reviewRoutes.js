const express = require("express");
const {
  createReview,
  readReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/createReview", createReview);
reviewRouter.get('/:teacherId', readReviews);
reviewRouter.patch('/update/teacher/:teacherId/review/:reviewId', updateReview);
reviewRouter.post("/deleteReview", deleteReview);


module.exports = reviewRouter;


// {
//   "_id": "6573444ae1d5e878f38aba46",
//   "name": "Sir Shakeel",
//   "subject": "maths",
//   "reviews": [
//       {
//           "userId": "5f50c31b5f50c31b5f50c31b",
//           "rating": 5,
//           "comment": "Excellent teacher!",
//           "_id": "6573455630d1174349047970",
//           "createdAt": "2023-12-08T16:33:26.299Z",
//           "updatedAt": "2023-12-08T16:33:26.299Z"
//       },
//       {
//           "userId": "5f50c31b5f50c31b5f50c31b",
//           "rating": 5,
//           "comment": "Excellent teher!",
//           "_id": "657345aee99a604ad33853a8",
//           "createdAt": "2023-12-08T16:34:54.211Z",
//           "updatedAt": "2023-12-08T16:34:54.211Z"
//       }
//   ],
//   "createdAt": "2023-12-08T16:28:58.521Z",
//   "updatedAt": "2023-12-08T16:34:54.211Z",
//   "__v": 0
// },