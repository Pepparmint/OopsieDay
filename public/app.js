// TESTAR PÅ LIVESERVER

const express = require('express');
const fs = require('fs');
const path = require('path'); // O_O

const app = new express();
const port = 8080;

const dataFilePath = '/public/data.json'; // O_O
// const dataFilePath = path.join('public', 'data.json'); // O_O

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => { // 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// '/public/data' , '/data' , '/public/data.json'
app.get('/public/data.json', (_req, res) => { 
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).json({ error: 'Failed to fetch data' });
      return;
    }

    try {
      const tableData = JSON.parse(data);
      res.json(tableData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
});

// '/public/data' , '/data' , '/public/data.json' , dataFilePath
app.post('/public/data.json', (req, res) => { 
  const { score, name, lastName } = req.body;

  if (!score || !name || !lastName) {
    return res.status(400).send('Invalid data');
  }

  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    const scores = {
      score: parseInt(score),
      name: name,
      lastName: lastName
    };

    jsonData.scores.push(scores);

    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData));

    console.log('Data saved successfully.');
    return res.send('Data saved successfully');
  } catch (err) {
    console.error('Error reading or writing data file:', err);
    return res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});