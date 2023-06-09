//SCORESNAMNDATA
// TESTAR PÅ LIVESERVER
// const , var, let

window.addEventListener('DOMContentLoaded', async() => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');
  const save2TxtButton = document.querySelector('#save2TxtButton');

  fetchButton.addEventListener('click', renderJSONData); // getData
  submitButton.addEventListener('click', addRow); // addrow / data
  save2TxtButton.addEventListener('click', printData); // printData

// nånting här ska ändras
// 'http://localhost:8080/public/data.json' '/public/data.json' 'data.json'
const dataFilePath = './public/data'; // <<-- samma som app.post? men använd inte .json men då funkar inget (?)

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
// update data
async function updateJSONData(dataFilePath, scores) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scores),
  };

  await fetch(dataFilePath, options);
  }

// visar data
async function renderJSONData() {
  let jsonData = await fetch(dataFilePath)
      console.log(jsonData);
  let data = await jsonData.json();
      console.log(data);

  data.scores.forEach(function (e) {
    document.getElementById('tableBody').innerHTML += `
      <tr>
      <td>${e.score}</td>
      <td>${e.name}</td>
      <td>${e.lastName}</td>
      </tr>`;
  });
}

  // sparar tableBody till txtfil for the lols
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

  await renderJSONData();
  
});