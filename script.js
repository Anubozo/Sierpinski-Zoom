let t;
let maxDepth = 8;
scaleFactor = 1;
time = 1;
let triangles = [];
class Triangle{
    constructor(depth, parent,index){
        if(depth == 0){
            this.parent = null;
            this.length = 400;
            this.index = 0;
            this.point = [0,400*sin(Math.PI/3)];
            this.depth=0;
            this.children = [0,0,0];
        } else {
            this.parent = parent;
            this.length = parent.length/2;
            this.index =  index;
            this.point = [parent.point[0],parent.point[1]];
            this.depth= parent.depth+1;
            this.children = [0,0,0];
        }
        if(this.index==1){
            this.point[0]+=this.length;
        } else if(this.index ==2){
            this.point = [(2*this.point[0]+this.length)/2, this.point[1]-this.length*Math.sin(Math.PI/3)];
        }
        if(this.depth<maxDepth){
            this.children = [0,0,0];
            if(true){
                for(let i = 0; i < 3; i++){
                    this.children[i] = new Triangle(this.depth+1, this,i);
                    triangles.push(this.children[i]);
                }
            }
        }
    }
    display(){
        strokeWeight(1/this.depth/(time*time));
        stroke(255)
        fill(255,0,0,0);
        triangle(this.point[0],this.point[1],this.point[0]+this.length,this.point[1],(2*this.point[0]+this.length)/2, this.point[1]-this.length*Math.sin(Math.PI/3));
    }
}

function setup() {
    canvas = createCanvas(400, 400*sin(Math.PI/3));
    t = new Triangle(0, 0,0);
    triangles.push(t);
}

function draw() {
    time+=0.01;
    scaleFactor+= time*time/40;
    translate(-200*scaleFactor+200,0);
    scale(scaleFactor);
    background(0);
    for(let i = 0; i < triangles.length; i++){
        triangles[i].display();
    }
    if(scaleFactor>=2){
        scaleFactor = 1;
        time=1;
    }
}