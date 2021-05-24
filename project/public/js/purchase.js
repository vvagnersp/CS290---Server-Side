// Change image on click

document.addEventListener('DOMContentLoaded', changeImage());

function changeImage() {
  // Grab elements that will change (image and link)
  var img = document.getElementById('purchase-img-lrg');
  var imgAnc = document.getElementById('purchase-src');

  // Click event for image icons to update the large picture and source
  document.getElementById('gram1').addEventListener('click', function(event) {
    img.src = 'images/purchase/flea-market-67370_1920.jpg';
    imgAnc.href = 'https://pixabay.com/photos/gramophone-record-player-nostalgic-2290556/';
  });

  document.getElementById('gram2').addEventListener('click', function(event) {
    img.src = 'images/purchase/gramophone-1721946_1920.jpg';
    imgAnc.href = 'https://pixabay.com/photos/gramophone-turntable-color-music-1721946/';
  });

  document.getElementById('gram3').addEventListener('click', function(event) {
    img.src = 'images/purchase/gramophone-2290556_1920.jpg';
    imgAnc.href = 'https://pixabay.com/photos/gramophone-record-player-nostalgic-2290556/';
  });
}