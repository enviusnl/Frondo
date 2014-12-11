(function(){this.FastButton=function(e,t){this.element=e;this.handler=t;"ontouchstart"in window?e.addEventListener("touchstart",this,!1):e.addEventListener("click",this,!1)};this.FastButton.prototype.handleEvent=function(e){switch(e.type){case"touchstart":this.onTouchStart(e);break;case"touchmove":this.onTouchMove(e);break;case"touchend":this.onClick(e);break;case"click":this.onClick(e)}};this.FastButton.prototype.onTouchStart=function(e){e.stopPropagation();this.element.addEventListener("touchend",this,!1);this.element.addEventListener("touchmove",this,!1);this.startX=e.touches[0].clientX;this.startY=e.touches[0].clientY};this.FastButton.prototype.onTouchMove=function(e){(Math.abs(e.touches[0].clientX-this.startX)>10||Math.abs(e.touches[0].clientY-this.startY)>10)&&this.reset()};this.FastButton.prototype.onClick=function(e){e.stopPropagation();this.reset();var t=this.handler;typeof t=="function"?t(e):typeof t=="object"&&t.handleEvent(e);e.type==="touchend"&&this.clickbuster.preventGhostClick(this.startX,this.startY)};this.FastButton.prototype.reset=function(){this.element.removeEventListener("touchend",this,!1);this.element.removeEventListener("touchmove",this,!1)};this.clickbuster=function(){console.log("init clickbuster")};this.clickbuster.preventGhostClick=function(e,t){clickbuster.coordinates.push(e,t);window.setTimeout(google.clickbuster.pop,2500)};this.clickbuster.pop=function(){clickbuster.coordinates.splice(0,2)};this.clickbuster.onClick=function(e){for(var t=0;t<clickbuster.coordinates.length;t++){var n=clickbuster.coordinates[t],r=clickbuster.coordinates[t+1];if(Math.abs(e.clientX-n)<25&&Math.abs(e.clientY-r)<25){e.stopPropagation();e.preventDefault()}}};document.addEventListener("click",clickbuster.onClick,!0);clickbuster.coordinates=[]})(this);