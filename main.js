window.onload = function(){

  // Visualize clock
  // Get canvas sizes
  var clockElem = document.getElementById('clockVis');
  // Display clock graphics
  var ctx = clockElem.getContext('2d');
  var center = {};
  center.x = Math.round(clockElem.width/2);
  center.y = Math.round(clockElem.height/2);
  console.log(center);
  // Show minute clock
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 1.5 * Math.PI);
  ctx.lineWidth=10;
  ctx.strokeStyle="#FF0000";
  ctx.stroke();
};
