// Change image on click

document.addEventListener('DOMContentLoaded', changeImage());

function changeImage() {
  document.getElementById('gram1').addEventListener('click', function(event) {
    document.getElementById('purchase-img-lrg').src = 'images/purchase/flea-market-67370_1920.jpg';
  });

  document.getElementById('gram2').addEventListener('click', function(event) {
    document.getElementById('purchase-img-lrg').src = 'images/purchase/gramophone-1721946_1920.jpg';
  });

  document.getElementById('gram3').addEventListener('click', function(event) {
    document.getElementById('purchase-img-lrg').src = 'images/purchase/gramophone-2290556_1920.jpg';
  });
}