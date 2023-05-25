// import
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.get('/data.json', (req, res) => { //hämta
  const dataFilePath = path.join(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => { //SYNC
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

app.post('/data.json', (req, res) => { // NOT IN USE// NOT IN USE// NOT IN USE// NOT IN USE// NOT IN USE
  const newData = req.body;

  const dataFilePath = path.join(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).json({ error: 'Failed to add data' });
      return;
    }

    try {
      const tableData = JSON.parse(data);
      tableData.push(newData);

      fs.writeFile(dataFilePath, JSON.stringify(tableData), 'utf8', err => {
        if (err) {
          console.error('Error writing to data file:', err);
          res.status(500).json({ error: 'Failed to add data' });
          return;
        }

        res.json({ success: true });
      });
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Failed to add data' });
    }
  });
  /*
  let existingData = [];
  try {
    const dataFile = fs.readFileSync('data.json', 'utf8');
    existingData = JSON.parse(dataFile);
  } catch (err) {
    console.error('Error reading data file:', err);
  }

  existingData.push(newData);

  const jsonData = JSON.stringify(existingData, null, 2);

  fs.writeFile('data.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ error: 'Failed to save data' });
    } else {
      console.log('Data saved to data.json file.');
      res.json({ message: 'Data saved successfully' });
    }
  });*/
});

app.listen(port, ()=> console.info(`Listening on port ${port}`));