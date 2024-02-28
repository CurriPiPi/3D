let canvas2D;

var easycam,
    state = {
      distance: 408,
      center  : [20, 0, 0],
      rotation: [-180, 0, 0, 1]
    };

let canvas;

let myDictionary = {};

let lights_on=false;
let idselected="";
let zoom=1;
let zoomx=1;
let zoomy=1;
let zoomz=1;

let colorpixelmouse;
let colorseleccion="0@255@0";

let sf = 1, tx = 0, ty = 0;
let angle=0;

//CURGEN:FUENTES
let word0001,word0002,word0003;


let techo=false;
let suelo=false;
let orbitControlEnable = true;

function preload() { 
	myDictionary["200@0@0"] = "ROJO CAJA";
	myDictionary["201@0@0"] = "CABLE ROJO CAJA";
	myDictionary["202@0@0"] = "CABLE VERDE CAJA";
	myDictionary["0@200@0"] = "VERDE CAJA";
	myDictionary["200@0@200"] = "FUCSIA CAJA";
} 


//***************************************************************************************************
function texto(x,y,z,dx,dy,dz,w,r,g,b,orientacion) {
//orientacion
//derecha
//arriba
//abajo

// texto
//mm/10, y es -
x= x/10.0;
y= -y/10.0;
z= z/10.0;
dx = dx /10.0;
dy = dy /10.0;
dz = dz /10.0;


    push();
    

if (orientacion=="arriba") 
{
    y=+y-dy/2-1;
    translate(x,y,z);
    rotateZ(-1.57); 
}

if (orientacion=="abajo") 
{
     y=+y+2;	
    translate(x,y,z);
    rotateZ(1.57); 
}

if (orientacion=="derecha") 
{  
    x=+x+dx/2+1;
    translate(x,y,z);	
    rotateZ(0); 
}

  
    fill(r,g,b);
    w.show();   
    pop();

}


p5.disableFriendlyErrors = true; // disables FES
//***************************************************************************************************
function setup() { 
canvas2D= createGraphics(100, 80);


canvas = createCanvas(1900, 800, WEBGL); 
canvas.mouseClicked(RatonClick);

setAttributes('antialias', true);

//CAM******************************
easycam=createEasyCam();
easycam.setState(state, 10); // animate to state in 1 second
easycam.state_reset = state;   // state to use on reset
document.oncontextmenu = function() { return false; }

orbitControlCheck = createCheckbox( "Enable Orbit Control", true); 
orbitControlCheck.position(20, 60);

sueloCheck = createCheckbox( "Suelo On", false); 
sueloCheck.position(20, 80); 

techoCheck = createCheckbox( "Techo On", false); 
techoCheck.position(20, 100); 

lightsCheck = createCheckbox( "Lights On", false); 
lightsCheck .position(20, 120); 

frameRate(60);

orbitControlCheck.changed(() => { 
	orbitControlEnable = !orbitControlEnable; 
});


sueloCheck.changed(() => { 
	suelo = !suelo; 
}); 

techoCheck.changed(() => { 
	techo = !techo; 
});

lightsCheck.changed(() => { 
	lights_on= !lights_on;
});

fuentes();
}

function fuentes() 
{
	word0001= new Word3D("M-CB3401",0,0.1,40,true,"Arial",NORMAL);
	word0002= new Word3D("M-CB3402",0,0.1,40,true,"Arial",NORMAL);
	word0003= new Word3D("M-CB3403",0,0.1,40,true,"Arial",NORMAL);

}





//*******************************************************************************************************************************
//entrada en mm
function local(x,y,z,dx,dy,dz,r,g,b,t,rotx,roty,rotz) {
let grosor=10
y=y-grosor
t=100
let mediaaltura=false
if (mediaaltura) dy=200

//light
pointLight(250, 0, 0, x/10, (-y+dy)/10, (-z)/10);

//suelo
caja(x,y,z,dx,grosor,dz,r,g,b,t,rotx,roty,rotz);

r=r+40
g=g+40
b=b+40
caja(x-dx/2+grosor/2,y+grosor,z,grosor,dy,dz,r,g,b,t,rotx,roty,rotz);
caja(x+dx/2-grosor/2,y+grosor,z,grosor,dy,dz,r,g,b,t,rotx,roty,rotz);

caja(x,y+grosor,z-dz/2+grosor/2,dx-2*grosor,dy,grosor,r,g,b,t,rotx,roty,rotz);
caja(x,y+grosor,z+dz/2-grosor/2,dx-2*grosor,dy,grosor,r,g,b,t,rotx,roty,rotz);
}

