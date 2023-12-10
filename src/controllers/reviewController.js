const ReviewModel = require("../models/review");
const Teacher = require("../models/teacher");

//createReview is working properly and saving review inside the teacher id 
const createReview = async (req, res) => {
  const { userId, teacherId, rating, comment } = req.body;
  try {
    // Find the teacher and add the review
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      {
        $push: { reviews: { userId, rating, comment } }
      },
      { new: true }
    );
    res.status(201).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the review' });
  }
};
//readReviews is working properly and saving review inside the teacher id 
const readReviews = async (req, res) => {
  const teacherId = req.params.teacherId;
  try {
    // Find the teacher by ID and retrieve only the 'reviews' field
    const teacher = await Teacher.findById(teacherId).select('reviews');
    
    if (!teacher) {
      // Send a 404 Not Found response
      res.status(404).json({ message: 'Teacher not found' });
    } else {
      // Send the reviews in the response
      res.status(200).json(teacher.reviews);
    }
  } catch (error) {
    console.error(error);
    // Send a 500 Internal Server Error response
    res.status(500).json({ message: 'An error occurred' });
  }
};

const updateReview = async (req, res) => {
  const { teacherId, reviewId } = req.params; // Assuming you pass teacherId and reviewId as route parameters
  const { rating, comment } = req.body;

  try {
    const update = {
      $set: {
        "reviews.$[elem].rating": rating,
        "reviews.$[elem].comment": comment
      }
    };

    const filter = {
      _id: teacherId,
      "reviews._id": reviewId
    };

    const options = {
      arrayFilters: [{ "elem._id": reviewId }],
      new: true
    };

    const updatedTeacher = await Teacher.findOneAndUpdate(filter, update, options);

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher or review not found" });
    }

    // Find the updated review in the array to return it
    const updatedReview = updatedTeacher.reviews.find(review => review._id.toString() === reviewId);

    res.status(200).json(updatedReview || { message: "Review not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the review" });
  }
};


const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await ReviewModel.findByIdAndRemove(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting the review" });
  }
};

module.exports = { createReview, readReviews, updateReview, deleteReview };
