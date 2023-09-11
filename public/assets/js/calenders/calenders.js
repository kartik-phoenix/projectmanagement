(()=>{"use strict";$(document).ready((function(){$.ajax({url:"calendar-list",type:"GET",dataType:"json",beforeSend:function(){$(".loader-div").fadeIn()},success:function(e){$("#calendar").fullCalendar({themeSystem:"bootstrap4",height:750,header:{left:"prev,next today",center:"title",right:"month"},buttonText:{today:Lang.get("messages.range.today"),month:Lang.get("messages.range.month"),week:Lang.get("messages.range.week"),day:Lang.get("messages.range.day")},defaultDate:new Date,defaultView:"month",editable:!1,events:e.data,timeFormat:"h:mm A",eventAfterAllRender:function(e){setTimeout((function(){$("#calendar button.fc-today-button").removeClass("disabled").prop("disabled",!1)}),100)},eventClick:function(e){showAnnouncementDetails(e.id)}})},complete:function(){$(".loader-div").fadeOut()}}),window.showAnnouncementDetails=function(e){$.ajax({url:route("announcement.details",e),type:"GET",beforeSend:function(){startLoader()},success:function(e){$("#announcementSubject").text(addNewlines(e.data.subject,30)),$("#announcementShowToClients").text(e.data.show_to_clients?"Yes":"No"),$("#announcementDate").text(moment(e.data.date,"YYYY-MM-DD hh:mm:ss").format("Do MMM, YYYY HH:mm A"));var t=document.createElement("textarea");t.innerHTML=e.data.message;var n=t.value;$("#announcementDescription").text("").append(addNewlines(n||"N/A",30)),$("#announcementDetailModal").modal("show")},complete:function(){stopLoader()}})}}))})();