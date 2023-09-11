(()=>{"use strict";$(document).on("click",".addServiceModal",(function(){$("#addModal").appendTo("body").modal("show")}));var e=$("#servicesTable");$(e).DataTable({oLanguage:{sEmptyTable:Lang.get("messages.common.no_data_available_in_table"),sInfo:Lang.get("messages.common.data_base_entries"),sLengthMenu:Lang.get("messages.common.menu_entry"),sInfoEmpty:Lang.get("messages.common.no_entry"),sInfoFiltered:Lang.get("messages.common.filter_by"),sZeroRecords:Lang.get("messages.common.no_matching")},processing:!0,serverSide:!0,ajax:{url:route("services.index")},columnDefs:[{targets:[1],orderable:!1,className:"text-center",width:"8%"},{targets:"_all",defaultContent:"N/A"}],columns:[{data:"name",name:"name"},{data:function(e){var a=[{id:e.id}];return prepareTemplateRender("#serviceActionTemplate",a)},name:"id"}]}),$(document).on("submit","#addNewForm",(function(a){a.preventDefault(),processingBtn("#addNewForm","#btnSave","loading"),$.ajax({url:route("services.store"),type:"POST",data:$(this).serialize(),success:function(a){a.success&&(displaySuccessMessage(a.message),$("#addModal").modal("hide"),e.DataTable().ajax.reload(null,!0))},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){processingBtn("#addNewForm","#btnSave")}})})),$(document).on("click",".edit-btn",(function(e){var a=$(e.currentTarget).data("id");renderData(a)})),window.renderData=function(e){$.ajax({url:route("services.edit",e),type:"GET",success:function(e){if(e.success){$("#serviceId").val(e.data.id);var a=document.createElement("textarea");a.innerHTML=e.data.name,$("#editName").val(a.value),$("#editModal").appendTo("body").modal("show")}},error:function(e){displayErrorMessage(e.responseJSON.message)}})},$(document).on("submit","#editForm",(function(a){a.preventDefault(),processingBtn("#editForm","#btnEditSave","loading");var s=$("#serviceId").val();$.ajax({url:route("services.update",s),type:"put",data:$(this).serialize(),success:function(a){a.success&&(displaySuccessMessage(a.message),$("#editModal").modal("hide"),e.DataTable().ajax.reload(null,!0))},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){processingBtn("#editForm","#btnEditSave")}})})),$(document).on("click",".delete-btn",(function(){var e=$(this).attr("data-id");deleteItem(route("services.destroy",e),"#servicesTable",Lang.get("messages.common.service"))})),$("#addModal").on("hidden.bs.modal",(function(){resetModalForm("#addNewForm","#validationErrorsBox")})),$("#editModal").on("hidden.bs.modal",(function(){resetModalForm("#editForm","#editValidationErrorsBox")}))})();