//*******************************************************************************************************************************
//entrada en mm
function caja(x,y,z,dx,dy,dz,r,g,b,t,rotx,roty,rotz) {
let temp = dy
dx = dx /10.0;
dy = dy /10.0;
dz = dz /10.0;

temp=y;
x= x/10.0;
y= -y/10.0-dy/2;
z= z/10.0;

push();
normalMaterial();
translate(x,y,z);
rotateY(roty);

if ((r + "@" + g + "@" + b)==idselected)
	fill(0, 255, 0, 255);
else
	fill(r, g, b, t);

stroke('black');
strokeWeight(0.2);
box(dx,dy,dz);  
pop();
}

//*******************************************************************************************************************************
//entrada en mm
function consola(x,y,z,dx,dy,dz,r,g,b,t,roty) {
var x0=+x;
x =+x*cos(roty)-z*sin(roty);
z =+x0*sin(roty)+z*cos(roty);

const altomesa=120;
const dxpata=200;
const dypata=400;
const dzpata =300;
var dypartesuperior=(+dy-dypata-altomesa);
var dzpartesuperior=+dz/5.0;
var dzbasetriangulo=100;
var altomonitor=180;

push();
rotateY(roty);

//patas
caja(x-dx/2.0+dxpata/2.0,y,z-dz/2+dzpata/2,dxpata,dypata,dzpata,r,g,b,t,0,0,0);
caja(x+dx/2.0-dxpata/2.0,y,z-dz/2+dzpata/2,dxpata,dypata,dzpata,r,g,b,t,0,0,0);


//mesa
caja(x,(+y+dypata),z,dx,altomesa,dz,r,g,b,t,0,0,0);

//parte superior
caja(x,0+y+dypata+altomesa,z-dz/2+dzpartesuperior/2,dx,dypartesuperior,dzpartesuperior,r,g,b,t,0,0,0);

//teclado
caja(x,+y+dypata+altomesa,z+80,360,7,150,190,190,190,255,0,0,0);

//raton
esfera(x+dx/2-60,+y+dypata+altomesa,z+80,30,170,170,180,255,0,0,0);

//monitor
caja(x,+y+dypata+altomesa+dypartesuperior/2-altomonitor/2,z-dz/2+ dzpartesuperior +dzbasetriangulo/2,360,150,22,10,10,10,255,0.37,0,0);
pop();


push();
rotateY(roty);


//quad ********************************************************************************************************
let temp = dy
dx = dx /10.0;
dy = dy /10.0;
dz = dz /10.0;

temp=y;
x= x/10.0;
y= -y/10.0;
z= z/10.0;

if ((r + "@" + g + "@" + b)==idselected)
	fill(0, 255, 0, 255);
else
	fill(r, g, b, t);

stroke('black');
strokeWeight(0.1);

quad(
x-dx/2,  y-dy,  z-dz/2+dzpartesuperior/10,
x-dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
x-dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
x-dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10,
);

quad(
x+dx/2,  y-dy,  z-dz/2+dzpartesuperior/10,
x+dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10,
x+dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
x+dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
);

quad(
x-dx/2,  y-dy,  z-dz/2+dzpartesuperior/10,
x-dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
x+dx/2,  y-dy+dypartesuperior/10,  z-dz/2+dzpartesuperior/10 + dzbasetriangulo/10,
x+dx/2,  y-dy,  z-dz/2+dzpartesuperior/10);
pop();

}

