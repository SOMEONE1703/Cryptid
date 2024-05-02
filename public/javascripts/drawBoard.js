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
      "tiles/"+config[0]+".png",
      "tiles/"+config[1]+".png",
      "tiles/"+config[2]+".png",
      "tiles/"+config[3]+".png",
      "tiles/"+config[4]+".png",
      "tiles/"+config[5]+".png",
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
      "tiles/"+config[0]+".png",
      "tiles/"+config[1]+".png",
      "tiles/"+config[2]+".png",
      "tiles/"+config[3]+".png",
      "tiles/"+config[4]+".png",
      "tiles/"+config[5]+".png",
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

function transformString2(str) {

      var substr = str.toString().slice(6);
      var transformed = [];
      console.log(substr);
      for (var i = 0; i < substr.length; i++) {
          var char = substr[i];

          if (!isNaN(parseInt(char))) {
              transformed.push(parseInt(char));
          } else if (char === 'A') {
              transformed.push(10);
          } else if (char === 'B') {
              transformed.push(11);
          } else if (char === 'C') {
              transformed.push(12);
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
                col * cellSize.width - (index % 2 == 0 ? 0 : 12),
                row * cellSize.height - 25,
                cellSize.width,
                cellSize.height
              );
            } else if (index == 4 || index == 5) {
              ctx.drawImage(
                img,
                col * cellSize.width - (index % 2 == 0 ? 0 : 12),
                row * cellSize.height - 50,
                cellSize.width,
                cellSize.height
              );
            } else {
              ctx.drawImage(
                img,
                col * cellSize.width - (index % 2 == 0 ? 0 : 12),
                row * cellSize.height,
                cellSize.width,
                cellSize.height
              );
            }

            imagesLoaded++;
            if (imagesLoaded === imageUrls.length) {
              console.log("i passed")
              drawTowersAndShacks();
            console.log("now i'm here")}
          };
        });
      }

function drawTowersAndShacks() {
        // Draw towers and shacks on top of the board images
        // Example positions (8, 6) for towers and shacks
        console.log("I got this far");
        coordinates=transformString2(mapCodeValue);
        console.log(coordinates);
        if( coordinates.length==12){
          drawTower("tiles/s1.png", coordinates[0], coordinates[1]); // Replace "tower-image-url" with actual tower image URL
          drawTower("tiles/s2.png", coordinates[2], coordinates[3]); // Replace "tower-image-url" with actual tower image URL
          drawTower("tiles/s3.png", coordinates[4], coordinates[5]); // Replace "tower-image-url" with actual tower image URL
          drawShack("tiles/p1.png", coordinates[6], coordinates[7]); // Replace "shack-image-url" with actual shack image URL
          drawShack("tiles/p2.png", coordinates[8], coordinates[9]); // Replace "shack-image-url" with actual shack image URL
          drawShack("tiles/p3.png", coordinates[10], coordinates[11]); // Replace "shack-image-url" with actual shack image URL
        }
        else{
          drawTower("tiles/s1.png", coordinates[0], coordinates[1]); // Replace "tower-image-url" with actual tower image URL
          drawTower("tiles/s2.png", coordinates[2], coordinates[3]); // Replace "tower-image-url" with actual tower image URL
          drawTower("tiles/s3.png", coordinates[4], coordinates[5]); // Replace "tower-image-url" with actual tower image URL
          drawTower("tiles/s4.png", coordinates[6], coordinates[7]); // Replace "tower-image-url" with actual tower image URL
          drawShack("tiles/p1.png", coordinates[8], coordinates[9]); // Replace "shack-image-url" with actual shack image URL
          drawShack("tiles/p2.png", coordinates[10], coordinates[11]); // Replace "shack-image-url" with actual shack image URL
          drawShack("tiles/p3.png", coordinates[12], coordinates[13]); // Replace "shack-image-url" with actual shack image URL
          drawShack("tiles/p4.png", coordinates[14], coordinates[15]); // Replace "shack-image-url" with actual shack image URL
        }

       
    }
    
function drawTower(imgUrl, r, c) {
        var img = new Image();
        var tcellSize={
          width: (canvas.width-12)/12,
          height: c%2==0? (canvas.height-80)/9:(canvas.height-50)/9 
        }
        img.src = imgUrl;
        img.onload = function () {
          if(c%2==0) ctx.drawImage(img,  c *tcellSize.width+tcellSize.width/(6.0-(11-c)*0.15), r *tcellSize.height+tcellSize.height/(6.0-r*0.3), cellSize.width/9, cellSize.width/9);
          else ctx.drawImage(img,  c *tcellSize.width+tcellSize.width/(6.0-(11-c)*0.15), 30+r *tcellSize.height+0.7*tcellSize.height/(6.0+r*r*r), cellSize.width/9, cellSize.width/9);
        };
    }
    
function drawShack(imgUrl, r, c) {
        var img = new Image();
        var tcellSize={
          width:  (canvas.width-12)/12,
          height: c%2==0? (canvas.height-80)/9:(canvas.height-50)/9 
        }
        img.src = imgUrl;
        img.onload = function () {
            if(c%2==0 )ctx.drawImage(img,  c *tcellSize.width+tcellSize.width/(6.0-(11-c)*0.15), r *tcellSize.height+tcellSize.height/(6.0-r*0.3), cellSize.width/9, cellSize.width/9);
            else ctx.drawImage(img, c *tcellSize.width+tcellSize.width/(6.0-(11-c)*0.15), 30+r *tcellSize.height+0.7*tcellSize.height/(6.0+r*r*r), cellSize.width/9, cellSize.width/9);
        };
    }
      // Call the function to load images

      
    