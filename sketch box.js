// Create a canvas of given size
let angle = 0;

function setup() {
	createCanvas(600, 600, WEBGL);
}

// Create a draw function
function draw() {
	background(175);
	ambientLight(255);
	push();

	// Rotate the box in all dimensions
	//translate(mouseX - width / 2, mouseY - width / 2);
			
	//rotateX(angle);
	//rotateZ(angle * 0.03);
	//rotateY(angle * 0.06);
	//noStroke();
	//normalMaterial();

	// Create box of given size
	box(150, 150, 150);
	push();
	//angle += .06
}
