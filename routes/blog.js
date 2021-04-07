const express = require('express');
const blogs = require('./../model/schema');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('new.ejs');
})

router.get('/:id', async(req, res) => {
    let blog = await blogs.findById(req.params.id);
    if (blog == null) res.redirect('/');
    console.log(blog);
    res.render('view_blog.ejs', { blog: blog});
})

router.post('/', async(req, res) => {
    let blog = new blogs({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })
    try {
        blog = await blog.save();
        res.redirect(`/blog/${blog.id}`);
    } catch(err) {
        console.log(err);
        res.render('new.ejs');
    }
})

router.get('/edit/:id', async(req, res) => {
    let blog = await blogs.findById(req.params.id);
    if (blog == null) res.redirect('/');
    res.render('edit.ejs', { blog: blog});
})

router.post('/edit/:id', async(req, res) => {
    let temp_blog = await blogs.findById(req.params.id);
    if (temp_blog == null) res.redirect('/');
    temp_blog.title = req.body.title;
    temp_blog.description = req.body.description;
    temp_blog.content = req.body.content;
    temp_blog.createdAt = new Date();
    try {
        temp_blog = await temp_blog.save();
        res.redirect(`/blog/${temp_blog.id}`);
    } catch(err) {
        console.log(err);
        res.render(`/blog/${temp_blog.id}`);
    }
})

router.get('/delete/:id', async(req, res) => {
    await blogs.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


module.exports = router;