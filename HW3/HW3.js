
function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    //slider variables
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;

    function draw() {
    	canvas.width = canvas.width;
    	// use the sliders to get the angles
    	var theta1 = slider1.value*0.005*Math.PI;
    	var phi1 = slider2.value*0.005*Math.PI;
      var phi2 = slider3.value*0.005*Math.PI;
      var stack = [mat3.create()]; // Initalize stack with identity on top

      function arc(x,y,r,sAngle,eAngle){
        var res=vec2.create();
        vec2.transformMat3(res,[x,y], stack[0]);
        context.arc(res[0],res[1],r,sAngle,eAngle);
      }

    	function circle(color) {
    	    context.beginPath();
    	    context.fillStyle = color;
          arc(0,0,20,0,2*Math.PI);
    	    context.closePath();
    	    context.fill();
    	}

      /* make sure you understand these
      var return mat3.create() -> new 3x3 matrix
      mat3.fromTranslation(mat3variable, [,]) -> new matrix from vector translation
      mat3.rotate(matrix to rotate, matrix to rotate, angle to rotate matrix by)
      mat3.multiply(reciving matrix, first operand, second operand)
      */

      //Candy bowl - background
      context.beginPath();
      context.lineWidth = 5;
      context.arc(179, 210, 60, 0, Math.PI); // x,y,r,sAngle,eAngle,counterclockwise
      context.stroke();
      context.closePath();

      //BLUE ball
      //stack.unshift(mat3.clone(stack[0])); // "save"
      var ballOne = mat3.create();
      mat3.fromTranslation(ballOne, [200,200]);
      mat3.rotate(ballOne,ballOne, theta1); //rotation AROUND
      mat3.multiply(stack[0],stack[0],ballOne);
      circle("#87D7F7");

      //ORANGE ball
      stack.unshift(mat3.clone(stack[0])); // "save"
      var ballTwo = mat3.create();
      mat3.fromTranslation(ballTwo, [45,0]);
      mat3.rotate(ballTwo, ballTwo, phi1); //rotation AROUND blue
      mat3.multiply(stack[0],stack[0],ballTwo);
      circle("#F7C487");

      //GREEN ball
      stack.unshift(mat3.clone(stack[0])); // "save"
    	var ballThree = mat3.create();
    	mat3.fromTranslation(ballThree,[45,0]);
    	mat3.rotate(ballThree,ballThree,phi2); //rotation AROUND black
    	mat3.multiply(stack[0],stack[0],ballThree);
      circle("#87F7C6");

      //PUEPLE ball
      stack.unshift(mat3.clone(stack[0])); // "save"
    	var ballFour = mat3.create();
    	mat3.fromTranslation(ballFour,[45,0]);
    	mat3.multiply(stack[0],stack[0], ballFour);
      circle("#C287F7");
      stack.shift();
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    draw();
}
window.onload = setup;
