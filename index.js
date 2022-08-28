let speed=1;
let BallSpeedX;
let BallSpeedY;
RandSpeed();

let width;
let height;
let score=0;

let setup=document.createElement("div");
setup.setAttribute("style","position: fixed");
let H1score=document.createElement("h1");
H1score.setAttribute("style","position: fixed; margin-left:10px;");

let canvas=document.createElement("canvas");
canvas.setAttribute("id","canvas");
canvas.setAttribute("style","border-style: inset;position: absolute; border-width:10px; border-color:blue;");

canvas.setAttribute("width",getComputedStyle(setup).width);
canvas.setAttribute("height",getComputedStyle(setup).height);

setup.appendChild(H1score);
setup.appendChild(canvas);
document.body.appendChild(setup);

let ctx = canvas.getContext('2d');

const ball={
    posX:0.45,
    posY:0.45,
    radius:0.05
};
const palet={
        posX:0.375,       
        posY:0.85,
        scaleX:0.25,
        scaleY:0.1,
};
alert("press enter to start!!");    


async function run(){
    setup.setAttribute("height","auto"/*document.documentElement.scrollHeight*/);
    setup.setAttribute("width",document.documentElement.scrollWidth);
    let divScale=getComputedStyle(setup);
    canvas.setAttribute("height","700"/*parseInt(divScale.height.substring(0, divScale.height.length -2))*/);
    canvas.setAttribute("width",document.documentElement.scrollWidth-30);
    width=getComputedStyle(canvas).width;
    height=getComputedStyle(canvas).height;
    H1score.textContent="score:"+score.toString();
    width=parseInt(width.substring(0, width.length -2));
    height=parseInt(height.substring(0, height.length -2));

    Mball();
    document.onkeydown = function(e) {
        key=e.keyCode;
        if(key==65||key==81 ||key==37){
            if(palet.posX>0){
                palet.posX-=0.02;
            }
        }
        else if(key==68 || key==39){
            if(palet.posX+palet.scaleX<=1){
                palet.posX+=0.02;
            }
        }
    }

    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.rect(palet.posX*width,palet.posY*height,palet.scaleX*width,palet.scaleY*height);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(ball.posX*width,ball.posY*height,ball.radius*height,0.1,false);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}
function Mball(){
    let move=0.001;
    let Xmove=ball.posX+move*BallSpeedX;
    let Ymove=ball.posY+move*BallSpeedY;
    if (Xmove-ball.radius*0.5<=0 || Xmove+ball.radius*0.5>=1){
        
        BallSpeedX*=-1;
        ball.posX=ball.posX+move*BallSpeedX;
    }
    else{
        ball.posX=Xmove;
    }
    if (Ymove-ball.radius <=0){
        
        BallSpeedY*=-1;
        ball.posY=ball.posY+move*BallSpeedY;
    }
    else if(Ymove+ball.radius >=1){
        score=0;
        ball.posY=0.45;
        ball.posX=0.45;
        RandSpeed();
        speed=1;
        alert("Game Over");
    }
    else{
        ball.posY=Ymove;
    }
    if(ball.posY+ball.radius>=palet.posY && (ball.posX>= palet.posX && ball.posX <= palet.posX+palet.scaleX)){
        if(BallSpeedX<0){
            RandSpeed();
            BallSpeedX=Math.abs(BallSpeedX)*-1*speed;
        }
        else{
            RandSpeed();
            BallSpeedX=Math.abs(BallSpeedX)*speed;
        }
        BallSpeedY=(Math.abs(BallSpeedY)*-1)*speed;
        score+=1;
        speed*=1.5;
    }
    Xmove=Math.round(Xmove*1000)/1000;
    Ymove=Math.round(Ymove*1000)/1000;
}
function RandSpeed(){
    BallSpeedX=(Math.random()*4)-2;
    BallSpeedY=(Math.random()*4)-2;
    while(Math.abs(BallSpeedY)<1){
        BallSpeedY=(Math.random()*4)-2;
    }
    

}
setInterval(run,20);