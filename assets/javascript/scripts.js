var balllft=20;
var balltp=20;
var ballspeed=1;
var balldeltalft=-.6;
var balldeltatp=-.6;
var scrnheight=280;
var scrnwidth=640;
var paddle1x=20;
var paddle1y=100;
var mousex=0;
var mousey=0;
var myscore=0;
var mylives=3;
var event = window.event;
var bGameOver = false;
var gameinterval;
var paddletrigger = .9;
function handlemouse(event)
{
  mousex=event.clientX;
  mousey=event.clientY;
  if (mousey<461)
  {
  paddle1y=(mousey-220);}
}
function StartBall ()
{
  Step();
 
  gameinterval = window.setInterval(Step,1);
  
}
function Step()

{
  if(bGameOver)
  {
    clearInterval(gameinterval);
    return;
  }
  PlayerMove();

  BallAI();
  Paddle2AI(); 
  var score=document.getElementById("score");
  score.innerHTML="score: " + myscore;
  var lives=document.getElementById("lives");
  lives.innerHTML="lives: " + mylives;

}
function PlayerMove()
{
  var Pad1 = document.getElementById("paddle1");    
  Pad1.style = "left: " + paddle1x + "px; top: " + paddle1y + "px;";

}
function Paddle2AI()
{
  var Ball = document.getElementById("ball1");
  var Pad1 = document.getElementById("paddle2");
  var TopBall = +Ball.style.top.replace("px","");  
  var TopPad = +Pad1.style.top.replace("px","");
  if(Math.random() > paddletrigger){
    if((TopPad+25)<TopBall){
       TopPad += 2; 
    }else
    { TopPad -=2;}}

  Pad1.style = "left: 610px; top: " + TopPad + "px;";
}
function BallAI()
{
  
  if(balllft >= scrnwidth | balllft < 0 )
  {
    balldeltalft *= -1;
    if (balllft >= scrnwidth){
        score();
    }else{
        die();
    }
  }
  if(balltp >= scrnheight | balltp < 0 )
  {
    balldeltatp *= -1;
    
  }

  var Ball = document.getElementById("ball1");
  var Pad1 = document.getElementById("paddle1");
  var Pad2 = document.getElementById("paddle2");
  if (bCollide(Pad1,Ball))
  {
    balldeltalft *= -1;
    //balldeltatp *= -1;
  }
  if (bCollide(Pad2,Ball))
  {
    balldeltalft *= -1;
    //balldeltatp *= -1;
  }

  balllft += balldeltalft * ballspeed;
  balltp += balldeltatp * ballspeed;
  
  
    
  Ball.style = "left: " + balllft + "px; top: " + balltp + "px;";
  //Ball.style.left = balllft;
  //Ball.style.top = balltp;
}
function score(){
  myscore = myscore + 1000;
  if (paddletrigger>=0)
  {
    if (myscore>5000)
    {
      paddletrigger = .8; 
      ballspeed *= 1.05;
    }else
    if (myscore>10000)
    {
      paddletrigger = .6;
      ballspeed *= 1.05;
    }else
    if (myscore>15000)
    {
      paddletrigger = .2;
      ballspeed *= 1.05;
    }else
    if (myscore>30000)
    {
      paddletrigger = 0;
      ballspeed *= 1.05;
    }
  }
}
function die(){
  mylives = mylives -1;
  if(mylives <= 0)
  {
    gameover();
  }
}
function gameover(){
  bGameOver = true;
}
function bCollide(obj1,obj2)
{
  var ret = false;
 


  var obj1top = +obj1.style.top.replace("px","");  
  var obj1bottom = obj1top + +obj1.clientHeight;
  var obj1left = +obj1.style.left.replace("px","");
  var obj1right = obj1left + +obj1.clientWidth;

  var obj2top = +obj2.style.top.replace("px","");
  var obj2bottom = obj2top + +obj2.clientHeight;
  var obj2left = +obj2.style.left.replace("px","");
  var obj2right = obj2left + +obj2.clientWidth;

 
  if(
      (obj2top >= obj1top)&(obj2top <= obj1bottom)&
      (obj2left <= obj1right)&(obj2left >= obj1left)     
    ) 
    {
      ret = true;
    }

  return ret;
}