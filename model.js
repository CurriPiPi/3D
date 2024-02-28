

function preload() {

}

function setup() {
  createCanvas(1900, 1000, WEBGL);
  describe('Vertically rotating 3-d teapot with red, green and blue gradient.');
}

function draw() {
  background(200);

  // If you execute the line commented out instead of next line, the direction of rotation
  // will be the direction the mouse or touch pointer moves, not around the X or Y axis.
  //orbitControl();
  orbitControl(2, 2, 2, {freeRotation: true});

  
  push();
  translate(0, 0, 0);
  fill(255, 114, 0, 177);
  box(200,200,1);
  pop();

  push();
  translate(-100, -100, 0); 
  fill(55, 0, 250, 127);	
  box(50,50,200);
  pop();

  push();
  translate(100, 100, 0);
  fill(255, 0, 200, 127);	
  box(10,10,20);	
  pop();

  push();
  fill(255, 0, 0, 127);

  // Set the stroke width  
    strokeWeight(1);  
      
    // Set the stroke 
    stroke('green'); 

  sphere(60,60,60,90);	
  pop();
}