//*******************************************************************************************************************************
//vertical
function detector(x,y,z,radio,alto,r,g,b,t) {
let grosor=0.5;
let altocilindro;
temp=y;
radio= radio/10.0;
altocilindro=(alto-radio)/10.0;
alto= alto/10.0;

x= x/10.0;
y= -y/10.0-altocilindro/2;
z= z/10.0;





push();
normalMaterial();
translate(x,y,z);

if ((r + "@" + g + "@" + b)==idselected)
	fill(0, 255, 0, 255);
else
	fill(r, g, b, t);

//stroke('black');
//strokeWeight(0.01);
cylinder(radio, altocilindro,12,12); 


translate(0,altocilindro/2,0);
sphere(radio); 
pop();

}

//*******************************************************************************************************************************
function esfera(x,y,z,radio,r,g,b,t) {
let grosor=0.5;
temp=y;
x= x/10.0;
y= -y/10.0;
z= z/10.0;
radio= radio/10.0;

push();
normalMaterial();
translate(x,y,z);


if ((r + "@" + g + "@" + b)==idselected)
	fill(0, 255, 0, 255);
else
	fill(r, g, b, t);

stroke('gray');
strokeWeight(0.05);
sphere(radio);  
pop();

}

//*******************************************************************************************************************************
function linea(x,y,z,x1,y1,z1,dirx,diry,dirz,r,g,b,t) {
x=x/10
y=y/10
z=z/10
x1=x1/10
y1=y1/10
z1=z1/10



let grosor=0.5;
push();

if ((r + "@" + g + "@" + b)==idselected)
	fill(0, 255, 0, 255);
else
	fill(r, g, b, t);

if (dirx) {
translate(x+(x1-x)/2,y,z);
strokeWeight(0.01);
box(abs(x1-x),grosor,grosor);  
pop();
}

if (diry) {
translate(x,y,z+(z1-z)/2);
strokeWeight(0.01);
box(grosor,grosor,abs(z1-z));  
pop();
}

if (dirz) {
 translate(x,y+(y1-y)/2,z);
strokeWeight(0.01);
box(grosor,abs(y1-y),grosor);  
pop();
}

}

function conectar(x,y,z,x1,y1,z1,r,g,b,t) {
push();
var Ax,Ay,Bx,By;
linea(x,y,z,x,y,z1,0,1,0,r,g,b,t);
linea(x,y,z1,x,y1,z1,0,0,1,r,g,b,t);
linea(x1,y1,z1,x,y1,z1,1,0,0,r,g,b,t);



}

