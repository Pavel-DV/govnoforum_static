var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

var buf = '';
function draw() {
	divCanvas.style.display = "block";
}
divCanvas.style.position = 'relative';
divCanvas.style.width = '500px';
divCanvas.style.height = '500px';

var BigCanvas = document.createElement('canvas');
divCanvas.appendChild(BigCanvas);
BigCanvas.width = 500;
BigCanvas.height = 500;
var BigCanvas2 = document.createElement('canvas');
divCanvas.appendChild(BigCanvas2);
BigCanvas2.width = 500;
BigCanvas2.height = 500;
BigCanvas2.style.cursor = 'crosshair';
BigCanvas.style.position = 'absolute';
BigCanvas2.style.position = 'absolute';
BigCanvas.style.top = '8px';
BigCanvas2.style.top = '8px';

try{
	var ctx = BigCanvas.getContext('2d');
	var ctx2 = BigCanvas2.getContext('2d');
}catch(e){}

var ax = 200;
var ay = 100;
var bx = 100;
var by = 200;
var prevX = 0, prevY = 0;
var angle;
var oldXXX = 0;
var x,y;
var drawing = false;
/*ctx.beginPath();
ctx.moveTo( ax, ay );
ctx.lineTo( bx, by );
ctx.stroke();
*/
function beginPath() {
	if ( x == 0 ) x++;
	if ( y == 0 ) y++;
	bx = x; by = y;
	var chars = String.fromCharCode( 10 ) + String.fromCharCode( x ) + String.fromCharCode( y );//'\r\n x=' + x + ' y=' + y;
	buf += chars;
	console.log('10, x=' + x + ', y=' + y + ' chars=' + chars );
	ctx.beginPath();
	ctx.moveTo(x, y);
	drawing = true;
}
function endPath() {
	ctx.lineTo(x, y);
	ctx.stroke();
	dx = x-bx;
	dy = y-by;
	if (dx == -118)	{dx++;}
	if (dy == -118)	{dy++;}
	if ( dx != 0 || dy != 0){
		var chars = String.fromCharCode( dx + 128 ) + String.fromCharCode( dy + 128 );
		buf += chars;
		console.log('end x+=' + dx + ', y+=' + dy + ' chars=' + chars );
	}
	ctx2.clearRect(0,0,500,500);
	drawing = false;
}
function path() {
	dx = x-bx;
	dy = y-by;
	//if ( dx = -128 ) dx++;
	//if ( dy = -128 ) dy++;
	if (dx == -118)	{dx++;}
	if (dy == -118)	{dy++;}
	if ( dx != 0 || dy != 0){
		var chars = String.fromCharCode( dx + 128 ) + String.fromCharCode( dy + 128 );
		buf += chars;
		console.log('x+=' + dx + ', y+=' + dy + ' chars=' + chars );
		ctx.quadraticCurveTo(bx, by, (bx + x)/2, (by + y)/2);
		ctx.stroke();
		ctx2.beginPath();
		ctx2.moveTo((bx + x)/2, (by + y)/2);

		ax = bx;
		ay = by;
		bx = x;
		by = y;
		oldXXX = 0;
	}
}
function move(evnt)
{
	var perebor = false;
	var dx = x-bx;
	var dy = y-by;
	var a = Math.abs(bx-ax) + Math.abs(by-ay);
	var xxx = Math.abs(dx) + Math.abs(dy);
	var x1 = a * (dx) + xxx*(ax-bx);
	var y1 = a * (dy) + xxx*(ay-by);
	var o = (Math.abs(x1) + Math.abs(y1)) / (a);
	angle = 0.2;
	if (xxx < 40 ){angle = angle / Math.pow(xxx, 0.5) * 10;}
	
	if ( buttonPressed)
	{
		if ( dx > 128 ){
			dx = 128;
			x = 128 + bx;
			perebor = true;
		}
		if ( dy > 128 ){
			dy = 128;
			y = 128 + by;
			perebor = true;
		}
		if ( dx < -127 ){
			dx = -127;
			x = -127 + bx;
			perebor = true;
		}
		if ( dy < -127 ){
			dy = -127;
			y = -127 + by;
			perebor = true;
		}
		ctx2.clearRect(0,0,500,500);
		if (o / xxx > angle || oldXXX > xxx || perebor)
		{
			path();
		} else {
			oldXXX = xxx;
			// ctx2.beginPath();
			// ctx2.moveTo(bx, by);
			ctx2.lineTo( x, y );
			ctx2.stroke();
		}
	}else{
	}
};

BigCanvas2.onmouseleave  = function(evnt)
{
	if (buttonPressed) endPath();
};

/*BigCanvas2.onmouseenter  = function(evnt)
{
	if (buttonPressed){
		var br=this.getBoundingClientRect();
		x = evnt.clientX - br.left;
		y = evnt.clientY - br.top;
		beginPath();
	}
};*/
BigCanvas2.onmousedown  = function(evnt)
{
	beginPath();
};

