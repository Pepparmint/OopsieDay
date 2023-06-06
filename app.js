const express = require('express'); // Uncaught ReferenceError: require is not defined ??? 
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

const dataFilePath = path.join(__dirname, 'data.json');
//const dataFilePath = 'data.json';

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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

app.post('/', (req, res) => { // /data
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

/*
app.route('/data')
  .get((req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data file:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    });
  })
  .post((req, res) => {
    const { score, name, lastName } = req.body;

    if (!score || !name || !lastName) { // validera
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
*/