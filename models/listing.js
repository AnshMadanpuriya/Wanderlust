const mongoose = require("mongoose");
const Review = require("./reviews.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
    // url: {
    //   type: String,
    //   default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
    // },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  
  category:{
  type:String,
  enum:[
    "trending",
    "rooms",
    "iconic-cities",
    "mountains",
    "castles",
    "pools",
    "arctic",
    "beach",
    "camping"
  ],
  required:true
}
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;