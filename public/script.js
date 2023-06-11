//SCORESNAMNDATA
// TESTAR PÅ LIVESERVER

const dataFilePath = 'data.json'; // waitfor it

window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const fetchButton = document.querySelector('#fetchButton');
  const submitButton = document.querySelector('#submitButton');
  const save2TxtButton = document.querySelector('#save2TxtButton');

  fetchButton.addEventListener('click', renderJSONData); // getData
  submitButton.addEventListener('click', addRow); 
  save2TxtButton.addEventListener('click', printData); // printData

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

  // const scores = {score, name, lastName};
  // updateJSONData(dataFilePath, scores);
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

async function updateJSONData(dataFilePath, scores) { // update data
  const response = await fetch(dataFilePath);
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
  renderJSONData(); // render data
  }

/*
// Sparar inputvärden till textfil :D 
async function printData() {
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
  };*/

  // sparar tableBody till txtfil
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



/* // test
const dataFilePath = 'data.json';
async function getJSON(dataFilePath) {
    let data = await fetch(dataFilePath);
    let text = await data.json();
    return text;
}

let jsonData = await getJSON(dataFilePath);

jsonData.scores.forEach(function (e, i) {
    document.getElementById("tableBody").innerHTML +=`
    <tr>
      <td>${e.score}</td>
      <td>${e.name}</td>
      <td>${e.lastName}</td>
    </tr>`;
});

document.getElementById("tableBody").innerHTML +=
    `<tr>
        <td>
            <input type="number" name="Score" id="scoreInput" placeholder="Score">
        </td>
        <td>
            <input type="text" name="name" id="nameInput" placeholder="Name">
        </td>
        <td>
            <input type="text" name="lastName" id="lastName" placeholder="Last name">
        </td>
        <td>
            <input type="submit" value="SUBMIT" id="submit">
        </td>
    </tr>`;
*/