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