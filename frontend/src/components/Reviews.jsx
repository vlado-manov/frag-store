import React, { useState } from "react";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import Loader from "./ux/Loader";
import Message from "./ux/Message";
import CustomButton from "./ui/CustomButton";

const labels = {
  0: "Useless",
  1: "Poor",
  2: "Could be better",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const formatDate = (dateString) => {
  const now = new Date();
  const postedDate = parseISO(dateString);

  const distance = formatDistanceToNow(postedDate, { addSuffix: true });

  if (now - postedDate <= 2 * 24 * 60 * 60 * 1000) {
    return distance;
  } else {
    return new Date(postedDate).toLocaleString();
  }
};

const Reviews = ({
  reviews,
  productId,
  userInfo,
  createReview,
  loadingProductReview,
  refetch,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(-1);

  const addReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setRating(5);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Reviews</h2>
      <div id="reviews" className="space-y-4">
        {reviews?.map((review, key) => (
          <div key={key} className="bg-gray-100 p-6 rounded-md">
            <p className="text-md text-black font-bold mb-3">
              {review.name} said:
            </p>
            <hr className="mb-3" />
            <Rating
              name="read-only"
              value={review.rating}
              size="small"
              readOnly
            />
            <p className="text-gray-800">"{review.comment}"</p>
            <p className="text-sm text-gray-500">
              - {formatDate(review.createdAt)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-bold text-gray-800">Add a Review</h3>
        {loadingProductReview && <Loader />}
        {userInfo ? (
          <form className="space-y-4" onSubmit={addReview}>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={rating}
                size="large"
                getLabelText={getLabelText}
                onChange={(e, newValue) => {
                  setRating(newValue || 0);
                }}
                onChangeActive={(e, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : rating]}
                </Box>
              )}
            </Box>
            <textarea
              className="w-full p-4 border rounded-md"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <CustomButton
              type="submit"
              disabled={loadingProductReview}
              tw="w-full"
            >
              Submit Review
            </CustomButton>
          </form>
        ) : (
          <Message severity="info" variant="standard" sx={{ margin: 2 }}>
            Please{" "}
            <Link to="/login" className="underline">
              sign in
            </Link>{" "}
            to leave a review
          </Message>
        )}
      </div>
    </div>
  );
};

export default Reviews;
