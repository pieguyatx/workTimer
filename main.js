window.onload = function(){

  // Visualize clock
  var clockElem = document.getElementById('clockVis');
  var clock = {};
  clock.height = clockElem.style.width;

  var c=document.getElementById('clockVis');
  var ctx=c.getContext('2d');
  var grd=ctx.createRadialGradient(75,50,5,90,60,100);
  grd.addColorStop(0,"rgba(0,0,0,0.5)");
  grd.addColorStop(1,"rgba(0,0,0,0)");

  // Fill with gradient
  ctx.fillStyle=grd;
  ctx.fillRect(10,10,150,100);
};
