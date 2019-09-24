const canvas = document.getElementById("Main");
const c = canvas.getContext("2d");

var H = 400;
var W = 600;
var walls = [[100,100,100,50],[0,350,600,50],[0,300,100,50]];

var Keys = {"left":false, "right":false, "down":false, "up":false, "space":false};
document.addEventListener('keydown', function(event) {
        if(event.keyCode === 37 || event.keyCode === 65) 
        {
			Keys["left"] = true;
		}
        else if(event.keyCode === 39 || event.keyCode === 68) 
        {
			Keys["right"] = true;
		}
        else if(event.keyCode === 38 || event.keyCode === 87)
        {
			Keys["up"] = true;
		}
        else if(event.keyCode === 40 || event.keyCode === 83)
        {
			Keys["down"] = true;
		}
		else if(event.keyCode === 32){
			Keys["space"] = true;
		}
	}
);
document.addEventListener('keyup', function(event){
    if(event.keyCode === 37 || event.keyCode === 65) 
    {
		Keys["left"] = false;
	}
    else if(event.keyCode === 39 || event.keyCode === 68) 
    {
		Keys["right"] = false;
	}
    else if(event.keyCode === 38 || event.keyCode === 87)
    { 
		Keys["up"] = false;
	}
    else if(event.keyCode === 40 || event.keyCode === 83)
    {
		Keys["down"] = false;
	}
	else if(event.keyCode === 32){
		Keys["space"] = false;
	}
}
);
function AABBCollision(x1,y1,w1,h1,x2,y2,w2,h2){
    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2){
        return true;
    }else{
        return false;
    }
        
}
function drawRect(x,y,w,h,col){
    c.fillStyle = col;
    c.fillRect(x,y,w,h);
}
function drawCircle(x,y,r,col){
    c.fillStyle = col;
    c.beginPath();
    c.arc(x,y,r,0,360,false);
    c.closePath();
    c.fill();
}
function text(x,y,col,size,font){
    c.fillStyle = col;
    c.font = str(size) + " " + font;
    c.fillText(text,x,y);
}


class Player{
    constructor(){
        this.doathing = false;
        this.x = 100;
        this.y = 10;
        this.xv = 0;
        this.yv = 0;
        this.gravity = 0.1;
        this.drag = 0.1;
        this.grounded = true;
        this.jump = -4;
        this.w = 10;
        this.h = 10;
        this.color = "black";
    }
    draw(){
        drawRect(this.x,this.y,this.w,this.h,this.color);
        if (Keys["left"]){
            this.xv -= 0.5;
        }
        if (Keys["right"]){
            this.xv += 0.5;
        }
        if (Keys["space"] && this.grounded){
            this.yv = this.jump;
        }
        if (!Keys["space"] && this.yv < 0){
            this.yv *= 0.5;
        }
        this.xv -= this.xv * this.drag;
        this.yv += this.gravity;
        
        this.x += this.xv;
        for (var x = 0; x < walls.length; x++){
            if (AABBCollision(walls[x][0],walls[x][1],walls[x][2],walls[x][3],this.x,this.y,this.w,this.h)){
                this.xv = 0;
                if (this.x + this.w >= walls[x][0] + walls[x][2]){
                    this.x = walls[x][0] + walls[x][2];
                }else{
                    this.x = walls[x][0] - this.w;
                }
            }
        }
        this.y += this.yv;
        for (var x = 0; x < walls.length; x++){
            if (AABBCollision(walls[x][0],walls[x][1],walls[x][2],walls[x][3],this.x,this.y,this.w,this.h)){
                this.doathing = true;
                this.yv = 0;
                if (this.y + this.h >= walls[x][1] + walls[x][3]){
                    this.y = walls[x][1] + walls[x][3];
                }else{
                    this.y = walls[x][1] - this.h;
                }
            }
        }
        if (this.doathing){
            this.grounded = true;
            this.doathing = false;
        }else{
            this.grounded = false;
        }


    }
}
player = new Player();

function main(){
    drawRect(0,0,W,H,"white");
    for (var x = 0; x < walls.length; x++){
        drawRect(walls[x][0],walls[x][1],walls[x][2],walls[x][3],"black");
    }
    player.draw();

}



//------------------------//
setInterval(main, 1000/60);
//------------------------//


