//SCORESNAMNDATA

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');

  fetchButton.addEventListener('click', fetchData); // getExistingData
  submitButton.addEventListener('click', addRow); // submitData

function fetchData() { 
  fetch('/data.json') // /data.json funkar i liveserver
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

  data.forEach(rowData => {
    const { score, name, lastName } = rowData;
    const tableRow = createRow(score, name, lastName);
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

    saveData(score, name, lastName);
  }
}

function saveData(score, name, lastName) {
  fetch('/', { // /data
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, name, lastName })
  })
  .then(response => {
    if (response.ok) {
      console.log('Data saved successfully.');
    } else {
      console.error('Failed to save data:', response.statusText);
    }
  })
  .catch(err => {
    console.error('Error saving data:', err);
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