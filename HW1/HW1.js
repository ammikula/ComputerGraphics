// .arc : https://www.w3schools.com/tags/canvas_arc.asp

function setup(){ "use strict";
  var canvas = document.getElementById('myCanvas');

  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width; //restore

    var dx = slider1.value;
    var dy = slider2.value;

    function DrawBoarder(color) {
      context.strokeStyle=color;
      context.beginPath();

      // Boarder
      context.moveTo(200,0); // starting point from top right
      context.lineTo(0,0); //draw to top left
      context.lineTo(0,200); //draw down
      context.lineTo(200, 200); // draw to bottom right
      context.lineTo(200,0); // draw up

      context.stroke();
    }

    function DrawSnowman(){
      context.beginPath();

      //bottom ball
      context.fillStyle = '#87AAAE';
      context.arc(100, 180, 20, 0, 2*Math.PI); // x,y,r,sAngle,eAngle,counterclockwise
      context.stroke();
      context.fill();
      context.closePath();

      //middle ball
      context.beginPath();
      context.fillStyle = '#A1CACF';
      context.arc(100, 160, 15, 0, 2*Math.PI); // x,y,r,sAngle,eAngle,counterclockwise
      context.stroke();
      context.fill();
      context.closePath();

      //top ball
      context.beginPath();
      context.fillStyle = '#C3E6EA';
      context.arc(100, 145, 10, 0, 2*Math.PI); // x,y,r,sAngle,eAngle,counterclockwise
      context.stroke();
      context.fill();
      context.closePath();

      //left arm
      context.beginPath();
      context.strokeStyle = 'brown';
      context.moveTo(87.5, 155);
      context.lineTo(77.5, 145);
      context.stroke();
      //right arm
      context.moveTo(112.5, 155);
      context.lineTo(122.5, 145);
      context.stroke();
      context.closePath();

      //top hat
      //big part
      context.beginPath();
      context.fillStyle = 'black';
      context.moveTo(95, 120);
      context.lineTo(105, 120);
      context.lineTo(105, 135);
      context.lineTo(95, 135);
      context.fill();
      //brim
      context.moveTo(90, 135);
      context.lineTo(110, 135);
      context.lineTo(110, 140);
      context.lineTo(90, 140);
      context.closePath();
      context.fill();

      //carrot nose
      context.beginPath();
      context.fillStyle = 'orange';
      context.moveTo(100, 145);
      context.lineTo(100, 147);
      context.lineTo(105, 145);
      context.closePath();
      context.fill();
    }

    function DrawSnow(x,y){
      context.beginPath();
      context.fillStyle = '#D2E4E7';

      // randomaized snow to move with sliders
      for(let step = 0; step < 20; step++){
        context.moveTo(x,y);
        context.lineTo(x, y-6);
        context.lineTo(x+5, y-11);
        context.lineTo(x+13, y-11);
        context.lineTo(x+18, y-6);
        context.lineTo(x+18, y);
        context.lineTo(x+13, y+5);
        context.lineTo(x+5, y+5);
        context.fill();
        x = Math.floor(Math.random() * 200); //returns integer value <200
        y = Math.floor(Math.random() * 200);
      }

      context.closePath();
    }

    DrawBoarder("black");
    DrawSnowman();
    context.save(); // saving snowman and boarder to top of canvas stack
    context.translate(dx,dy); // translating for below objects
    DrawSnow(20,20);
    context.restore(); // restore to last save state from top of stack
  }

  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
