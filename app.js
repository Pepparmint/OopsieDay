// import
const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

let scores = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  app.post('/addScore', (req, res) => {
    const { score, name, lastName } = req.body;
    scores.push({ score, name, lastName });
    res.redirect('/');
  });
  
  app.get('/getScores', (req, res) => {
    res.json(scores);
  });

/* ejs stuff

app.get('/views', (req, res)=> {
    res.sendFile(path.join(__dirnamem, 'index.html'));
});

app.get('/views', (req, res)=> {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res)=> {
    res.render('index', { text: 'This is EJS'})
})

app.get('/about', (req, res)=> {
    res.render('about', { text: 'This page were made by a Cookie Monster', })
})

*/

app.listen(port, ()=> console.info(`Listening on port ${port}`));