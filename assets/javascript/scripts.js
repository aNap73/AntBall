var balllft=0;
var balltp=0;
var balldeltalft=1;
var balldeltatp=1;
var scrnheight=280;
var scrnwidth=640;
var mousex=0;
var mousey=0;
var event = window.event;
function handlemouse(event)
{
  mousex=event.clientX;
  mousey=event.clientY;
}
function StartBall ()
{
  Step();
  window.setInterval(Step,1);

}
function Step()
{

  BallAI();
  var score=document.getElementById("score");
  score.innerHTML="mouse y: " + mousey;

}
function BallAI()
{
  
  if(balllft >= scrnwidth | balllft < 0 )
  {
    balldeltalft *= -1;
  }
  if(balltp >= scrnheight | balltp < 0 )
  {
    balldeltatp *= -1;
  }
  balllft += balldeltalft;
  balltp += balldeltatp;
  var Ball = document.getElementById("ball1");
  
    
  Ball.style = "left: " + balllft + "px; top: " + balltp + "px;";

}