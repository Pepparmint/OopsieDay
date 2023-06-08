//SCORESNAMNDATA
const dataFilePath = 'data.json'; // waitfor it

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');

  fetchButton.addEventListener('click', renderJSONData); // getData
  submitButton.addEventListener('click', addRow); // submitData

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
  }

  const scores = {score, name, lastName};
  updateJSONData(dataFilePath, scores);
}

async function getJSON(dataFilePath) {
  let data = await fetch(dataFilePath);
  let jsonData = await data.json();
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

async function updateJSONData(dataFilePath, scores) { // // data
  const data = await fetch(dataFilePath);
  let jsonData = await data.json();

  jsonData.scores.push(scores); // data

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  };

  await fetch(dataFilePath, options);

  renderJSONData(); // render data
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