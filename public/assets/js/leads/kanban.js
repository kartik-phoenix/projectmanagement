(()=>{"use strict";for(var e,a=[],o=document.getElementsByClassName("board").length,n=0;n<o;n++)a.push(document.querySelector(".board-"+n));var r=dragula({containers:a,revertOnSpill:!0,direction:"vertical"}).on("drag",(function(e){e.className=e.className.replace("ex-moved","")})).on("drop",(function(a,o){var n=$(o);a.className+=" ex-moved",e=$(".ex-moved").data("id");var r=$(o).data("board-status");n.parent().find(".infy-loader").fadeIn(),$.ajax({url:leadUrl+"/"+e+"/status/"+r,type:"PUT",cache:!1,success:function(e){e.success&&displaySuccessMessage(e.message)},complete:function(){n.parent().find(".infy-loader").fadeOut()}})})).on("over",(function(e,a){a.className+=" ex-over"})).on("out",(function(e,a){a.className=a.className.replace("ex-over","")}));$(document).ready((function(){var e=[document.querySelector(".flex-nowrap")];$(".board").each((function(a,o){e.push(document.querySelector(".board-"+a))}));autoScroll(e,{margin:200,autoScroll:function(){return this.down&&r.dragging}})}))})();