(()=>{"use strict";var e=route("contract-types.store");$(document).ready((function(){$(document).on("submit","#addContract, #editContract",(function(){jQuery(this).find("#btnSave").button("loading");var e=""===$("<div />").html($("#contractDescription").summernote("code")).text().trim().replace(/ \r\n\t/g,"");if($("#contractDescription").summernote("isEmpty"))$("#contractDescription").val("");else if(e){return displayErrorMessage("Description field is not contain only white space"),jQuery(this).find("#btnSave").button("reset"),!1}})),$("#contractTypeId").select2({width:"calc(100% - 44px)",placeholder:Lang.get("messages.placeholder.select_contract_type")}),$("#customer").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_customer")}),$(".price-input").trigger("input"),$(".startDate").datetimepicker({format:"YYYY-MM-DD HH:mm:ss",useCurrent:!1,sideBySide:!0,widgetPositioning:{horizontal:"left",vertical:"bottom"},maxDate:new Date,icons:{up:"fa fa-chevron-up",down:"fa fa-chevron-down",next:"fa fa-chevron-right",previous:"fa fa-chevron-left"}}),$(".endDate").datetimepicker({format:"YYYY-MM-DD HH:mm:ss",useCurrent:!1,sideBySide:!0,icons:{up:"fa fa-chevron-up",down:"fa fa-chevron-down",next:"fa fa-chevron-right",previous:"fa fa-chevron-left"}}),$(".startDate").on("dp.show",(function(){matchWindowScreenPixels({startDate:".startDate"},"con")})),$(".endDate").on("dp.show",(function(){matchWindowScreenPixels({endDate:".endDate"},"con")})),setTimeout((function(){"undefined"!=typeof editData&&""!==$(".endDate").val()?$(".endDate").data("DateTimePicker").minDate($(".endDate").val()):$(".endDate").data("DateTimePicker").minDate(moment().millisecond(0).second(0).minute(0).hour(0))}),1e3)})),$(document).on("submit","#addContractTypeForm",(function(t){t.preventDefault(),processingBtn("#addContractTypeForm","#btnSave","loading"),$.ajax({url:e,type:"POST",data:$(this).serialize(),success:function(e){if(e.success){displaySuccessMessage(e.message),$("#addContractTypeModal").modal("hide");var t={id:e.data.id,name:e.data.name},a=new Option(t.name,t.id,!1,!0);$("#contractTypeId").append(a).trigger("change")}},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){processingBtn("#addContractTypeForm","#btnSave")}})})),$("#addContractTypeModal").on("hidden.bs.modal",(function(){resetModalForm("#addContractTypeForm","#validationErrorsBox")}))})();