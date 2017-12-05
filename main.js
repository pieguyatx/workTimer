window.onload = function(){

  // Initialize clock elements, variables
  var clockElem = document.getElementById('clockVis');
  var clockContainer = document.getElementById('clockContainer');
  var session = document.getElementById('session');
  var clockId; // ID for setInterval timer function later
  var state = {}; // default state of clock
  state.session = "work";
  state.counting = false;
  state.workDefault = 25;
  state.breakDefault = 5;

  // Visualize clock
  initializeCanvas();

  // Set timer according to settings buttons
  // Also stops and resets the timer
  initializeClock();

  function initializeClock(){
    // Listen for settings button clicks
    adjustSettings();
    // Listen for main button click, to start/stop timer
    // Also says if it's in the work/break stage as appropriate
    startClock();
    // Start or stop the clock appropriately
    function startClock(){
      // Listen for click of clock buttons to start
      var clockButton = document.getElementById('clockContainer');
      var min = document.getElementById('min');
      var sec = document.getElementById('sec');
      console.log(state.counting);
      clockButton.addEventListener('click',function(){
        // If not already counting, start counting down
        if(state.counting===false){
          alertSessionChange(state.session);
          state.counting = true;
          clockId = setInterval(function(){
            // Get current time
            var numSec = parseInt(sec.innerHTML);
            var numMin = parseInt(min.innerHTML);
            // Update time on clock visualization
            redrawCanvas(numMin,numSec)
            // Adjust seconds & minutes
            numSec--;
            if(numSec<0){ // seconds have passed zero
              if(numMin===0){ // timer ending
                numSec = 0;
                sec.innerHTML = '00'; // reset seconds
                // switch session clocks
                var newMin;
                if(state.session==='work'){
                  state.session = 'break';
                  session.innerHTML = 'on break';
                  newMin = parseInt(document.getElementById('break').getElementsByClassName('buttons')[0].getElementsByClassName('number')[0].innerHTML);
                }
                else if(state.session==='break'){
                  state.session = 'work';
                  session.innerHTML = 'to work';
                  newMin = parseInt(document.getElementById('work').getElementsByClassName('buttons')[0].getElementsByClassName('number')[0].innerHTML);
                }
                // alert user of session switch
                alertSessionChange(state.session);
                console.log(newMin); // DEBUG
                min.innerHTML = newMin; // reset minutes
              }
              else{ // timer still going
                console.log("Minute passed..."); //DEBUG
                numSec=59;
                numMin--;
                if(numMin<0){numMin=0;}
                sec.innerHTML = numSec;
                min.innerHTML = numMin;
              }
            }
            else{ // seconds have not yet passed zero
              numSec = numSec.toString();
              if(numSec.length<2){
                numSec = "0" + numSec;
              }
              sec.innerHTML = numSec;
              min.innerHTML = numMin;
            }
          },1000);
        }
        // If already counting, stop counting
        else if(state.counting===true){
          resetClock();
        }
      });
      function alertSessionChange(newSession){
        session.classList.add('tempGlow');
        document.getElementById(newSession).classList.add('tempGlow');
        var glowId = setInterval(function(){
          clearInterval(glowId); // stop the clock`
          session.classList.remove('tempGlow');
          document.getElementById(newSession).classList.remove('tempGlow');
        },5100);
      }
    }
    // Set clock start settings
    function adjustSettings(){
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
    }
    // Increment and decrement functions
    function increment(elem){
      console.log("Increment button pressed."); // DEBUG
      var oldNum = elem.parentElement.getElementsByClassName('number')[0].innerHTML;
      var newNum = (parseInt(oldNum)+1);
      newNum = (newNum<=60) ? newNum : 60; // maximum 60 min
      elem.parentElement.getElementsByClassName('number')[0].innerHTML = newNum.toString();
      resetClock();
    }
    function decrement(elem){
      console.log("Decrement button pressed."); // DEBUG
      var oldNum = elem.parentElement.getElementsByClassName('number')[0].innerHTML;
      var newNum = (parseInt(oldNum)-1);
      newNum = (newNum>=1) ? newNum : 1; // minimum 1 min
      elem.parentElement.getElementsByClassName('number')[0].innerHTML = newNum.toString();
      resetClock();
    }
  }

  function resetClock(){
    // Set minutes
    var newMin = parseInt(document.getElementById('work').getElementsByClassName('buttons')[0].getElementsByClassName('number')[0].innerHTML);
    document.getElementById('min').innerHTML = newMin;
    // Set seconds
    document.getElementById('sec').innerHTML = '00';
    // Stop timer
    clearInterval(clockId);
    state.session = 'work';
    state.counting = false;
    session.innerHTML = 'to work';
    redrawCanvas(newMin,0); // redraw clock
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
    redrawCanvas(state.workDefault,0); // default graphics
  }

  // function to visualize minutes & seconds
  function redrawCanvas(min,sec){
    // Define canvas context
    var ctx = clockElem.getContext('2d');
    // Clear canvas
    ctx.clearRect(0,0,clockElem.width,clockElem.height);
    // Initialize clock graphics
    var center = {};
    var minRad = 0.37*clockElem.width, // percentage of clock container width
      minThick = 0.07*clockElem.width,
      secRad = 0.35*clockElem.width,
      secThick = 0.05*clockElem.width;
    center.x = Math.round(clockElem.width/2);
    center.y = Math.round(clockElem.height/2);
    // Show minute clock
    var minStart = -0.25;
    var minEnd = min/60-0.25;
    ctx.beginPath();
    ctx.arc(center.x-0.02*center.x, center.y-0.02*center.y, minRad, minStart*2*Math.PI, minEnd*2*Math.PI, false); // center, rad, start,end
    ctx.lineWidth=minThick*1.3;
    ctx.strokeStyle='rgba(0,0,0,0.2)'; // shadow
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center.x, center.y, minRad, minStart*2*Math.PI, minEnd*2*Math.PI, false); // center, rad, start,end
    ctx.lineWidth=minThick;
    ctx.strokeStyle='#3B8686'; // minutes?
    ctx.stroke();
    // Show second clock
    var secStart = sec/60 - 0.06/2 - 0.25;
    var secEnd = secStart + 0.06;
    ctx.beginPath();
    ctx.arc(center.x-0.06*center.x, center.y-0.06*center.y, secRad*.95, secStart*2*Math.PI, secEnd*2*Math.PI, false); // center, rad, start,end
    ctx.lineWidth=secThick*1.5;
    ctx.strokeStyle='rgba(0,0,0,0.2)'; // shadow
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(center.x, center.y, secRad, secStart*2*Math.PI, secEnd*2*Math.PI, false); // center, rad, start,end
    ctx.lineWidth=secThick;
    ctx.strokeStyle='#CFF09E'; // seconds?
    ctx.stroke();
  }

};
