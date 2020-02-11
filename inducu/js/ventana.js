var ventana;

//----------------------------------------------------------------------------
function xwindow(id, width, height, url, xcontrol)
{
    this.xblack = document.createElement("div");
    this.xblack.className = 'xblack';
          
    this.xdiv = document.createElement("div");
    document.body.appendChild (this.xblack);
    this.xblack.appendChild(this.xdiv);

    this.xdiv.className = "flotante";
    this.xdiv.style.display = 'block';    
    this.xdiv.style.width = width;
    this.xdiv.style.height = height;
    this.xdiv.style.borderStyle = 'ridge';
    
    xcierre = document.createElement("span");
    xcierre.style.cursor = 'pointer';
    xcierre.innerHTML = 'Cerrar';
    xcierre.onclick = function(xx)
    {  
      xpadre = this.parentNode.parentNode.parentNode;
      xpadre.parentNode.removeChild(xpadre);      
    };
    
    xtitulo = document.createElement("div");
    xtitulo.style.textAlign = 'right';
    xtitulo.style.backgroundColor = 'blue';
    xtitulo.style.color = 'white';
    xtitulo.style.cursor = 'move';
    xtitulo.appendChild(xcierre) ;
    
    xframe = document.createElement("iframe");
    xframe.src = url;
    xframe.height = height - 20;    
    xframe.width = width - 10;
    xframe.style.border = "#FFF000";
    
    xbody = document.createElement("div");
    xbody.appendChild (xframe);
    
    this.xdiv.appendChild (xtitulo);
    this.xdiv.appendChild(xbody);
    
    ximagen = document.createElement("img");
    ximagen.style.float = "right";
    ximagen.src = "";
        
    centro_x = window.innerWidth/2;
    centro_y = window.innerHeight/2;
    centro_div_x = parseInt(this.xdiv.style.width)/2;
    centro_div_y = parseInt(this.xdiv.style.height)/2;    
    
    
      // ---------------- calcular top de xwindow ----------------------------
    var selectedPosX = 0;
    var selectedPosY = 0;
    var theElement = xcontrol;
    if (!theElement) return;
    var theElemHeight = theElement.offsetHeight;
    var theElemWidth = theElement.offsetWidth;

    //while(theElement !== null)
    while (theElement)
    {
      selectedPosX += theElement.offsetLeft;
      selectedPosY += theElement.offsetTop;
      theElement = theElement.offsetParent;
    }
      
    this.xdiv.style.left = "200px";
    this.xdiv.style.top = "" + parseInt(selectedPosY - 400) + "px";
    
    window.xdiv = this.xdiv;
    
    window.onresize = window.onscroll = function()
    {
        var data = getWindowData();
        
        //this.xdiv.style.left = data[0]/2 + data[2] - parseInt( this.xdiv.style.width) / 2 + 'px';
        //this.xdiv.style.top  = data[1]/2 + data[3] - parseInt( this.xdiv.style.height)/ 2 + 'px';
    }
    
    
    return this.xdiv;
}
//----------------------------------------------------------------------------
function getWindowData()
{
    var widthViewport, heightViewport, xScroll, yScroll, widthTotal, heightTotal;
    
    if (typeof window.innerWidth != 'undefined')
    {
        widthViewport= window.innerWidth;
        heightViewport= window.innerHeight;
    }
    else 
      if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' 
          && document.documentElement.clientWidth != 0)
      {
        widthViewport=document.documentElement.clientWidth;
        heightViewport=document.documentElement.clientHeight;
      }
      else
      {
        widthViewport= document.getElementsByTagName('body')[0].clientWidth;
        heightViewport=document.getElementsByTagName('body')[0].clientHeight;
      }
      
    xScroll = self.pageXOffset || (document.documentElement.scrollLeft+document.body.scrollLeft);
    yScroll = self.pageYOffset || (document.documentElement.scrollTop+document.body.scrollTop);
    widthTotal  = Math.max(document.documentElement.scrollWidth,document.body.scrollWidth,widthViewport);
    heightTotal = Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,heightViewport);
    return [widthViewport,heightViewport,xScroll,yScroll,widthTotal,heightTotal];
}
//---------------------------------------------------------------------------
function arrastrarRaton(e)
{
    if (window.estoyArrastrando) 
    {
        newLeft = window.moz ? e.clientX : event.clientX;
        newTop = window.moz ? e.clientY : event.clientY;
                
        xwidth = parseInt(window.dobj.style.width);
        window.dobj.style.left = newLeft - xwidth; 
        window.dobj.style.top  = newTop;//  - parseInt(window.dobj.style.height);

        return false;
    }
}
//-------------------------------------------------------------------------------
function soltarBoton(e) 
{	
    window.estoyArrastrando = false;
}
//-------------------------------------------------------------------------------
function presionarBoton(e) 
{
    //Obtenemos el elemento sobre el que se ha presionado el botón del ratón
    var fobj = window.moz ? e.target : event.srcElement;

    // Buscamos el primer elemento en la que esté contenido aquel sobre el que se ha pulsado
    // que pertenezca a la clase objMovible. 
    while (fobj.tagName.toLowerCase() != "html" && fobj.className != "flotante") 
    {
        fobj = window.moz ? fobj.parentNode : fobj.parentElement;
    }

    // Si hemos obtenido un objeto movible...			
    if (fobj.className == "flotante") 
    {
        window.estoyArrastrando = true;
        window.dobj = fobj;        
        return false;   // Devolvemos false para no realizar ninguna acción posterior
    }
}

  