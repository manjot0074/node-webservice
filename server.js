const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintince.hbs');
// });

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('<h1>hello</h1>');
   res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcome: 'welcome'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle : 'About Page',
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage : 'error'
    })
})

app.listen(port, () => {
    console.log('server is up');
});