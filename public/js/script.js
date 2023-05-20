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

$(document).ready(function() {
var scoreCount = 1;

function addScoreInput() {
  var inputHtml = '<div><label for="scoreInput' + scoreCount + '">Score:</label>' +
    '<input type="number" id="scoreInput' + scoreCount + '" required>' +
    '<label for="nameInput' + scoreCount + '">Name:</label>' +
    '<input type="text" id="nameInput' + scoreCount + '" required>' +
    '<label for="lastNameInput' + scoreCount + '">Last Name:</label>' +
    '<input type="text" id="lastNameInput' + scoreCount + '" required></div>';

  $('#scoreInputs').append(inputHtml);
  scoreCount++;
}

function updateTable() {
  $.get('/getScores', function(scores) {
    var tableBody = '';
    scores.forEach(function(score) {
      tableBody += '<tr><td>' + score.score + '</td><td>' + score.name + '</td><td>' + score.lastName + '</td></tr>';
    });
    $('#scoreTableBody').html(tableBody);
  });
}

$('#scoreForm').submit(function(event) {
  event.preventDefault();
  var scoresData = [];;

  for(var i = 1; i<=scoreCount; i++){
    var score = $('#scoreInput' + i).val();
    var name = $('#nameInput' + i).val();
    var lastName = $('#lastNameInput' + i).val();

    if(score && name && lastName){
      scoresData.push({score: score, name: name, lastName: lastName})
    }
  }
  
$.post('/addScore', { scores: scoresData }, function() {
    updateTable();
    $('#scoreForm')[0].reset();
  });
});

$('#addScoreButton').click(function() {
  addScoreInput();
});

updateTable();
});