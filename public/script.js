//SCORESNAMNDATA
// TESTAR PÅ LIVESERVER
// const , var, let

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');
  const save2TxtButton = document.querySelector('#save2TxtButton');

  fetchButton.addEventListener('click', renderJSONData); // getData
  submitButton.addEventListener('click', addRow); 
  save2TxtButton.addEventListener('click', printData); // printData

// nånting här ska ändras
// 'http://localhost:8080/public/data.json' '/public/data.json' 'data.json'
const dataFilePath = '/public/data.json'; // <<-- samma som app.post? men använd inte .json men då funkar inget (?)

function createRow(score, name, lastName) {
  const tableRow = document.createElement('tr');
  const scoreCell = createCell(score);
  const nameCell = createCell(name);
  const lastNameCell = createCell(lastName);

  tableRow.appendChild(scoreCell);
  tableRow.appendChild(nameCell);
  tableRow.appendChild(lastNameCell);

  return tableRow;
}

function createCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  return cell;
}

// lägger till data
function addRow(event) {
  event.preventDefault();

  const inputScore = document.querySelector('#inputScore');
  const inputName = document.querySelector('#inputName');
  const inputLastName = document.querySelector('#inputLastName');

  const score = inputScore.value;
  const name = inputName.value;
  const lastName = inputLastName.value;

  if (score && name && lastName) {
    const tableRow = createRow(score, name, lastName);
    tableBody.appendChild(tableRow);

    inputScore.value = '';
    inputName.value = '';
    inputLastName.value = '';
  }

  const scores = { score, name, lastName };
  updateJSONData(dataFilePath, scores)
    .then(() => {
      console.log('Data got thrown into space successfully.');
    })
    .catch((err) => {
      console.error('Error saving data:', err);
    });
}

// fetchar data
async function getJSON(dataFilePath) {
  let respone = await fetch(dataFilePath);
  let jsonData = await respone.json();
  return jsonData;
}

// visar data
function renderJSONData() {
  getJSON(dataFilePath)
    .then(jsonData => {
      jsonData.scores.forEach(function (e) {
        document.getElementById('tableBody').innerHTML += `
          <tr>
          <td>${e.score}</td>
          <td>${e.name}</td>
          <td>${e.lastName}</td>
          </tr>`;
      });
    })
    .catch(err => {
      console.error('Error fetching JSON data:', err);
    });
}

renderJSONData();

// update data
async function updateJSONData(dataFilePath, scores) { 
  let response = await fetch(dataFilePath);
  let jsonData = await response.json();

  jsonData.scores.push(scores);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  };

  await fetch(dataFilePath, options);
  }

  // sparar tableBody till txtfil fir the lols
  async function printData() {
    var tableBody = document.getElementById('tableBody');
    var data = [];
  
    for (var i = 0; i < tableBody.rows.length; i++) {
      var row = tableBody.rows[i];
      var rowData = [];
  
      for (var j = 0; j < row.cells.length; j++) {
        var cell = row.cells[j];
        rowData.push(cell.innerText);
      }
  
      data.push(rowData);
    }
  
    var data_string = JSON.stringify(data, null, 2);
    var file = new Blob([data_string], { type: "text" });
    var anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(file);
    anchor.download = "tableBody.txt";
    anchor.click();
  }
  
});