// import
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));

/*
import express, { json, static } from 'express';
import { readFile, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
const app = express();
const port = 8080;

app.use(json());
app.use(static('public'));
*/

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
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

// NOT IN USE// NOT WÖRKING AS PROPERLY // NOT IN USE// NOT IN USE// NOT IN USE
app.post('/data.json', (req, res) => {
    const newData = req.body;
  
    let existingData = [];
    try {
      const dataFile = fs.readFileSync('data.json');
      existingData = JSON.parse(dataFile);
    } catch (err) {
      console.error('Error reading existing data:', err);
    }
  
    existingData.push(newData);
  
    try {
      fs.writeFileSync('data.json', JSON.stringify(existingData));
      console.log('Data saved successfully.');
      res.json({ message: 'Data saved successfully.' });
    } catch (err) {
      console.error('Error saving data:', err);
      res.status(500).json({ error: 'Error saving data.' });
    }
});

app.listen(port, ()=> console.info(`Listening on port ${port}`));