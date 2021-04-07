const express = require('express');
const mongoose = require('mongoose');
const blogrouter = require('./routes/blog');
const blogs = require('./model/schema');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


app.get('/', async(req, res) => {
    const blog = await blogs.find().sort({ createdAt: 'desc' });
    res.render('index.ejs', { blogs: blog});
})


app.use('/blog', blogrouter);
app.listen(5000);
