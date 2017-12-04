window.onload = function(){

  // Get canvas sizes
  var clockElem = document.getElementById('clockVis');
  var clockContainer = document.getElementById('clockContainer');

  // Visualize clock
  initializeCanvas();

  // Set timer according to settings buttons
  // Also stops and resets the timer
  initializeClock();

  // Start timer upon main button click
  // Also says if it's in the work/break stage as appropriate
  startClock();

  function startClock(){

  }

  function initializeClock(){
    var workStart = 25,
      breakStart = 5; // defaults
    // Listen for settings button clicks
    // work time
    var workInc = document.getElementById('work').getElementsByClassName('buttons')[0].getElementsByClassName('increase')[0];
    workInc.addEventListener("click",function(){
      increment(workInc);
    });
    var workDec = document.getElementById('work').getElementsByClassName('buttons')[0].getElementsByClassName('decrease')[0];
    workDec.addEventListener("click",function(){
      decrement(workInc);
    });
    // break time
    var breakInc = document.getElementById('break').getElementsByClassName('buttons')[0].getElementsByClassName('increase')[0];
    breakInc.addEventListener("click",function(){
      increment(breakInc);
    });
    var breakDec = document.getElementById('break').getElementsByClassName('buttons')[0].getElementsByClassName('decrease')[0];
    breakDec.addEventListener("click",function(){
      decrement(breakDec);
    });
    // Increment and decrement functions
    function increment(elem){
      console.log("Increment button pressed."); // DEBUG
      var oldNum = elem.parentElement.getElementsByClassName('number')[0].innerHTML;
      var newNum = (parseInt(oldNum)+1);
      elem.parentElement.getElementsByClassName('number')[0].innerHTML = newNum.toString();
      resetClock();
    }
    function decrement(elem){
      console.log("Decrement button pressed."); // DEBUG
      var oldNum = elem.parentElement.getElementsByClassName('number')[0].innerHTML;
      var newNum = (parseInt(oldNum)-1);
      newNum = (newNum>=0) ? newNum : 0;
      elem.parentElement.getElementsByClassName('number')[0].innerHTML = newNum.toString();
      resetClock();
    }
  }

  function resetClock(){
    // Set minutes
    document.getElementById('min').innerHTML = parseInt(document.getElementById('work').getElementsByClassName('buttons')[0].getElementsByClassName('number')[0].innerHTML);
    // Set seconds
    document.getElementById('sec').innerHTML = '00';
  }

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
    ctx.arc(center.x-0.04*center.x, center.y-0.04*center.y, radiusDefault, 0.3*2*Math.PI, 0.45*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='rgba(0,0,0,0.2)'; // shadow
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusDefault, 0.3*2*Math.PI, 0.45*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='#3B8686'; // minutes?
    ctx.stroke();
    // Show second clock
    ctx.beginPath();
    ctx.arc(center.x-0.06*center.x, center.y-0.06*center.y, radiusDefault, 0.87*2*Math.PI, 0.93*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='rgba(0,0,0,0.2)'; // shadow
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center.x, center.y, radiusDefault, 0.87*2*Math.PI, 0.93*2*Math.PI); // center, rad, start,end
    ctx.lineWidth=thicknessDefault;
    ctx.strokeStyle='#CFF09E'; // seconds?
    ctx.stroke();
  }

};
