// import
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.get('/data.json', (req, res) => { //hämta
  const dataFilePath = path.join(__dirname, 'data.json');

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
});

app.listen(port, ()=> console.info(`Listening on port ${port}`));