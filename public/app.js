// TESTAR PÅ LIVESERVER

const express = require('express');
const fs = require('fs');
// const path = require('path');

const app = new express();
const port = 8080;

const dataFilePath = 'public/data.json';
// const dataFilePath = path.join('public', 'data.json');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => { // 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/', (_req, res) => { // /data
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

app.post('/', (req, res) => {
  const { score, name, lastName } = req.body;

  if (!score || !name || !lastName) {
    return res.status(400).send('Invalid data');
  }

  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    // const jsonData = JSON.parse(fetchedData);

    const newScore = {
      score: parseInt(score),
      name: name,
      lastName: lastName
    };

    jsonData.scores.push(newScore);

    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData));

    console.log('Data saved successfully.');
    return res.send('Data saved successfully');
  } catch (err) {
    console.error('Error reading or writing data file:', err);
    return res.status(500).send('Error saving data');
  }
});


/*
app.post('/', (req, res) => { // /data
  // const {score, name, lastName} = req.body;
  let score = req.body.score;
  let name = req.body.name;
  let lastName = req.body.lastName;

  if (!score || !name || !lastName) {
    res.status(400).send('Invalid data');
    return;
  }

  fs.readFile(dataFilePath, 'utf8', (err) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).send('Error saving data');
      return;
    }

    // let existingData = [];
    try {
      const jsonData = JSON.parse(jsonData.toString());

      // + data
      jsonData.scores[jsonData.scores.length] =
      {
          score: parseInt(score),
          name: name,
          lastName: lastName
      };

      fs.writeFile(dataFilePath, JSON.stringify(jsonData), writeErr => {
        if (writeErr) {
          console.error('Error writing data file:', writeErr);
          res.status(500).send('Error saving data');
          return;
        }
        console.log('Data saved successfully.');
        res.send('Data saved successfully');
      });
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send('Error saving data');
    }
  });
  res.sendFile(__dirname + "/index.html");
});
*/