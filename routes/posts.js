const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); //a model to create documents

//All the following routes start with "/posts".
//We don't need to add route "posts" as we already specify it in the middleware in "app.js".
//It means that root route "/" allows to get access to "localhost:3000/posts"

//GET BACK ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//This route allows to get access to localhost:3000/posts/specific
router.get("/specific", (req, res) => {
  res.send("specific posts");
});

//SUBMIT A POST
router.post("/", async (req, res) => {
  //req.body - an object with sended data
  // console.log(req.body);

  //Create a new document using "new Model"
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save(); //it returns a promise
    //A document can be saved to the database by calling its "save" method
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
  // .then((data)=>{res.json(data);})//we get back the data and see it on the screen res.json(data)
  // //res.json(data) - Sends a JSON response
  // .catch((err) =>{res.json({message: err})})
});

//GET A SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE ONE POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A POST
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//export router
module.exports = router;
