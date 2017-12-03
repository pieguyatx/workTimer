window.onload = function(){

  // Visualize clock
  // Get canvas sizes
  var clockElem = document.getElementById('clockVis');
  var clockContainer = document.getElementById('clockContainer');

  initializeCanvas();

  function initializeCanvas(){
    window.addEventListener('resize',resizeCanvas,false);
    resizeCanvas();
  }

  function resizeCanvas(){
    // position canvas
    clockElem.width = clockContainer.clientWidth;
    clockElem.height = clockContainer.clientWidth;
    var squareLength = clockElem.width.toString() + "px";
    clockContainer.style.height = squareLength;
    clockElem.style.width = squareLength;
    clockElem.style.height = squareLength;
    redrawCanvas();
  }

  function redrawCanvas(){
    // Display clock graphics
    var ctx = clockElem.getContext('2d');
    var center = {};
    center.x = Math.round(clockElem.width/2);
    center.y = Math.round(clockElem.height/2);
    console.log(center);
    // Show minute clock
    ctx.beginPath();
    ctx.arc(center.x, center.x, 100, 0.5*Math.PI, 1.0*Math.PI); // center, rad, start,end
    ctx.lineWidth=10; // thickness
    ctx.strokeStyle='#79BD9A'; // minutes?
    ctx.stroke();


    '0B486B' // hours?
  }

};
