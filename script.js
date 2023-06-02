//SCORESNAMNDATA

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const addButton = document.querySelector('#addButton');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.getElementById('submitButton');

  fetchButton.addEventListener('click', fetchData);
  addButton.addEventListener('click', addRow); //addButton.addEventListener('click', addData);
  submitButton.addEventListener('click', submitData()); // submitData()

function fetchData() { 
  fetch('/data.json')
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

/*
----------------------------------------------------------------------------------
// spara inputvärden i textfil...

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

async function submitData() {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    renderRows(data);

    const scoreInput = document.querySelector('#inputScore');
    const nameInput = document.querySelector('#inputName');
    const lastNameInput = document.querySelector('#inputLastName');

    const score = scoreInput.value;
    const name = nameInput.value;
    const lastName = lastNameInput.value;

    if (score && name && lastName) {
      const newData = {
        score: score,
        name: name,
        lastName: lastName
      };

      const response = await fetch('/data.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        console.log('Data submitted successfully.');
        fetchData();
      } else {
        throw new Error('Error submitting data. Server responded with status: ' + response.status);
      }
    }
  } catch (err) {
    console.error('Error submitting data:', err);
  }
}
});