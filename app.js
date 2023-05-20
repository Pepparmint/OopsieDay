// import
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

let data = [];
fs.readFile('data.json', (err, jsonData) => {
  if (!err) {
    data = JSON.parse(jsonData);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/submit', (req, res) => {
  const score = req.body.score;
  const name = req.body.name;
  const lastname = req.body.lastname;

  data.push({ score, name, lastname });

  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to data file:', err);
    }
  });

  res.redirect('/');
});
/*
ejs stuff

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