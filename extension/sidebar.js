var sidebar = document.createElement("div");
sidebar.className += "tagit_sidebar";
sidebar.appendChild(document.createTextNode("TEST"));
document.body.appendChild(sidebar);

var el = document.createTextNode("HAHAHAHAHA");
var logo = document.getElementById("pagelet_bluebar");
logo.appendChild(el);
