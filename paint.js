var mouseX,mouseY,currentX,currentY,startX,startY,endX,endY,plotX,
plotY=0;
var width,height;
var dragging;
var color="black";
var z =2 ;
var ctx,paint,canvas2,ctx2 = false;
var spointX,spointY,epointX,epointY,w,h;
var started = false;

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
canvas.addEventListener("mousemove",move,false);
canvas.addEventListener("mouseup",up,false);
canvas.addEventListener("mouseout",out,false);
var img=new Image();
img.onload=function(){
	ctx.drawImage(img,0,0);
 }
img.src=localStorage.getItem("canvas");
  
};
function printCanvas()  
{  
    var dataimg = canvas.toDataURL(); //attempt to save base64 string to server using this var  
    var windowContent = '<!DOCTYPE html>';
 
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataimg + '">';
    windowContent += '</body>';

    var printWin = window.open('','','width=500,height=500');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
}
function savepdf()
{
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");
      var imgData = canvas.toDataURL("image/png", 1.0);
      var pdf = new jsPDF();
      pdf.setFontSize(40);
      pdf.text(35, 25, "canvas drawing");         
      pdf.addImage(imgData, 'PNG', 15, 40, 180, 180);
      pdf.save("download.pdf");
}
function down(e)
{
   
   paint=true;
 
   if(paint)
   {	
	   currentX = e.offsetX==undefined?e.layerX:e.offsetX|| e.clientX - canvas.offsetLeft;
	   currentY = e.offsetY==undefined?e.layerY:e.offsetY ||  e.clientY-  canvas.offsetTop;
	   
	   ctx.beginPath();
	   ctx.fillStyle = color;
	   ctx.fillRect(currentX,currentY,2,2);
	   ctx.closePath();

	   
	}  

};

function up(e)
{
   paint=false;
  localStorage.setItem("canvas",canvas.toDataURL());
   };

function move(e)
{
	if(paint)
	{
		
		mouseX=currentX;
		mouseY=currentY;
		currentX =  e.offsetX==undefined?e.layerX:e.offsetX || e.clientX - canvas.offsetLeft;
		currentY = e.offsetY==undefined?e.layerY:e.offsetY || e.clientY - canvas.offsetTop;
		draw();
    	}
    
};

function out(e)
{
	paint=false;
};

function draw()
{
	
	ctx.beginPath();
	ctx.moveTo(mouseX,mouseY);
	ctx.lineTo(currentX,currentY);
	ctx.strokeStyle = color;
	ctx.lineWidth = z;	
	ctx.stroke();
	ctx.closePath(); 

};

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
    } ;

};


function erase()
{
	ctx.clearRect(0, 0, w, h);
	localStorage.removeItem("canvas");
};



function drawRectangle()
{
  
    started=false;
    canvas2 = document.createElement('canvas');
    canvas2.id     = 'imageTemp';
    canvas2.width  = canvas.width;
    canvas2.height = canvas.height;
    ctx2 = canvas2.getContext('2d');

   if (!document.getElementById('imageTemp'))
      document.getElementById('canvas_container').appendChild(canvas2);
  

  canvas2.addEventListener("mousedown",rectDown,false);
  canvas2.addEventListener("mousemove",rectMove,false);
  canvas2.addEventListener("mouseup",rectUp,false);

  function rectDown(e)
  {
   started = true;
  	startX = e.offsetX==undefined?e.layerX:e.offsetX || e.clientX - canvas2.offsetLeft;
	  startY = e.offsetY==undefined?e.layerY:e.offsetY ||e.clientY-  canvas2.offsetTop;
	
  	
  	
  };
  function rectMove(e){
    if(started){
   endX = e.offsetX==undefined?e.layerX:e.offsetX || e.clientX - canvas2.offsetLeft;
   endY =  e.offsetY==undefined?e.layerY:e.offsetY || e.clientY-  canvas2.offsetTop;
  
    width = Math.abs(endX - startX);
    height = Math.abs(endY- startY);
    plotX = Math.min(endX,startX);
    plotY = Math.min(endY,startY);
    rdraw(plotX,plotY,width,height);
   }
  };

  function rectUp(e)
  {
    if(started) {
     img_update();
      started=false;
      localStorage.setItem("canvas",canvas.toDataURL());
      canvas2.removeEventListener("mousedown",rectDown,false);
      canvas2.removeEventListener("mousemove",rectMove,false);
      canvas2.removeEventListener("mouseup",rectUp,false);

 
      document.getElementById('canvas_container').removeChild(document.getElementById('imageTemp'));
   }
  	
  };
  function rdraw(plotX,plotY,width,height)
  {
  	ctx2.clearRect(0,0,canvas.width,canvas.height);
  	ctx2.beginPath(); 
    ctx2.strokeStyle = color;
    ctx2.lineWidth = z;	
    ctx2.strokeRect(plotX,plotY, width, height);
    ctx2.closePath(); 
  };

  
};

function img_update () {
    ctx.drawImage(canvas2, 0, 0);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  }

function drawLine()
{
  started=false;
    canvas2 = document.createElement('canvas');
    canvas2.id     = 'imageTemp';
    canvas2.width  = canvas.width;
    canvas2.height = canvas.height;
    ctx2 = canvas2.getContext('2d');

   if (!document.getElementById('imageTemp'))
      document.getElementById('canvas_container').appendChild(canvas2);
 

  
  canvas2.addEventListener("mousedown",lineDown,false);
  canvas2.addEventListener("mousemove",lineMove,false);
  canvas2.addEventListener("mouseup",lineUp,false);

  function lineDown(e)
  {
    started=true;
  spointX =  e.offsetX==undefined?e.layerX:e.offsetX||  e.clientX - canvas.offsetLeft;
	spointY =  e.offsetY==undefined?e.layerY:e.offsetY ||  e.clientY-  canvas.offsetTop;
	
  	
  }
  function lineMove(e){
   if(started){
   epointX= e.offsetX==undefined?e.layerX:e.offsetX ||  e.clientX - canvas.offsetLeft;
   epointY =  e.offsetY==undefined?e.layerY:e.offsetY ||  e.clientY-  canvas.offsetTop;
  
  
   ldraw();
   }
  } 

  function lineUp(e)
  {
    if(started) {

      started=false;
       img_update();
      localStorage.setItem("canvas",canvas.toDataURL());
      canvas2.removeEventListener("mousedown",lineDown,false);
      canvas2.removeEventListener("mousemove",lineMove,false);
      canvas2.removeEventListener("mouseup",lineUp,false);

   
      document.getElementById('canvas_container').removeChild(document.getElementById('imageTemp'));
   }
    
    
  	
  }
  function ldraw()
  {
  	ctx2.clearRect(0,0,canvas.width,canvas.height);
  	ctx2.beginPath(); 
    ctx2.strokeStyle = color;
    ctx2.lineWidth = z;	
    ctx2.moveTo(spointX,spointY);
    ctx2.lineTo(epointX,epointY);
    ctx2.stroke();
    ctx2.closePath(); 
  }




};

