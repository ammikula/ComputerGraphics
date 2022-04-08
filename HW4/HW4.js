function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 20;
    var slider3 = document.getElementById('slider3');
    slider3.value = 40;

    function draw() {
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var tParam = slider1.value*0.01;
    var tParam2 = slider2.value*0.01;
    var tParam3 = slider3.value*0.01;

      function arc(x,y,r,sAngle,eAngle,Tx){
         var res=vec2.create();
         vec2.transformMat3(res,[x,y],Tx);
         context.arc(res[0],res[1],r,sAngle,eAngle);
       }

	function moveToTx(loc,Tx){
    var res=vec2.create();
    vec2.transformMat3(res,loc,Tx);
    context.moveTo(res[0],res[1]);
  }

	function lineToTx(loc,Tx){
    var res=vec2.create();
    vec2.transformMat3(res,loc,Tx);
    context.lineTo(res[0],res[1]);
  }

	function drawCar(color,Tx) {

            context.beginPath();
      	    context.fillStyle = color;

            //body
      	    moveToTx([-.1,.2],Tx);
      	    lineToTx([-.1,-.2],Tx);
            lineToTx([.1,-.2],Tx);
            lineToTx([.1,.2],Tx);
      	    lineToTx([-.1,.2],Tx);
            context.closePath();
      	    context.fill();

            //wheels
            context.beginPath();
            context.fillStyle = "black";
            arc(-.10, .10, 7, 0, 2*Math.PI, Tx);
            context.closePath();
            context.fill();
            context.beginPath();
            arc(-.10, -.10, 7, 0, 2*Math.PI, Tx);
            context.closePath();
            context.fill();
            context.beginPath();
            arc(.10, -.10, 7, 0, 2*Math.PI, Tx);
            context.closePath();
            context.fill();
            context.beginPath();
            arc(.10, .10, 7, 0, 2*Math.PI, Tx);
            context.closePath();
            context.fill();
	}

  var Hermite = function(t) {
      return [
        2*t*t*t-3*t*t+1,
        t*t*t-2*t*t+t,
        -2*t*t*t+3*t*t,
        t*t*t-t*t
      ];
  }

  function Cubic(basis,P,t){
    var b = basis(t);
    var result=vec2.create();
    vec2.scale(result,P[0],b[0]);
    vec2.scaleAndAdd(result,result,P[1],b[1]);
    vec2.scaleAndAdd(result,result,P[2],b[2]);
    vec2.scaleAndAdd(result,result,P[3],b[3]);
    return result;
  }

    var p0=[0,0];
    var d0=[1,10];
    var p1=[3,1];
    var d1=[-1,3];
    var p2=[1,2];
    var d2=[0,3];

    var P0 = [p0,d0,p1,d1]; // First two points and tangents
    var P1 = [p1,d1,p2,d2]; // Last two points and tangents

    var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
    var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else {
            var u = t-1.0;
            return C1(u);
        }
    }

    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();

	}

    var Ttraj_to_canvas = mat3.create();
    mat3.fromTranslation(Ttraj_to_canvas, [50, 350]);
    mat3.scale(Ttraj_to_canvas,Ttraj_to_canvas,[100,-150]);

    drawTrajectory(0.0,1.0,200,C0,Ttraj_to_canvas,"brown");
    drawTrajectory(0.0,1.0,200,C1,Ttraj_to_canvas,"green");

    var Tblue_to_traj = mat3.create();
    mat3.fromTranslation(Tblue_to_traj,Ccomp(tParam));
    var Tblue_to_canvas = mat3.create();
    mat3.multiply(Tblue_to_canvas, Ttraj_to_canvas, Tblue_to_traj);
    drawCar("blue", Tblue_to_canvas);

    var Tyellow_to_traj = mat3.create();
    mat3.fromTranslation(Tyellow_to_traj,Ccomp(tParam2));
    var Tyellow_to_canvas = mat3.create();
    mat3.multiply(Tyellow_to_canvas, Ttraj_to_canvas, Tyellow_to_traj);
    drawCar("yellow", Tyellow_to_canvas);

    var Tgreen_to_traj = mat3.create();
    mat3.fromTranslation(Tgreen_to_traj,Ccomp(tParam3));
    var Tgreen_to_canvas = mat3.create();
    mat3.multiply(Tgreen_to_canvas, Ttraj_to_canvas, Tgreen_to_traj);
    drawCar("green", Tgreen_to_canvas);
  }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    draw();
}
window.onload = setup;