BigCanvas2.onmouseup  = function(evnt)
{
//	x = (evnt.offsetX)|0;
//	y = (evnt.offsetY)|0;
	var br=this.getBoundingClientRect();
	x = evnt.clientX - br.left;
	y = evnt.clientY - br.top;
	endPath();
};

BigCanvas2.onmousemove = function(evnt)
{
	var br=this.getBoundingClientRect();
	x = evnt.clientX - br.left;
	y = evnt.clientY - br.top;
	
	//x = (evnt.offsetX)|0;
	//y = (evnt.offsetY)|0;
	buttonPressed = typeof(evnt.buttons) == 'undefined' && evnt.which == 1 || evnt.buttons==1 && evnt.which == 1;
	if (buttonPressed){
		if (!drawing)
			beginPath();
		else
			move(evnt);
	}
};

BigCanvas2.ontouchstart = function(evnt){
	if (evnt.targetTouches.length == 1){
		x = (evnt.changedTouches[0].pageX - this.offsetLeft - this.offsetParent.offsetLeft)|0;
		y = (evnt.changedTouches[0].pageY - this.offsetTop - this.offsetParent.offsetTop)|0;
		buttonPressed = true;
		beginPath();
		//evnt.preventDefault();
	}
};

BigCanvas2.ontouchleave  = function(evnt)
{
	if (buttonPressed) endPath();
	//evnt.preventDefault()
};
BigCanvas2.ontouchend = function(evnt){
	if (buttonPressed) endPath();
	//evnt.preventDefault()
};

BigCanvas2.ontouchmove = function(evnt){
	if (evnt.targetTouches.length == 1 && evnt.target == BigCanvas2){
		x = (evnt.changedTouches[0].pageX - this.offsetLeft - this.offsetParent.offsetLeft)|0;
		y = (evnt.changedTouches[0].pageY - this.offsetTop - this.offsetParent.offsetTop)|0;
		if (!drawing)
			beginPath();
		else
			move(evnt);
		evnt.preventDefault();
	}
};

if (ctx){
	var drawMeCanvases = document.getElementsByClassName("drawme");
} else {drawMeCanvases = new Array();}
for (var i=0; i<drawMeCanvases.length; i++) { 
	var drawMeCanvas = drawMeCanvases[i];   
	var cotex = drawMeCanvas.getContext('2d');
	cotex.beginPath();
	var tbuf=drawMeCanvas.textContent;
	var code, x, y;
	//alert (tbuf);
	for (var j=0; j<tbuf.length;j++){
		code = tbuf.charCodeAt(j);
		if (code == 10) {
			j++;
			x=tbuf.charCodeAt(j++);
			y=tbuf.charCodeAt(j);
			console.log ('    x=' + x + ' y=' + y );
			cotex.lineTo(bx, by);
			cotex.moveTo( x, y );
			bx = x; by = y;
		}else{
			dx = code - 128;
			x += dx;
			j++;
			dy = tbuf.charCodeAt(j) - 128;
			y += dy;
			cotex.quadraticCurveTo(bx, by, (bx + x)/2, (by + y)/2);
			bx = x; by = y;
			//cotex.lineTo( x, y );
			console.log ( 'x+' + dx  + "=" + x + ' y+' + dy + "=" + y);
		}
	}
	cotex.lineTo(bx, by);
	cotex.stroke();
} 


////////////////////////////////

/////onload = wsStart;
function wsStart() {
	ws = new WebSocket("ws://govnoforum.ru:8000/");
	ws.onclose = function() {	setTimeout(wsStart, 1000);	};
	ws.onmessage = function(evt) {	document.body.style.backgroundColor	= 'darkRed';	};
}
function getCoords(e)
{
	node=e.target;
	while (node != null && node.nodeName != "DIV")
		node = node.parentNode;
	if (node != null && node.nodeName=="DIV")
	{
		X = e.pageX - node.offsetLeft;
		Y = e.pageY - node.offsetTop;
		mouseX = 2 * (X / node.clientWidth - 0.5);
		mouseY = 2 * (0.5 - Y / node.clientHeight);
		node.style.transform="perspective(500px) rotateX("+mouseY+"deg) rotateY("+mouseX+"deg)";
	}
}
function norm(e)
{
	node=e.target;
	while (node != null && node.nodeName != "DIV")
		node = node.parentNode;
	if (node != null && node.nodeName=="DIV")
	{
		node.style.transform="";
		node.style.transition="transform .15s linear";
	}
}
function over(e)
{
	node=e.target;
	while (node != null && node.nodeName != "DIV")
		node = node.parentNode;
	if (node != null && node.nodeName=="DIV")
	{
		node.style.transition="";
	}
}

