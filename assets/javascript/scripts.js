//AntBall by: A.Napolitano 2/2/2018
//Scripty!
//and Nifty!

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
var myscore=-1000;
var mylives=3;
var event = window.event;
var bGameOver = false;
var gameinterval;
var paddletrigger = .9;
var aipaddlespeed = 2;
var AutoPlayerOn = false;

var cnt=0;

var xDown = null;                                                        
var yDown = null;                         
gamecontain.addEventListener('touchstart', handleTouchStart, false);        
gamecontain.addEventListener('touchmove', handleTouchMove, false);  
function isLandscape() {
  return (window.orientation === 90 || window.orientation === -90);
}                             
function isMobile ()
{
  var ret=false;
if (navigator.userAgent.match(/Android/i) ||
navigator.userAgent.match(/webOS/i) ||
navigator.userAgent.match(/iPhone/i) ||
navigator.userAgent.match(/iPad/i) ||
navigator.userAgent.match(/iPod/i) ||
navigator.userAgent.match(/BlackBerry/) || 
navigator.userAgent.match(/Windows Phone/i) || 
navigator.userAgent.match(/ZuneWP7/i)
) {
   // some code
   ret=true;
  }
  return ret;
}
function handleTouchStart(evt) {                                         
   /* mousex = evt.touches[0].clientX;                                      
   // mousey = evt.touches[0].clientY;*/                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    /*mousex = evt.touches[0].clientX;                                   
    
    mousey = evt.touches[0].clientY;*/                          
};

function handlemouse(event)
{
  
  mousex= +event.clientX;
  mousey= +event.clientY;
  
  

  if (isMobile()&&isLandscape()){
    paddle1y=(mousey-(146));
  }
  else
  {
    if (mousey<=378&&mousey>=99)
    {
      paddle1y=(mousey-(126));
    }
  }
  paddle1y=(mousey-(16));
  
  var score=document.getElementById("score");
  score.innerHTML="mousey: " + mousey;
}
function AutoPlayerTog()
{
  if(AutoPlayerOn===true)
  {
    AutoPlayerOn=false;
  }
  else
  {
    AutoPlayerOn=true;
  }
}
function StartBall ()
{
  Step();
  score();
  gameinterval = window.setInterval(Step,1);
  
}
function Step()
{
  cnt +=1;
  
  if(bGameOver)
  {
    clearInterval(gameinterval);
    return;
  }
  PlayerMove();

  BallAI();
  Paddle2AI(); 
  /*var score=document.getElementById("score");
  score.innerHTML="score: " + myscore;*/
  var lives=document.getElementById("lives");
  lives.innerHTML="lives: " + mylives;

}
function PlayerMove()
{ 
  var Pad1 = document.getElementById("paddle1");    
  Pad1.style = "left: " + paddle1x + "px; top: " + paddle1y + "px;";

  if (AutoPlayerOn)
  {Pad1.style = "left: " + paddle1x + "px; top: " + (balltp -25)  + "px;";}
  
}
function Paddle2AI()
{
  var Ball = document.getElementById("ball1");
  var Pad1 = document.getElementById("paddle2");
  var TopBall = +Ball.style.top.replace("px","");  
  var TopPad = +Pad1.style.top.replace("px","");
  if(Math.random() > paddletrigger){
    if((TopPad+25)<TopBall){
       TopPad += aipaddlespeed; 
    }else
    { TopPad -=aipaddlespeed;}}

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
    ColisionCoolDown = true;
    
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
       
  }
  if (bCollide(Pad2,Ball))  {
    balldeltalft *= -1;
      
  }

  balllft += balldeltalft * ballspeed;
  balltp += balldeltatp * ballspeed;
  
  
    
  Ball.style = "left: " + balllft + "px; top: " + balltp + "px;";

}
function score(){
  myscore = myscore + 1000;
  if (paddletrigger>=0)
  {
    if (myscore>5000)
    {
      aipaddlespeed = 2;
      paddletrigger = .8; 
      ballspeed = 1;
    }
    if (myscore>10000)
    {
      aipaddlespeed = 2.8;
      paddletrigger = .7;
      ballspeed = 2;
    }
    if (myscore>15000)
    {
      aipaddlespeed =2.8;
      paddletrigger = .6;
      ballspeed = 3;
    }
    if (myscore>30000)
    {
      aipaddlespeed =3;
      paddletrigger = .5;
      ballspeed = 4;
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
  
  
  if(balllft>320) {
    if(balldeltalft <0){
      return false;
    }
  }
  else{
    if(balldeltalft >=0){
      return false;
    }
  }
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