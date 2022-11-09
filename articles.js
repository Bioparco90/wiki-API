const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

router.get("/", (req, res) => {
  Article.find((err, results) => {
    if (err) {
      console.log("Error in get articles");
      res.send(err);
    } else {
      console.log("get articles OK");
      res.send(results);
    }
  });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newArticle = new Article({
    title: title,
    content: content,
  });

  newArticle.save((err) => {
    err ? res.send(err) : res.redirect("/articles");
  });
});

router.delete("/", (req, res) => {
  Article.deleteMany({}, (err) => {
    err ? res.send(err) : res.redirect("/articles");
  });
});

module.exports = router;