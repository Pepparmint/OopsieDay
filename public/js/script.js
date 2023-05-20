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
    var score = $('#scoreInput').val();
    var name = $('#nameInput').val();
    var lastName = $('#lastNameInput').val();
    $.post('/addScore', { score: score, name: name, lastName: lastName }, function() {
      updateTable();
      $('#scoreInput').val('');
      $('#nameInput').val('');
      $('#lastNameInput').val('');
    });
  });

  updateTable();
});