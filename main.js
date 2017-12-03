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
    var radiusDefault = 0.4*clockElem.width;
    var thicknessDefault = (0.05)*clockElem.width;
    // Show minute clock
    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusDefault, 0.3*2*Math.PI, 0.45*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='#79BD9A'; // minutes?
    ctx.stroke();
    // Show second clock
    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusDefault, 0.87*2*Math.PI, 0.93*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='#CFF09E'; // seconds?
    ctx.stroke();
//    '0B486B' // shadow? dark blue
  }

};
