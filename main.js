window.onload = function(){

  // Visualize clock
  // Get canvas sizes
  var clockElem = document.getElementById('clockVis');
  var clock = {};
  clock.height = clockElem.clientHeight;
  clock.width = clockElem.clientWidth;
  // Display clock graphics
  var ctx = clockElem.getContext('2d');
  var center = {};
  center.x = Math.round(clock.width/2);
  center.y = Math.round(clock.height/2);
  
};
