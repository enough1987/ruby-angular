
setInterval(function(){

    var cssLink = document.createElement("link"); 
    cssLink.href = "styleoneall.css"; 
    cssLink.rel = "stylesheet"; 
    cssLink.type = "text/css"; 
    frames[0].document.body.appendChild(cssLink);
    console.log( frames[0] );

}, 2000)