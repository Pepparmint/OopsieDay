//SCORESNAMNDATA
window.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#tableBody');
  const addButton = document.querySelector('#addButton');
  const fetchButton = document.querySelector('#fetchButton');

  fetchButton.addEventListener('click', fetchData);
  addButton.addEventListener('click', addRow); //addButton.addEventListener('click', addData);

function fetchData() {
  fetch('/data.json') // '/api/data'
    .then(response => response.json())
    .then(data => {
      renderRows(data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}

function renderRows(data) {
    tableBody.innerHTML = ''; //clear
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
    inputLastName.value = '';//Cleear
  }
}

function addData() { // NOT IN USE // NOT IN USE// NOT IN USE// NOT IN USE// NOT IN USE// NOT IN USE// NOT IN USE
  const scoreInput = document.querySelector('#inputScore');
  const nameInput = document.querySelector('#inputName');
  const lastnameInput = document.querySelector('#inputLastName');

  const score = scoreInput.value;
  const name = nameInput.value;
  const lastname = lastnameInput.value;

  const newData = {
    score: score,
    name: name,
    lastName: lastname
  };

  fetch('/data.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
    .then(response => response.json())
    .then(data => {
      fetchData();
    })
    .catch(err => {
      console.error('Error adding data:', err);
    });
}
});





















/*  -----------------------------------------------------------------------------------------------------------------------------------------
I CANT CODE, EMOTIONAL DAMAAGE; STOOPID- (Steven He)

lass Xcore {
  constructor(score, name, lastName) {
      this.score = score;
      this.name = name;
      this.lastName = lastName;
  }
  urScoreName() {
      return `${this.score} ${this.name} ${this.lastName}`;
  }
}

let data = [];

document.getElementById('submit').addEventListener('click', () => {
    const score = parseInt(document.getElementById('scoreInput').value);
    const name = document.getElementById('nameInput').value;
    const lastName = document.getElementById('lastNameInput').value;

    data.push(new Xcore(score, name, lastName));

    scoreToTable();
});

function scoreToTable() {
  let scores = "<table><tr>";
    for (let x in data[0]) {
        scores += `<th>${x}</th>`;
    }
    data.forEach(data => {
        scores += "<tr>";

        for (let attr in data) {
            scores += `<td>${data[attr]}</td>`
        }
        scores += "</tr>";
    });
    document.getElementById("tBody").innerHTML = scores + "</table>";
}
----------------------------------------------------------------------------------------------------------------------------------
/*document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const score = document.getElementById('scoreInput').value;
  const name = document.getElementById('nameInput').value;
  const lastname = document.getElementById('lastnameInput').value;
  const tableBody = document.querySelector('tBody');
  const row = document.createElement('tr');

  const score = scoreInput.value;
  const name = nameInput.value;
  const lastname = lastnameInput.value;
  
  row.innerHTML = `
    <td>${score}</td>
    <td>${name}</td>
    <td>${lastname}</td>
  `;

  tableBody.appendChild(row);

  document.getElementById('score').value = '';
  document.getElementById('name').value = '';
  document.getElementById('lastname').value = '';
});

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `score=${score}&name=${name}&lastname=${lastname}`,
    })
    .then(response => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  });
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#dataTable tbody');
        data.forEach(entry => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${entry.score}</td>
            <td>${entry.name}</td>
            <td>${entry.lastname}</td>
          `;
          tableBody.appendChild(row);
        });
      });
});
*/