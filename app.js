const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes')

const app = express();

const dpURI = 'mongodb+srv://Aryan02:test1234@cluster0.nqriqps.mongodb.net/Cluster0?retryWrites=true&w=majority';
mongoose.connect(dpURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
    


// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host ', req.hostname);
//     console.log('path ', req.path);
//     console.log('method ', req.method);
//     next();
// })

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});

app.get('/all-blogs', (req, res) => {
        Blog.find()
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                console.log(err)
            });
});

app.get('/about', (req, res) => {
    res.render('about', {title : 'About'});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {title : '404'});
});

// exports.api = functions.https.onRequest(app)