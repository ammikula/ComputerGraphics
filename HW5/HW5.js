function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');

    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var context = cameraContext; // default to drawing in the camera window

    function draw() {
	    observerCanvas.width = observerCanvas.width;
	    cameraCanvas.width = cameraCanvas.width;

	    // use the sliders to get the angles
	    var tParam1 = slider1.value*0.01;
      var viewAngle = slider2.value*0.02*Math.PI;

      function arc(x,y,z,r,sAngle,eAngle,Tx){
         var res=vec3.create();
         vec3.transformMat4(res,[x,y,z],Tx);
         context.arc(res[0],res[1],r,sAngle,eAngle);
       }

	    function moveToTx(loc,Tx){
        var res=vec3.create();
        vec3.transformMat4(res,loc,Tx);
        context.moveTo(res[0],res[1]);
      }

	    function lineToTx(loc,Tx){
        var res=vec3.create();
        vec3.transformMat4(res,loc,Tx);
        context.lineTo(res[0],res[1]);}

	    function drawCar(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx, Tx, [scale, scale, scale]);
        context.beginPath();
        context.fillStyle = color;

        moveToTx([-.2,.1, .1],Tx);
        lineToTx([-.2,-.1, .1],Tx);
        lineToTx([-.2,-.1, -.1],Tx);
        lineToTx([-.2,.1, -.1],Tx);
        lineToTx([-.2,.1, .1],Tx);
        context.fill();

        moveToTx([.2,.1, .1],Tx);
        lineToTx([.2,-.1, .1],Tx);
        lineToTx([-.2,-.1, .1],Tx);
        lineToTx([-.2,.1, .1],Tx);
        lineToTx([.2,.1, .1],Tx);
        context.fill();

        moveToTx([.2,.1, .1],Tx);
        lineToTx([.2,-.1, .1],Tx);
        lineToTx([.2,-.1, -.1],Tx);
        lineToTx([.2,.1, -.1],Tx);
        lineToTx([.2,.1, .1],Tx);
        context.fill();

        moveToTx([.2,.1, -.1],Tx);
        lineToTx([.2,-.1, -.1],Tx);
        lineToTx([-.2,-.1, -.1],Tx);
        lineToTx([-.2,.1, -.1],Tx);
        lineToTx([.2,.1, -.1],Tx);
        context.fill();

        moveToTx([-.2,.1, .1],Tx);
        lineToTx([-.2,.1, -.1],Tx);
        lineToTx([.2,.1, -.1],Tx);
        lineToTx([.2,.1, .1],Tx);
        lineToTx([-.2,.1, .1],Tx);
        context.fill();

        moveToTx([-.2,-.1, .1],Tx);
        lineToTx([-.2,-.1, -.1],Tx);
        lineToTx([.2,-.1, -.1],Tx);
        lineToTx([.2,-.1, .1],Tx);
        lineToTx([-.2,-.1, .1],Tx);
        context.fill();
        context.closePath();

        //wheels
        context.fillStyle = "black";
        context.beginPath();
        arc(-.10, -.10, .1, 5, 0, 2*Math.PI, Tx);
        context.closePath();
        context.fill();

        context.beginPath();
        arc(.10, -.10, .1, 5, 0, 2*Math.PI, Tx);
        context.closePath();
        context.fill();

        context.beginPath();
        arc(-.10, -.10, -.1, 5, 0, 2*Math.PI, Tx);
        context.closePath();
        context.fill();

        context.beginPath();
        arc(.10, -.10, -.1, 5, 0, 2*Math.PI, Tx);
        context.closePath();
        context.fill();
	}

    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

	      context.beginPath();
        context.strokeStyle=color;

	      // Axes
	      moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);

        // Arrowheads
  	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
  	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);

  	    // X-label
  	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
  	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);

        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);

  	    // Z-label
  	    moveToTx([-.05,0,1.3],Tx);
  	    lineToTx([.05,0,1.3],Tx);
  	    lineToTx([-.05,0,1.4],Tx);
  	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}

  function drawCamera(color,TxU,scale) {
       var Tx = mat4.clone(TxU);
       mat4.scale(Tx,Tx,[scale,scale,scale]);
       context.beginPath();
       context.strokeStyle = color;
       // Twelve edges of a cropped pyramid
       moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
       lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
       moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
       lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
       moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
       lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
       moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
       lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
       context.stroke();
   }


    var Hermite = function(t) {
	    return [
    		2*t*t*t-3*t*t+1,
    		t*t*t-2*t*t+t,
    		-2*t*t*t+3*t*t,
    		t*t*t-t*t
    	    ];
    }

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}

  var p0=[0,0,0];
  var d0=[100,100,0];

  var p1=[100,100,0];
  var d1=[-100,200,0];

  var p2=[200,200,0];
  var d2=[200,300,0];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};

    var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else {
            var u = t-1.0;
            return C1(u);
        }
	}

    var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else {
            var u = t-1.0;
            return C1prime(u);
        }
	}

    var CameraCurve = function(angle) {
        var distance = 150.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(viewAngle);
        return [eye[0],eye[1],eye[2]];
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

     // Create Camera (lookAt) transform
     var eyeCamera = CameraCurve(viewAngle);
     var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
     var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
	   var TlookAtCamera = mat4.create();
     mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    // Create Camera (lookAt) transform
    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0,1,0); // Y-axis of world coords to be vertical
	  var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	  mat4.fromTranslation(Tviewport,[300,300,0]);  // Move the center of the transform

	  mat4.scale(Tviewport,Tviewport,[100,-100,1]);
    context = cameraContext;

    // Create Camera projection transform
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);

    // Create Observer projection transform
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);

    // Create transform t_VP_PROJ_CAM
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);

	  // Create model(ing) transform BLUE
    var Tmodel = mat4.create();
	  mat4.fromTranslation(Tmodel,Ccomp(tParam1));
    var tangent = Ccomp_tangent(tParam1);
    var angle = Math.atan2(tangent[1],tangent[0]);
	  mat4.rotateZ(Tmodel,Tmodel,angle);

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	  mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	  mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	  var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    // Draw the following in the Camera window
    context = cameraContext;
    draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"brown");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"green");
    drawCar("blue",tVP_PROJ_VIEW_MOD_Camera,100.0);

    // Draw the following in the Observer window
    context = observerContext;
	  draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"brown");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"green");
    drawCar("blue",tVP_PROJ_VIEW_MOD1_Observer,100.0);
	  drawCamera("blue",tVP_PROJ_VIEW_MOD2_Observer,10.0);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;
