//SCORESNAMNDATA

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.getElementById('submitButton');

  fetchButton.addEventListener('click', fetchData);
  submitButton.addEventListener('click', addRow, newTable); // submitData

function fetchData() { 
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      renderRows(data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}

function renderRows(data) {
  tableBody.innerHTML = '';
  data.forEach(row => {
    const tableRow = createRow(row.score, row.name, row.lastName);
    tableBody.appendChild(tableRow);
  });
}

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

function addRow() {
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
}

function getDataTable() {
  const table = document.getElementById('table');
  const tbody = table.querySelector('tbody');
  const rows = tbody.getElementsByTagName('tr');
  const data = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const score = row.cells[0].innerText;
    const name = row.cells[1].innerText;
    const lastName = row.cells[2].innerText;

    const rowData = {
      score: score,
      name: name,
      lastName: lastName
    };

    data.push(rowData);
  }

  return data;
}

function newTable() {
  const data = getDataTable();

  fetch('data.json', { // what to wriiight skriva skriva
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log('Data submitted successfully:', result);
    })
    .catch(err => {
      console.error('Error submitting data:', err);
    });
}
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