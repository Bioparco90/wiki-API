const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// router.param('articleName', (req, res, next) => next());

router.get("/", (req, res) => {
  Article.find((err, results) => {
    err ? res.send(err) : res.send(results);
  });
})

.get("/:articleName", (req, res) => {
  let article = req.params.articleName;
  Article.findOne({title: article}, (err, result) => {
    !result ? res.send("No match found") : res.send(result);
  });
})

.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newArticle = new Article({
    title: title,
    content: content,
  });

  newArticle.save((err) => {
    err ? res.send(err) : res.redirect("/articles");
  });
})

.delete("/", (req, res) => {
  Article.deleteMany({}, (err) => {
    err ? res.send(err) : res.redirect("/articles");
  });
});

module.exports = router;