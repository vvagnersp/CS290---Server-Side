document.addEventListener('DOMContentLoaded', loadTable);
document.addEventListener('DOMContentLoaded', addRow);

// Target url
var url = 'http://localhost:7431/';

// GET request to load existing SQL table data
function loadTable(){
  // Make request
  var req = new XMLHttpRequest();
    
  req.open('GET', url);

  // Table manipulation
  req.onload = function(){
    var response = JSON.parse(req.responseText).results;
    
    // If there is data in the response, load it
    if (response.length !== 0){ 
      // Grab relevant keys from response object
      var majorKeys = Object.keys(response);
      var minorKeys = Object.keys(response[majorKeys[0]]);
      var table = document.getElementById('workouts');

      // Create a new table for each row with buttons for edit and delete
      for (key in majorKeys){
        var row = table.insertRow();
        // Create cells per row
        for (j = 0; j <= 5; j++){
          var cell = row.insertCell();
          var text = response[majorKeys[key]][minorKeys[j + 1]];
          // Fill text fields with sanitized info from database
          if (text == null) {
          cell.innerText = '';
          }
          else if (minorKeys[j + 1] == 'date') {
            text = String(text).slice(0, 10);
            cell.innerText = text;
          }
          else {
            cell.innerText = String(text);
          }
          cell.style.width = '100px';
          cell.style.wordWrap = 'break-word';
          cell.style.overflowWrap = 'break-word';
          cell.contentEditable = 'true';
          cell.style.textAlign = 'center';
        }
        // Add a delete button that will delete the row on click
        var button = document.createElement('button');
        button.innerHTML = 'delete';
        deleteRow(button, row, response[majorKeys[key]][minorKeys[0]]);
        cell.appendChild(button);
        row.style.border = '1px solid black';

        // Add button for editing row on click
        var button = document.createElement('button');
        button.innerHTML = 'edit';
        editRow(button, row, response[majorKeys[key]][minorKeys[0]]);
        row.appendChild(button);
        row.style.border = '1px solid black'; 
      }
    }
  }
  req.send(null);
}

// Add functionality to the 'update SQL' button to update SQL
// the browser table
function addRow(){
  document.getElementById('updateSQL').addEventListener('click', function(event){
    event.preventDefault();

    // Make request
    var req = new XMLHttpRequest();
    var form = document.getElementById('workoutTable');
    var formData = new FormData(form);
    var reqBody = {};
    for (var pair of formData.entries()){
      if (pair[1] == ""){
        reqBody[pair[0]] = null;
      }
      else{
        reqBody[pair[0]] = pair[1];
      }
    }
    
    req.open('POST', url, true);
    req.setRequestHeader("Content-type", "application/json");   

    // Add to table when response is received
    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);

        // Table manipulation
        var table = document.getElementById('workouts');
        var row = table.insertRow();
        var keys = Object.keys(reqBody);

        // Create cells per row
        for (j = 0; j <= 5; j++){
          var cell = row.insertCell();
          cell.innerText = reqBody[keys[j]];
          cell.style.width = '100px';
          cell.style.wordWrap = 'break-word';
          cell.style.overflowWrap = 'break-word';
          cell.contentEditable = 'true';
          cell.style.textAlign = 'center';
        }
        // Add a delete button that will delete the row on click
        var button = document.createElement('button');
        button.innerHTML = 'delete';
        cell.innerText = '';
        cell.contentEditable = 'false';
        deleteRow(button, row, response['results']);
        cell.appendChild(button);
        row.style.border = '1px solid black';

        // Add button for editing row on click
        var button = document.createElement('button');
        button.innerHTML = 'edit';
        editRow(button, row, response['results']);
        row.appendChild(button);
        row.style.border = '1px solid black'; 
      };
    });
    req.send(JSON.stringify(reqBody));
  });
}

// Add function to button
function deleteRow(button, row, uniqueId){
  button.addEventListener('click', function(event){
    
    // Send delete request
    var req = new XMLHttpRequest();
    req.open('DELETE', url);
    req.setRequestHeader("Content-type", "application/json");   

    // Remove table from webpage on response
    req.addEventListener('load', function(){
      if (req.status >= 200 && req.status < 400){
        row.remove();
      };
    });
    payload = JSON.stringify({id: uniqueId});
    req.send(payload);
  });
}

// Add edit function to button 
function editRow(button, row, uniqueId){
  button.addEventListener('click', function(event){
    event.preventDefault();
    
    // Grab current data from cells
    var payload = {
      id: "",
      name: "",
      reps: "",
      weight: "",
      date: "",
      unit: ""
    }
    // Create the payload
    payload['id'] = uniqueId;
    keys = Object.keys(payload);
    var data = row.getElementsByTagName('td');
    for (var i = 1; i < 6; i++){
      data[i - 1].innerText = data[i - 1].innerText.replace(/\n|\r/g, ''); // sanitize string
      if (data[i - 1].innerText == ""){
        payload[keys[i]] = null;
      }
      else{
        payload[keys[i]] = data[i - 1].innerText;
      }
    }

    // PUT request to update SQL data + row data
    var req = new XMLHttpRequest();

    req.open('PUT', url, false); 
    req.setRequestHeader("Content-type", "application/json");   
    req.send(JSON.stringify(payload));
  });
}
