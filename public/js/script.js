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
var scoreBoardData = [];

function addData(){
  var score = document.sample.score.value;
  var name = document.sample.name.value;
  var lastName = document.sample.lastName.value;

  var tr = document.createElement('tr');

  var td1 = tr.appendChild(document.createElement('td'));
  var td2 = tr.appendChild(document.createElement('td'));
  var td3 = tr.appendChild(document.createElement('td'));

  td1.innerHTML=score;
  td2.innerHTML=name;
  td3.innerHTML=lastName;

  document.getElementById("scoreTableBody").appendChild('tr');
}
});

/*

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
}); */