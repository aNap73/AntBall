var balllft=0;
var balltp=0;
var balldeltalft=1;
var balldeltatp=1;
function StartBall ()
{
  Step();
  window.setInterval(Step,1);

}
function Step()
{
  BallAI();
  

}
function BallAI()
{
  
  if(balllft >= 640 | balllft < 0 )
  {
    balldeltalft *= -1;
  }
  if(balltp >= 480 | balltp < 0 )
  {
    balldeltatp *= -1;
  }
  balllft += balldeltalft;
  balltp += balldeltatp;
  var Ball = document.getElementById('AIBall');
  
    
  Ball.style = "left: " + balllft + "px; top: " + balltp + "px;";

}