document.addEventListener('DOMContentLoaded', loadTable);
document.addEventListener('DOMContentLoaded', addRow);

document.addEventListener('DOMContentLoaded', startListening);
function startListening() {alert("PAGE HAS RELOADED")}

// Add row function
function addRow(){
  document.getElementById('updateSQL').addEventListener('click', function(event){
    event.preventDefault();

    // Make request
    var req = new XMLHttpRequest();
    var form = document.getElementById('workoutTable');
    var formData = new FormData(form);
    var reqBody = {};
    for (var pair of formData.entries()){
      reqBody[pair[0]] = pair[1];
    }

    req.open('POST', 'http://localhost:7431/', true);
    req.setRequestHeader("Content-type", "application/json");   
    req.send(reqBody);
  
    var response = req.responseText;

    // Table manipulation
    var table = document.getElementById('workouts');
    var row = table.insertRow();
    // Create cells per row
    for (j = 0; j <= 5; j++){
      var cell = row.insertCell();
      cell.style.width = '100px';
      cell.style.wordWrap = 'break-word';
      cell.style.overflowWrap = 'break-word';
      cell.contentEditable = 'true';
      cell.style.textAlign = 'center';
    }
    // Add a delete button that will delete the row on click
    var button = document.createElement('button');
    button.innerHTML = 'delete';
    deleteRow(button, row);
    cell.appendChild(button);
    row.style.border = '1px solid black';

    // Add button for editing row on click
    var button = document.createElement('button');
    button.innerHTML = 'edit';
    editRow(button, row);
    row.appendChild(button);
    row.style.border = '1px solid black'; 
  });
}

function loadTable(){
  // Make request
  var req = new XMLHttpRequest();
    
  req.open('GET', 'http://localhost:7431/', false);
  req.send(null);

  var response = req.responseText;
  console.log(response);
  // Table manipulation
  var table = document.getElementById('workouts');
  for (item in response[10]){
    var row = table.insertRow();
    // Create cells per row
    for (j = 0; j <= 5; j++){
      var cell = row.insertCell();
      cell.style.width = '100px';
      cell.style.wordWrap = 'break-word';
      cell.style.overflowWrap = 'break-word';
      cell.contentEditable = 'true';
      cell.style.textAlign = 'center';
    }
  // Add a delete button that will delete the row on click
  var button = document.createElement('button');
  button.innerHTML = 'delete';
  deleteRow(button, row);
  cell.appendChild(button);
  row.style.border = '1px solid black';

  // Add button for editing row on click
  var button = document.createElement('button');
  button.innerHTML = 'edit';
  editRow(button, row);
  row.appendChild(button);
  row.style.border = '1px solid black'; 
  }
}

// Add function to button
function deleteRow(button, row){
  button.addEventListener('click', function(event){
    event.preventDefault();
    
    // Add delete functionality
    var req = new XMLHttpRequest();

    req.open('DELETE', 'http://localhost:7431/', true);
    req.send(null);

    row.remove();
  });
}

function editRow(button, row){
  button.addEventListener('click', function(event){
    event.preventDefault();

    // PUT request to update SQL data + row data
    var req = new XMLHttpRequest();

    req.open('PUT', 'http://localhost:7431/', true); 
    req.send(null);

  });
}