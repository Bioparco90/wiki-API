const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articles = require('./articles');

mongoose.connect("mongodb://localhost:27017/wikiDB");

app.use(express.urlencoded({ extended: false }));
app.use('/articles', articles);

app.listen(3000, () => console.log(`Server is running on port 3000`));
