const express = require('express'); // Uncaught ReferenceError: require is not defined ??? 
const fs = require('fs');
const path = require('path');
//const cors = require('cors');

const app = express();
const port = 8080;

const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(cors())

/*
const corsOptions = {
  origin: 'http://http://localhost:8080/index.html',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));
*/

/*
app.route('/data')
  .get((req, res) => {
    res.send('GET method is allowed');
  })
  .post((req, res) => {
    res.send('POST method is allowed');
  });
*/

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (_req, res) => {
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

app.post('/data', (req, res) => {
  const { score, name, lastName } = req.body;

  if (!score || !name || !lastName) {
    res.status(400).send('Invalid data');
    return;
  }

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).send('Error saving data');
      return;
    }

    let existingData = [];
    try {
      existingData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
    }

    existingData.push({ score, name, lastName });

    fs.writeFile(dataFilePath, JSON.stringify(existingData), (writeErr) => {
      if (writeErr) {
        console.error('Error writing data file:', writeErr);
        res.status(500).send('Error saving data');
        return;
      }

      console.log('Data saved successfully.');
      res.send('Data saved successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});