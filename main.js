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
  ctx.arc(center.x, center.x, 100, 0.5*Math.PI, 1.0*Math.PI); // center, rad, start,end
  ctx.lineWidth=10; // thickness
  ctx.strokeStyle='#79BD9A';
  ctx.stroke();


  '0B486B'
};
