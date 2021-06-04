
// Populate row with already existing data


// Add row function
function addRow(){
  
  // Table manipulation
  var table = document.getElementById('todo');
  var row = table.insertRow();
  
  // Create cells per row
  for (j = 0; j <= 4; j++){
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
  row.appendChild(button);
  row.style.border = '1px solid black';
}

function updateSQL(){

}

// Adds delete function to button
function deleteRow(button, row){
  button.addEventListener('click', function(event){
    event.preventDefault();
    row.remove();
  });
}