function cli(e)
{
	if (e.target.nodeName=="SPAN")
	{
		var node1=e.target;
		while (node1 != null && node1.nodeName != "DIV")
			node1 = node1.parentNode;
			
		var node = document.getElementById(e.target.textContent);
		while (node != null && node.nodeName != "DIV")
			node = node.parentNode;
		if (node != null && node.nodeName=="DIV")
		{
			var newDiv = document.createElement('div')
			newDiv.style.marginLeft = '0';
			newDiv.style.paddingTop = '0';
			newDiv.style.paddingBottom = '0';
			newDiv.style.marginTop = '-16px';
			newDiv.style.marginBottom = '-16px';
			newDiv.style.maxHeight = '0';
			newDiv.style.backgroundColor = '#e0e0e0';
			node1.parentNode.insertBefore(newDiv, node1);
			newDiv.innerHTML = node.innerHTML;


			newDiv.style.transition="all .15s linear";
			newDiv.style.marginLeft = 'calc(50% - 386px)';
			newDiv.style.paddingTop = '16px';
			newDiv.style.paddingBottom = '16px';
			newDiv.style.marginTop = '16px';
			newDiv.style.marginBottom = '16px';
			newDiv.style.maxHeight = '1000px';
			//e.target.innerHTML = node.innerHTML;
		}
	}
	if (e.target.nodeName=="N")
	{
		location.href = topic_page+"user_filter=" + encodeURIComponent(e.target.innerText);
	}
	if (e.target.nodeName=="Z")
	{
		var nik = e.target.previousElementSibling;
		location.href = topic_page+"ban=" + encodeURIComponent(nik.innerText) + "#" + nik.previousElementSibling.attributes.getNamedItem('id').value;
	}
	if (e.target.nodeName=="A" && e.target.attributes.getNamedItem('href') == null && !e.target.attributes.getNamedItem('onClick'))
	{
		location.href = "#"+e.target.attributes.getNamedItem('id').value;
	}
}
function submitform()
{
	form.suka.value="no";
	form.drawing.value = buf;
	if (form.title) {
		form.submit();
	} else {
		try{
			//noajax=true();////////////
			var formData = new FormData(form);
			formData.append("xhr", "y");
			xmlhttp.open("POST", form.action);
			xmlhttp.send(formData);
		} catch (e) {
			form.submit();
		}
	}
}

document.onkeypress=function(e){
	if((e.ctrlKey) && ((e.keyCode==10)||(e.keyCode==13))) {
		submitform();
	}
	if(e.which == 26 || e.which == 122 && e.ctrlKey){
		buf = buf.substring(0, buf.lastIndexOf ('\n'))		
		ctx.clearRect(0,0,500,500);
		ctx.beginPath();
		var code, x, y;
		for (var j=0; j<buf.length;j++){
			code = buf.charCodeAt(j);
			if (code == 10) {
				j++;
				x=buf.charCodeAt(j++);
				y=buf.charCodeAt(j);
				console.log ('    x=' + x + ' y=' + y );
				ctx.lineTo(bx, by);
				ctx.moveTo( x, y );
				bx = x; by = y;
			}else{
				dx = code - 128;
				x += dx;
				j++;
				dy = buf.charCodeAt(j) - 128;
				y += dy;
				ctx.quadraticCurveTo(bx, by, (bx + x)/2, (by + y)/2);
				bx = x; by = y;
				//ctx.lineTo( x, y );
				console.log ( 'x+' + dx  + "=" + x + ' y+' + dy + "=" + y);
			}
		}
		ctx.lineTo(bx, by);
		ctx.stroke();
	}
}

form.text.onkeydown=function(e){
	if (event.keyCode == 9){
		s = this.selectionStart;
		e = this.selectionEnd;
		this.value = this.value.substring(0, s) + "\t" + this.value.substring(e);
		this.selectionStart = this.selectionEnd = s + 1;
		return false;
	}
}

function getXmlHttp(){
	var xmlhttp;
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e)
	{
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e)
		{
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xmlhttp = false;
			}
		}
	}
	return xmlhttp;
}

var xmlhttp = getXmlHttp()

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4) {
		if(xmlhttp.status == 200) {
			var script = document.createElement("script");
			script.innerHTML = xmlhttp.responseText;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	}
	if (xmlhttp.readyState == 1) {
		//document.getElementById('status').innerHTML = "Loading...";
	}
};


}
/*
     FILE ARCHIVED ON 23:02:20 Mar 05, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:38:51 Jan 27, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.767
  exclusion.robots: 0.036
  exclusion.robots.policy: 0.02
  esindex: 0.016
  cdx.remote: 6.504
  LoadShardBlock: 189.643 (3)
  PetaboxLoader3.resolve: 289.216 (4)
  PetaboxLoader3.datanode: 130.855 (5)
  load_resource: 287.809 (2)
*/