/*
fetch("savedScores.json").then(function(response){
  return response.json();
})
.then(function(savedScores){
  let placeholder = document.querySelector("#scoreTableBody");
  let out = "";
  for(let product of savedScores){
    out +=`<tr>
              <td><${product.score}></td>
              <td>${product.name}</td>
              <td>${product.lastName}</td>
            </tr>`;
  }
})
*/
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
  const scoreInput = document.getElementById('scoreInput');
  const nameInput = document.getElementById('nameInput');
  const lastnameInput = document.getElementById('lastnameInput');
  
  const score = scoreInput.value;
  const name = nameInput.value;
  const lastname = lastnameInput.value;
  
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