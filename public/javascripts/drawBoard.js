var mapCodeValue=0, config=0, canvas, ctx, gridSize, cellSize, imageUrls;

function drawIt(path){
  fetch(path)
  .then(response => response.json())
  .then(data => {
    //console.log('Here');
      mapCodeValue = data.mapCode;
      config = transformString(mapCodeValue);
     
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");

      // Define the grid layout
      gridSize = { rows: 3, cols: 2 };
      cellSize = {
      width: canvas.width / gridSize.cols,
      height: canvas.height / gridSize.rows,
    };

    // List of image URLs
      imageUrls = [
      "/tiles/"+config[0]+".png",
      "/tiles/"+config[1]+".png",
      "/tiles/"+config[2]+".png",
      "/tiles/"+config[3]+".png",
      "/tiles/"+config[4]+".png",
      "/tiles/"+config[5]+".png",
    ];

    loadImages();
  })
  .catch(error => console.error('Error fetching JSON:', error));
}

function drawIt2(str){
  config = transformString(str);
     
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");

      // Define the grid layout
      gridSize = { rows: 3, cols: 2 };
      cellSize = {
      width: canvas.width / gridSize.cols,
      height: canvas.height / gridSize.rows,
    };

    // List of image URLs
      imageUrls = [
      "/tiles/"+config[0]+".png",
      "/tiles/"+config[1]+".png",
      "/tiles/"+config[2]+".png",
      "/tiles/"+config[3]+".png",
      "/tiles/"+config[4]+".png",
      "/tiles/"+config[5]+".png",
    ];

    loadImages();
}


function transformString(str) {

        var substr = str.toString().slice(0,6);
        var transformed = [];
        console.log(substr);
        for (var i = 0; i < substr.length; i++) {
            var char = substr[i];

            if (!isNaN(parseInt(char))) {
                transformed.push(parseInt(char) - 1);
            } else if (char === 'A') {
                transformed.push(9);
            } else if (char === 'B') {
                transformed.push(10);
            } else if (char === 'C') {
                transformed.push(11);
            }
        }
        return transformed;
    }

      // Function to load images onto the canvas
function loadImages() {
        var imagesLoaded = 0;

        imageUrls.forEach(function (url, index) {
          var img = new Image();
          img.src = url;
          img.onload = function () {
            var row = Math.floor(index / gridSize.cols);
            var col = index % gridSize.cols;

            if (index == 2 || index == 3) {
              ctx.drawImage(
                img,
                col * cellSize.width - (index % 2 == 0 ? 0 : 10),
                row * cellSize.height - 20,
                cellSize.width,
                cellSize.height
              );
            } else if (index == 4 || index == 5) {
              ctx.drawImage(
                img,
                col * cellSize.width - (index % 2 == 0 ? 0 : 10),
                row * cellSize.height - 40,
                cellSize.width,
                cellSize.height
              );
            } else {
              ctx.drawImage(
                img,
                col * cellSize.width - (index % 2 == 0 ? 0 : 10),
                row * cellSize.height,
                cellSize.width,
                cellSize.height
              );
            }

            imagesLoaded++;
            //if (imagesLoaded === imageUrls.length) {console.log("All images loaded.");}
          };
        });
      }

      // Call the function to load images
     