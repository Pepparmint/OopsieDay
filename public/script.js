//SCORESNAMNDATA

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');

  const dataFilePath = 'data.json'; // waitfor it

  fetchButton.addEventListener('click', renderJSONData); // getData
  submitButton.addEventListener('click', addRow); // submitData

/*
function fetchData() { 
  fetch(dataFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched data:', data);
      renderRows(data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}

function renderRows(data) {
  tableBody.innerHTML = '';

  data.forEach(rowData => {
    const { score, name, lastName } = rowData;
    const tableRow = createRow(score, name, lastName);
    tableBody.appendChild(tableRow);
  });
}*/

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

    getJSON(dataFilePath);
  }
}

async function getJSON(dataFilePath) {
  let response = await fetch(dataFilePath);
  let jsonData = await response.json();
  return jsonData;
}

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
});

/*
----------------------------------------------------------------------------------
// Sparar inputvärden till textfil :D 

async function submitData() {
  var score = document.getElementById('inputScore').value;
  var fname = document.getElementById('inputName').value;
  var lname= document.getElementById('inputLastName').value;

  alert("WORK PLS")

  var data = [];
  data.push(score);
  data.push(fname);
  data.push(lname);

  var data_string = JSON.stringify(data, null, 2);

  var file = new Blob([data_string],{type:"text"});
  var anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(file);
  anchor.download = "urScores.TXT"; 
  anchor.click();
  };
});
----------------------------------------------------------------------------------
*/