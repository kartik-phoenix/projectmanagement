(()=>{"use strict";$("#leadStatusTbl").DataTable({oLanguage:{sEmptyTable:Lang.get("messages.common.no_data_available_in_table"),sInfo:Lang.get("messages.common.data_base_entries"),sLengthMenu:Lang.get("messages.common.menu_entry"),sInfoEmpty:Lang.get("messages.common.no_entry"),sInfoFiltered:Lang.get("messages.common.filter_by"),sZeroRecords:Lang.get("messages.common.no_matching")},processing:!0,serverSide:!0,order:[[2,"asc"]],ajax:{url:route("lead.status.index")},columnDefs:[{targets:[1],width:"8%",orderable:!1},{targets:[2],className:"text-right",width:"8%"},{targets:[3],className:"text-center",width:"8%",searchable:!1},{targets:[4],orderable:!1,className:"text-center",width:"7%"},{targets:"_all",defaultContent:"N/A"}],columns:[{data:function(e){var a=document.createElement("textarea");return a.innerHTML=e.name,a.value},name:"name"},{data:function(e){var a=[{color:e.color,colorStyle:"style"}];return null==e.color?"N/A":prepareTemplateRender("#leadStatusColorBox",a)},name:"color"},{data:"order",name:"order"},{data:"leads_count",name:"leads_count"},{data:function(e){var a=[{id:e.id}];return prepareTemplateRender("#leadStatusActionTemplate",a)},name:"id"}]});var e=Pickr.create({el:".color-wrapper",theme:"nano",closeWithKey:"Enter",autoReposition:!0,defaultRepresentation:"HEX",position:"bottom-end",swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 1)","rgba(156, 39, 176, 1)","rgba(103, 58, 183, 1)","rgba(63, 81, 181, 1)","rgba(33, 150, 243, 1)","rgba(3, 169, 244, 1)","rgba(0, 188, 212, 1)","rgba(0, 150, 136, 1)","rgba(76, 175, 80, 1)","rgba(139, 195, 74, 1)","rgba(205, 220, 57, 1)","rgba(255, 235, 59, 1)","rgba(255, 193, 7, 1)"],components:{preview:!0,hue:!0,interaction:{input:!0,clear:!1,save:!1}}}),a=Pickr.create({el:".color-wrapper",theme:"nano",closeWithKey:"Enter",autoReposition:!0,defaultRepresentation:"HEX",position:"bottom-end",swatches:["rgba(244, 67, 54, 1)","rgba(233, 30, 99, 1)","rgba(156, 39, 176, 1)","rgba(103, 58, 183, 1)","rgba(63, 81, 181, 1)","rgba(33, 150, 243, 1)","rgba(3, 169, 244, 1)","rgba(0, 188, 212, 1)","rgba(0, 150, 136, 1)","rgba(76, 175, 80, 1)","rgba(139, 195, 74, 1)","rgba(205, 220, 57, 1)","rgba(255, 235, 59, 1)","rgba(255, 193, 7, 1)"],components:{preview:!0,hue:!0,interaction:{input:!0,clear:!1,save:!1}}});function t(e){var a=e.replace("#","");return(299*parseInt(a.substr(0,2),16)+587*parseInt(a.substr(2,2),16)+114*parseInt(a.substr(4,2),16))/1e3>240}e.on("change",(function(){var a=e.getColor().toHEXA().toString();if(t(a))return $("#validationErrorsForColor").addClass("d-block").text("Pick a different color"),void $(':input[id="btnSave"]').prop("disabled",!0);$("#validationErrorsForColor").removeClass("d-block"),$(':input[id="btnSave"]').prop("disabled",!1),e.setColor(a),$("#color").val(a)})),a.on("change",(function(){var e=a.getColor().toHEXA().toString();if(t(e))return $("#editValidationErrorsForColor").addClass("d-block").text("Pick a different color"),void $(':input[id="btnEditSave"]').prop("disabled",!0);$("#editValidationErrorsForColor").removeClass("d-block"),$(':input[id="btnEditSave"]').prop("disabled",!1),a.setColor(e),$("#edit_color").val(e)}));$(document).on("click","#color",(function(){!0})),$(document).on("click",".addLeadStatusModal",(function(){$("#addModal").appendTo("body").modal("show")})),$(document).on("submit","#addNewForm",(function(e){if(""==$("#color").val())return displayErrorMessage("Please select your color."),!1;e.preventDefault(),processingBtn("#addNewForm","#btnSave","loading"),$.ajax({url:route("lead.status.store"),type:"POST",data:$(this).serialize(),success:function(e){e.success&&(displaySuccessMessage(e.message),$("#addModal").modal("hide"),$("#leadStatusTbl").DataTable().ajax.reload(null,!1))},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){processingBtn("#addNewForm","#btnSave")}})})),$(document).on("click",".edit-btn",(function(e){var a=$(e.currentTarget).data("id");renderData(a)})),window.renderData=function(e){$.ajax({url:route("lead.status.edit",e),type:"GET",success:function(e){if(e.success){$("#leadStatusId").val(e.data.id);var t=document.createElement("textarea");t.innerHTML=e.data.name,$("#editName").val(t.value),a.setColor(e.data.color),$("#editOrder").val(e.data.order),$("#editModal").appendTo("body").modal("show")}},error:function(e){displayErrorMessage(e.responseJSON.message)}})},$(document).on("submit","#editForm",(function(e){e.preventDefault(),processingBtn("#editForm","#btnEditSave","loading");var a=$("#leadStatusId").val();$.ajax({url:route("lead.status.update",a),type:"put",data:$(this).serialize(),success:function(e){e.success&&(displaySuccessMessage(e.message),$("#editModal").modal("hide"),$("#leadStatusTbl").DataTable().ajax.reload(null,!1))},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){processingBtn("#editForm","#btnEditSave")}})})),$(document).on("click",".delete-btn",(function(e){var a=$(e.currentTarget).data("id");deleteItem(route("lead.status.destroy",a),"#leadStatusTbl",Lang.get("messages.lead_status.lead_status"))})),$("#addModal").on("show.bs.modal",(function(){e.setColor("#3F51B5")})),$("#addModal").on("hidden.bs.modal",(function(){e.setColor("#000"),resetModalForm("#addNewForm","#validationErrorsBox"),e.hide()})),$("#editModal").on("hidden.bs.modal",(function(){resetModalForm("#editForm","#editValidationErrorsBox"),a.hide()}))})();