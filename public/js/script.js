const scoreForm = document.getElementById('scoreForm');
const scoreTable = document.getElementById('scoreTable');

scoreForm.addEventListener('submit', async (event) => {
  event.preventDefault();

const scoreInput = document.getElementById('score');
const nameInput = document.getElementById('name');
const lastnameInput = document.getElementById('lastname');

const score = scoreInput.value;
const name = nameInput.value;
const lastname = lastnameInput.value;

  await fetch('/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ score, name, lastname })
  });

  scoreInput.value = '';
  nameInput.value = '';
  lastnameInput.value = '';

  await refreshScores();
});

async function refreshScores() {
    const response = await fetch('/scores');
    const scores = await response.json();

  scoreTable.innerHTML = '';

  scores.forEach(score => {
      const row = document.createElement('tr');
      const scoreCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const lastnameCell = document.createElement('td');

      scoreCell.textContent = score.score;
      nameCell.textContent = score.name;
      lastnameCell.textContent = score.lastname;

      row.appendChild(scoreCell);
      row.appendChild(nameCell);
      row.appendChild(lastnameCell);
      scoreTable.appendChild(row);
  });
}
refreshScores();