//*****************************************************************************************************************
function draw() { 


background(100,100,100);


 // scale(1);
  rotateY(angle);
//  normalMaterial();

//ambientMaterial(255,255,255); 
//noStroke();

translate(zoomx,zoomy,zoomz); 
scale(zoom);

// Enable default lights 
if (lights_on) {
lights(); 
directionalLight(20, 250, 250, -30, -20, -1);
}

// If checkbox is enabled 
if (orbitControlEnable) { 
	// Enable orbit control 
	//orbitControl(); 
} 

//grid
if (suelo) {
  for (let x=-12000; x < 12000; x +=1000){
    for (let z=-height; z < height; z +=1000){
      push();
     
      fill(220, 220, 248, 200);
      strokeWeight(0.2);
      // ground plane is XZ, not XY (front plane)
      translate(x, 102, z);  
      box(1000,1,1000);
      pop(); 
    }
  }
}



//x= ancho, y=alto z prof

//SI gira, x<->z
//(x=x, y=z, z=y dx, dz,dy)
caja   (-1000,0,2000    ,10 ,1800,10, 200,0,0,255,0,0,0);
caja   (1000,0,2000    ,10 ,1800,10, 200,0,0,255,0,0,0);
caja   (-1000,0,-2000    ,10 ,1800,10, 200,0,0,255,0,0,0);
caja   (1000,0,-2000    ,10 ,1800,10, 200,0,0,255,0,0,0);

caja   (0,0,0    ,12 ,1800,12, 0,255,0,255,0,0,0);
//giro
//caja   (0,0,0    ,400 ,800,400, 0,255,0,65,0,0.8,0);

caja   (1000,0,-2500    ,10 ,1800,10, 200,0,0,255,0,0,0);


//gira 90=1.57 rad
//-z,+x 
consola(-1000,0,2000    ,600,800,500,51, 51, 251,30,0);


consola(-1620,0,2000    ,600,800,500,51, 51, 251,30,0);
consola(-1620-620,0,2000    ,600,800,500,51, 51, 251,30,0);

consola(1000,0,2000    ,600,800,500,51, 51, 251,30,0.8);
consola(-1000,0,-2000   ,600,800,500,51, 51, 251,30,1.57);
consola(1000,0,-2000    ,600,800,500,51, 51, 251,30,1.57);


consola(1000,0,-2500    ,600,800,500,51, 141, 255,255,0);



caja(200,0,0  ,40,40,40, 200,0,0,255,0,0,0);
caja(400,200,0,40,40,40, 200,10,120,255,0,0,0);



//detector(300,500,0,20,20, 255,0,0,255,0,0,0);
//detector(500,500,50,20,60, 255,0,0,255,0,0,0);
//detector(800,500,80,20,100, 200,200,200,255,0,0,0);

// texto
//texto(300,500,0,40,20,20,   word0002,0,250,0, "arriba");


for (let i=-50; i<50;i++) {
for (let j=-50; j<50;j++) {
//caja(300+i*50,200,500+j*50  ,40,40,40, 200,0,0,255,0,0,0);
//detector(300+i*50,200,500+j*50 ,20,20, abs(i)+200,0,0,255,0,0,0);
//texto(300+i*50,200,500+j*50    ,40,20,20,   word0002,0,250,0, "arriba");
}
}

conectar(200,0,0,400,200,0, 201,0,0,255);




if (techo) {
//suelo
push();
fill(128, 128, 128, 150);
strokeWeight(0.2);
translate(0,0,0);
box(24000,2,6000); 
pop();

//suelo
push();
fill(128, 128, 128, 150);
strokeWeight(0.2);
translate(0,10000*0.01,0);
box(24000,2,6000); 
pop();

//suelo
push();
fill(128, 128, 128, 150);
strokeWeight(0.2);
translate(0,20000*0.01,0);
box(240000*0.01,2,60000*0.01); 
pop();
}


//local
//mamparo
push();
fill(224, 104, 124, 200);
strokeWeight(0.2);
translate(1,50,0);
//box(4,70,6000);
pop();

//mamparo
push();
fill(204, 104, 124, 200);
strokeWeight(0.2);
translate(-100,50,0);
//box(4,100,70);
pop();

//local 1
push();
fill(224, 224, 224, 150);
strokeWeight(0.2);
translate(-100,50,0);
//box(200,100,70);
pop();

//local 2
push();
fill(224, 224, 224, 150);
strokeWeight(0.2);
translate(102,50,0);
//box(196,100,70);
pop();


//techo
push();
normalMaterial();
translate(0,0,0);
fill(128, 128, 128, 150);
strokeWeight(0.2);
//box(400,2,70); 
pop();


local(0,0,0,6000,1000,6000,90,90,90,255,0,0,0);

angle += .0;

const paragraph = document.getElementById("info");
paragraph.innerHTML = frameRate();
} 

function RatonClick() {

const paragraph = document.getElementById("info");
colorpixelmouse = get(mouseX, mouseY);
let temp = red(colorpixelmouse) + "@" + green(colorpixelmouse) + "@" +blue(colorpixelmouse);

if (myDictionary[temp]==undefined && temp != colorseleccion)
{
idselected = temp;
paragraph.innerHTML = "-";

}
 
if (temp == colorseleccion) {

}

if (myDictionary[temp]!=undefined && temp !=colorseleccion) {
idselected = temp;
paragraph.innerHTML =  myDictionary[idselected];
}

}

function draw2D() {
  
    canvas2D.background(230, 20, 0,0);
    canvas2D.fill(0);
    canvas2D.textSize(5);
    textFont("Arial");
    canvas2D.text("*CUR",0,10);
    image(canvas2D, 20, -5);
}
