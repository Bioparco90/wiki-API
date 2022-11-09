const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
    "title": String,
    "content": String
}

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
    Article.find((err, results) => {
        if (err) {
            console.log('Error in get articles');
            res.send(err);
        }
        else {
            console.log('get articles OK');
            res.send(results);
        }
    });
});

app.listen(3000, () => console.log(`Server is running on port 3000`));