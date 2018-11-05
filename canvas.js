var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


canvas.addEventListener("touchstart", function(e) {
    var touch = e.touches[0];
    console.log(touch.clientX,touch.clientY);
    touchCircle.update(touch,"start");

});
canvas.addEventListener("touchend", function (e) {
    touchCircle.radius = touchCircle.radius*(1/1.2);
  });
  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    console.log(touch.clientX,touch.clientY);
    touchCircle.update(touch,"move");
  });



function Square(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;

    var scale = 1;
    var direction = 1;

    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(this.x,this.y, 150*scale, 150*scale);
    }
    this.update = function() {
        if (scale > 1.5 || scale < 1) {
            direction = -direction;
        }
        scale += .01*direction;
    }
}
function Circle(x,y,radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius,0,Math.PI*2,false);
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.stroke();
        c.fill();
    }
    this.update = function(touch,status) {
        if(Math.abs(touch.clientX - this.x)<150){
            switch(status) {
                case "start":
                    console.log("got me!");
                    touchCircle.radius = touchCircle.radius*1.2;
                    break;
                case "move":
                    touchCircle.x = touch.clientX;
                    touchCircle.y = touch.clientY;
                    break;
            }
        }
    }
}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    squareRed.draw();
    squareBlue.draw();
    squareGreen.draw();

    squareRed.update();

    touchCircle.draw();

}


var squareRed = new Square(.15 * innerWidth, .20*innerHeight,"#ff0000bb");
var squareBlue = new Square(.45 * innerWidth, .7*innerHeight, "#0000ffbb");
var squareGreen = new Square(.65 * innerWidth, .40*innerHeight,"#00ff00bb");

var touchCircle = new Circle(.70*innerWidth, .1*innerHeight,200,"#ff00ffbb");


var scale = 1;
var direction = 1;

animate();