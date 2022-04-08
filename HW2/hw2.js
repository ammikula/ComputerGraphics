/// .arc : https://www.w3schools.com/tags/canvas_arc.asp
// .ellipse : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse

function setup(){ "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = -50;
  var slider2 = document.getElementById('slider2');
  slider2.value = 50;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width; //restore
    var x1 = 1;
    var y1 = 1;
    var rX = 20;
    var rY = 30;
    var theta1 = slider1.value*0.005*Math.PI; //leftwing
    var theta2 = slider2.value*0.005*Math.PI; //rightwing

    function makeBee(){
      context.beginPath();
      //draw bee body
      context.fillStyle = 'yellow';
      context.lineWidth = 3;
      context.strokeStyle = 'black';
      context.ellipse(x1, y1, rX, rY, 0, 0, 2 * Math.PI); //x, y, radiusX, radiusY, rotation, startAngle, endAngle [, counterclockwise]);
      context.stroke();
      context.fill();
      context.closePath();

      //bee lines
      context.beginPath();
      context.moveTo(x1 - rX, y1);
      context.lineTo(x1 + rX, y1);
      context.moveTo(x1 - rX, y1 - rY/4);
      context.lineTo(x1 + rX, y1 - rY/4);
      context.moveTo(x1 - rX, y1 - rY/2);
      context.lineTo(x1 + rX, y1 - rY/2);
      context.moveTo(x1 - rX, y1 + rY/4);
      context.lineTo(x1 + rX, y1 + rY/4);
      context.moveTo(x1 - rX, y1 + rY/2);
      context.lineTo(x1 + rX, y1 + rY/2);
      context.stroke();

      //bee eyes
      context.beginPath();
      context.fillStyle = 'white';
      context.strokeStyle = 'black';
      context.lineWidth = 1;
      context.arc(x1 - rX/1.5, y1 - rY/1.25, 7, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
      context.fill();
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(x1 + rX/1.5, y1 - rY/1.25, 7, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
      context.fill();
      context.stroke();
      context.closePath();

      context.beginPath();
      context.fillStyle = 'black';
      context.arc(x1 - rX/1.5, y1 - rY/1.25, 2, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
      context.fill();
      context.stroke();
      context.closePath();

      context.beginPath();
      context.arc(x1 + rX/1.5, y1 - rY/1.25, 2, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
      context.fill();
      context.stroke();
      context.closePath();

      //and a smile of course!
      context.beginPath();
      context.arc(x1, y1 - rY/1.25, 5,0 * Math.PI, 1 * Math.PI); // x,y,r,sAngle,eAngle
      context.stroke();
      context.closePath();

    }

     function wing(){
      var angle1 = 1 * Math.PI;
      var angle2 = 0 * Math.PI;

      context.beginPath();
      context.fillStyle = 'white';
      context.lineWidth = 2;

      context.arc(x1 - rX, y1 - rY, rX, angle1, angle2); // x,y,r,sAngle,eAngle
      context.fill();
      context.stroke();
      context.moveTo(x1 - 2*rX, y1 - rY);
      context.lineTo(x1 - rX, y1);
      context.lineTo(x1, y1 - rY);
      context.lineTo(x1 - 2*rX, y1 - rY)
      context.stroke();
      context.fill();
      context.closePath();
    }

    context.translate(100, 100);
    makeBee();
    context.save(); //Top of stack

    context.rotate(theta1);
    wing(); //left wing
    context.restore();

    context.rotate(theta2);
    context.translate(40,0);
    wing(); //right wing
    context.save();

  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
