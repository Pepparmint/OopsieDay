// import
/*
import express from 'express';
import fs from 'fs';
import path from 'path';
*/

const express = require('express'); // Uncaught ReferenceError: require is not defined ??? 
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));

const dataFilePath = path.join(__dirname, 'data.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data.json', (req, res) => {
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

// NOT WÖRKING PROPERLY
app.post('/data.json', (req, res) => {
  const newData = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).json({ error: 'Error saving data' });
      return;
    }

    try {
      const existingData = JSON.parse(data);
      existingData.push(newData);
      const updatedData = JSON.stringify(existingData);

      fs.writeFile(dataFilePath, updatedData, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error('Error writing data file:', writeErr);
          res.status(500).json({ error: 'Error saving data' });
        } else {
          console.log('Data saved successfully.');
          res.json({ message: 'Data saved successfully.' });
        }
      });
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).json({ error: 'Error saving data' });
    }
  });
});

app.listen(port, ()=> console.info(`Listening on port ${port}`));