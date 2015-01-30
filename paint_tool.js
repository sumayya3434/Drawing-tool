var mouseX,mouseY,currentX,currentY,startX,startY,endX,endY = 0;
var rect;
var width,height;
var dragging;
var color="black";
var z =2 ;
var canvas,ctx,paint = false;
var spointX,spointY,epointX,epointY;

function init()
{
	
    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	canvas.width= 500;
	canvas.height= 500;
	canvas.style.width='500px';
	canvas.style.height='500px';
	w = canvas.width;
    h = canvas.height;

	canvas.addEventListener("mousedown",down ,false);
	canvas.addEventListener("mouseup",up,false);
	
	canvas.addEventListener("mouseout",out,false);
  
  


}
function down(e)
{
   canvas.addEventListener("mousemove",move,false);
   paint=true;
 
   if(paint)
   {	
	   currentX = e.clientX - canvas.offsetLeft;
	   currentY = e.clientY-  canvas.offsetTop;
	   
	   ctx.beginPath();
	   ctx.fillStyle = color;
	   ctx.fillRect(currentX,currentY,2,2);
	   ctx.closePath();

	   
	}  

}
function up(e)
{
   paint=false;
   canvas.removeEventListener("mousemove",move,false);
   }
function move(e)
{
	if(paint)
	{
		
		mouseX=currentX;
		mouseY=currentY;
		currentX = e.clientX - canvas.offsetLeft;
		currentY = e.clientY - canvas.offsetTop;
		draw();
    }
    
}

function out(e)
{
	paint=false;
}
function draw()
{
	
	ctx.beginPath();
	ctx.moveTo(mouseX,mouseY);
	ctx.lineTo(currentX,currentY);
	ctx.strokeStyle = color;
	ctx.lineWidth = z;	
    ctx.stroke();
    ctx.closePath(); 

}

function fillcolor(obj)
{
	

	switch(obj.id)
	{
		case "green":
		    color="green";
		    break;
		case "blue":
		    color="blue";
		    break;
		case "yellow":
			color="yellow";
			break;
		case "orange":
		    color="orange";
		    break;
		case "red":
		    color="red";
		    break;
		case "black":
		    color="black";
        	break;
        case "white":
            color="white";
            break;
    }
    if(color=="white")
    {
             		            
	  z=14;	
	}    
    else 
    {
      z=2; 
    } 

}


function erase()
{
	ctx.clearRect(0, 0, w, h);
}



function drawRectangle()
{

  canvas.removeEventListener("mousedown",down ,false);	
  canvas.addEventListener("mousedown",rectDown,false);
  
  canvas.addEventListener("mouseup",rectUp,false);

  function rectDown(e)
  {
  	startX =  e.clientX - canvas.offsetLeft;
	startY = e.clientY-  canvas.offsetTop;
	
  	canvas.addEventListener("mousemove",rectMove,false);
  	
  }
  function rectMove(e){

   endX=e.clientX - canvas.offsetLeft;
   endY = e.clientY-  canvas.offsetTop;
  
   width = Math.abs(endX - startX);
    height = Math.abs(endY- startY);
   rdraw();
   
  } 

  function rectUp(e)
  {
    canvas.removeEventListener("mousemove",rectMove,false);
    canvas.removeEventListener("mousedown",rectDown,false);
  	
  }
  function rdraw()
  {
  	ctx.clearRect(startX,startY,width,height);
  	ctx.beginPath(); 
    ctx.strokeStyle = color;
    ctx.lineWidth = z;	
    ctx.strokeRect(startX, startY, width, height);
    ctx.closePath(); 
  }

  canvas.addEventListener("mousedown",down ,false);	
}

function drawLine()
{
  
  canvas.addEventListener("mousedown",lineDown,false);
  
  canvas.addEventListener("mouseup",lineUp,false);

  function lineDown(e)
  {
  	spointX =  e.clientX - canvas.offsetLeft;
	spointY = e.clientY-  canvas.offsetTop;
	
  	canvas.addEventListener("mousemove",lineMove,false);
  	
  }
  function lineMove(e){

   epointX=e.clientX - canvas.offsetLeft;
   epointY = e.clientY-  canvas.offsetTop;
  
  
   ldraw();
   
  } 

  function lineUp(e)
  {
    canvas.removeEventListener("mousemove",lineMove,false);
    canvas.removeEventListener("mousedown",lineDown,false);
  	
  }
  function ldraw()
  {
  	ctx.clearRect(spointX,spointY,epointX-spointX,epointY-spointY);
  	ctx.beginPath(); 
    ctx.strokeStyle = color;
    ctx.lineWidth = z;	
    ctx.moveTo(spointX,spointY);
    ctx.lineTo(epointX,epointY);
    ctx.stroke();
    ctx.closePath(); 
  }

  canvas.addEventListener("mousedown",down ,false);	


}
