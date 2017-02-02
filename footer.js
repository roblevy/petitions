var footer = document.createElement("div");
footer.id = "attribution";
footer.style = "font-family:monospace;font-size:small;color:black;font-weight:normal;width:100%;height:100%;padding:0px;text-decoration:none;display:flex; flex-direction:row; align-items: center; justify-content: flex-end;";
var p = document.createElement("p");
p.innerHTML = "Coded and designed by Rob Levy"
footer.append(p);
var link = document.createElement("a");
link.innerHTML = "@DataDrivenEcon";
link.href = "http://twitter.com/datadrivenecon";
link.target = "_blank";
var img = document.createElement("img");
img.src = "/twitter.png";
img.style = 'height:20px;padding-left:15px;'
footer.append(img);
footer.append(link);
document.body.append(footer);
