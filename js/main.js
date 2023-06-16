const boxElm = document.createElement('div');
const crashElm=document.createElement('div');
const scoreElm=document.querySelector('#score span');
const gameOverElm=document.getElementById("game-over");
const btnStart=document.getElementById("btn-start");
boxElm.classList.add('box');
crashElm.classList.add('crash');

score=0;
document.body.append(boxElm);
document.body.append(crashElm);

let jump = false;
let run = false;
let idle=true;
let kill=true;
let dx = 0;

let apple=[];
let appleCount=10;
let xGap=10;

btnStart.addEventListener("click",()=>{
    location.reload();
})

class Apple{
    elm=document.createElement("div");
    width=80;
    height=this.width
    xCor=0;
    yCor=250;
    constructor(){
        this.elm.style.width=this.width+"px";
        this.elm.style.height=this.height+"px";
        this.elm.style.top=this.yCor+"px";
        this.elm.style.left=this.xCor+xGap+"px";
        xGap+=200;
        this.elm.style.position="absolute";
        this.elm.style.backgroundImage=`url('img/Jelly (1).png')`;
        this.elm.style.backgroundSize='cover';
        this.elm.style.backgroundPosition='center';
        // this.elm.style.border="1px solid black";
        document.body.append(this.elm);
    }
    eat(){
        let xCorBox=boxElm.offsetLeft;
        let yCorBox=boxElm.offsetTop;
        let radiBox=boxElm.offsetWidth/2;
        let radiApple=this.width/2;
        let xDiff=Math.abs((this.elm.offsetLeft + radiApple )- (xCorBox + radiBox));
        let yDiff=Math.abs((this.elm.offsetTop +radiApple)-(yCorBox + radiBox));
        if(yDiff<(radiApple+radiBox) && xDiff<(radiApple+radiBox)){
           this.elm.style.visibility="hidden";
           setTimeout(()=>{
           this.elm.style.visibility="visible";
           
        },1500);

        }

    }
    scoreCalculate(){
        let xCorBox=boxElm.offsetLeft;
        let yCorBox=boxElm.offsetTop;
        let radiBox=boxElm.offsetWidth/2;
        let radiApple=this.width/2;
        let xDiff=Math.abs((this.elm.offsetLeft + radiApple )- (xCorBox + radiBox));
        let yDiff=Math.abs((this.elm.offsetTop +radiApple)-(yCorBox + radiBox));
        if((yDiff<(radiApple+radiBox) && xDiff<(radiApple+radiBox))&& this.elm.style.visibility==="hidden"){
            score+=1;
            scoreElm.innerHTML=`${score}`;
        }
    }
}

document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space'){
        idle=false;
        jump = true;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
    }else if (eventData.code === 'ArrowRight'){
        boxElm.style.rotate=`y 0deg`;
        idle=false;
        run = true;
        dx = 2;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
    }else if (eventData.code === 'ArrowLeft'){
        boxElm.style.rotate=`y 180deg`;
        idle=false;
        run = true;
        dx = -2;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
        
    }
});


document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'ArrowRight'){
        idle=true;
        run = false;
        dx = 0;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
    }else if (eventData.code === 'ArrowLeft'){
        idle=true;
        run = false;
        dx = 0;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
    }else if(eventData.code==='Space' && run===false){
        idle=true;
        if(jump){
            apple.forEach(app=>{
                app.scoreCalculate();
            })
        }
    }
});

let angle = 0;
function doJump(){
    boxElm.style.width=150+"px";
    let y  = Math.cos(angle * (Math.PI / 180));
    y *= 3;
    boxElm.style.top = (boxElm.offsetTop - y) + "px";
    angle++;
    if (angle >  180){
        jump = false;
        angle = 0;  
    }
}

function doRun(){
    boxElm.style.width=150+"px";
    let x = boxElm.offsetLeft + dx;
    if ((x + boxElm.offsetWidth)> innerWidth) {
        x = innerWidth - boxElm.offsetWidth;
    }else if (x <= 0) x = 0;
    boxElm.style.left = `${x}px`;
}
function killDino(){
    let xCor=crashElm.offsetLeft;
    let yCor=crashElm.offsetTop;
    let xCorBox=boxElm.offsetLeft;
    let yCorBox=boxElm.offsetTop;
    let radi1=crashElm.offsetWidth/2;
    let radiBox=boxElm.offsetWidth/2;
    let xDiff=Math.abs((xCor + radi1 )- (xCorBox + radiBox));
    let yDiff=Math.abs((yCor+radi1)-(yCorBox+radiBox));
    if(xDiff < (radi1 + radiBox-50) && yDiff<(radi1+radiBox-50)){
        kill=true;
        boxElm.style.width=220+"px";
        boxElm.style.bottom=0+"px";
        crashElm.style.left=100+"px";
        crashElm.style.animationPlayState="paused";  
    }else{
        kill = false;
    } 
}

let i = 1;
let j=1;
let r=1;
let k=1;
function drawIdle(){
    boxElm.style.backgroundImage = `url('img/Idle (${i++}).png')`;
    if(i === 11) i = 1;
}
function drawJump(){
    boxElm.style.backgroundImage = `url('img/Jump (${j++}).png')`;
    if(j === 12) j = 1;
}
function drawRun(){
    boxElm.style.backgroundImage = `url('img/Walk (${r++}).png')`;
    if(r === 10) r = 1;
}
function drawKill(){
    boxElm.style.backgroundImage = `url('img/Dead (${k++}).png')`;
    if(k === 8){
        clearInterval(tmrId1);
        clearInterval(tmrId2);
    }
}

let tmrId2 = setInterval(()=> {
    killDino();
    if (!kill){
    if (jump){
        apple.forEach(app=>{
            app.eat();
        })
        doJump();
    }
    if (run){
        doRun();
    }
    }else{
        gameOverElm.style.visibility="visible";
    }
   
}, 5);

function movements(){
    if (kill){
        drawKill();
        return;
    }
    if(idle){
        drawIdle();
        return;
    }
    if(jump){
        drawJump();
        return;
    }
    if(run){
        drawRun();
        return;
    }

}

let tmrId1 = setInterval(()=>{
    movements();
},(1000/20));

for(let i=1;i<=10;i++){
    apple.push(new Apple());
}



