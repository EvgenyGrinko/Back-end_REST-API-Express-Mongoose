const mongoose = require("mongoose");

//Define the Schema - the definition of how your storing data looks
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

//And create the actual document "Posts" using "model".
//A model is a class with which we construct documents
//We must give it a name ("Posts") and the Scema ("PostSchema")
module.exports = mongoose.model("Posts", PostSchema);
