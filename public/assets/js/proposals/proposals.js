(()=>{"use strict";$(document).ready((function(){$(".datepicker").datetimepicker({format:"YYYY-MM-DD HH:mm:ss",useCurrent:!1,sideBySide:!0,maxDate:new Date,icons:{up:"fa fa-chevron-up",down:"fa fa-chevron-down",next:"fa fa-chevron-right",previous:"fa fa-chevron-left"}}),$(".due-datepicker").datetimepicker({format:"YYYY-MM-DD HH:mm:ss",useCurrent:!1,sideBySide:!0,icons:{up:"fa fa-chevron-up",down:"fa fa-chevron-down",next:"fa fa-chevron-right",previous:"fa fa-chevron-left"}}),$(".datepicker, .due-datepicker").on("dp.show",(function(){matchWindowScreenPixels({datepicker:".datepicker",dueDatePicker:".due-datepicker"},"exp")})),setTimeout((function(){1==editData&&""!==$(".due-datepicker").val()?$(".due-datepicker").data("DateTimePicker").minDate($(".due-datepicker").val()):$(".due-datepicker").data("DateTimePicker").minDate(moment().millisecond(0).second(0).minute(0).hour(0))}),1e3),$("#proposalCurrencyId").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_currency")}),$("#discountTypeSelect").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_discount_type")}),$(".related-select-box").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_option")}),$(".assigned-select-box").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_member")}),$(".currency-select-box").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_member")}),$(".status-select-box").select2({width:"100%"}),$("#leadOwnerId").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_lead")}),$("#customerSelectBox").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_customer")}),$(".ownerid-select-box").prop("disabled",!0),setTimeout((function(){""!==$("#relatedToId").val()&&$("#relatedToId").val($("#relatedToId").val()).trigger("change")}),500),$(document).on("change",".related-select-box",(function(){var e=$(this).val();if($(".ownerid-select-box").prop("disabled",!0),$(".related-to-field1, .related-to-field2").hide(),e>0&&($(".related-to-field"+e).show(),$(".related-to-field"+e+" .ownerid-select-box").prop("disabled",!1)),1==e&&($("#address_to").html("_ _ _ _ _ _"),$("#addressStreet,#addressCity,#addressState,#addressZipCode,#addressCountry").val("")),2==e){var a=$("#customerSelectBox").val();isEmpty(a)||t(a)}})),$(document).on("keyup",".phone",(function(){$(this).val($(this).val().replace(/[^0-9.]/g,"").replace(/(\..*)\./g,"$1"))})),$("#addItemSelectBox").on("select2:select",(function(){var e=$(this).val();$.ajax({url:route("products.edit",e),type:"GET",success:function(e){""!==$(".items-container>tr:last-child").find(".item-name").val()&&$("#itemAddBtn").trigger("click");var t=$(".items-container>tr:last-child"),a=document.createElement("textarea");a.innerHTML=e.data.title,t.find(".item-name").val(a.value),t.find(".item-description").val($(e.data.description).text()),t.find(".qty").val("1").trigger("keyup"),t.find(".rate").val(e.data.rate).trigger("keyup");var s=[];e.data.first_tax&&s.push(e.data.first_tax.id),e.data.second_tax&&s.push(e.data.second_tax.id),t.find(".tax-rates").val(s).trigger("change")}})})),$(document).on("click","#saveAsDraft, #saveAndSend",(function(e){var t=$(this).data("status");if(""!==$("#error-msg").text())return $("#phoneNumber").focus(),!1;e.preventDefault();var a=document.getElementById("proposalForm"),s=new FormData(a);s.append("status",t);var d,r,o,n,i,c,l,p,u=0,m=[];c=$(".total-numbers").text(),$(".items-container>tr").each((function(){m=[],d=$(this).find(".item-name").val(),r=$(this).find(".item-description").val(),o=$(this).find(".qty").val(),n=$(this).find(".rate").val(),i=$(this).find(".item-amount").text(),$.each($($(this).find(".tax-rates option:selected")),(function(){m.push($(this).val())})),s.append("itemsArr["+u+"][item]",d),s.append("itemsArr["+u+"][description]",r),s.append("itemsArr["+u+"][quantity]",o),s.append("itemsArr["+u+"][rate]",n),s.append("itemsArr["+u+"][total]",i),s.append("itemsArr["+u+"][tax]",m),u++})),$("#taxesListTable>tr").each((function(){l=(l=$(this).find(".tax-value").text()).replace("%",""),p=$(this).find(".footer-tax-numbers").text(),s.append("taxes["+l+"]",p)})),s.append("total_amount",c),s.append("sub_total",$("#subTotal").text()),$.ajax({url:route("proposals.store"),type:"POST",data:s,processData:!1,contentType:!1,beforeSend:function(){startLoader()},success:function(e){if(e.success){var t=e.data.id;window.location=proposalUrl+"/"+t}},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){stopLoader()}})})),$(document).on("click","#editSaveSend",(function(e){var t=$(this).data("status");if(""!==$("#error-msg").text())return $("#phoneNumber").focus(),!1;e.preventDefault();var a=document.getElementById("editProposalForm"),s=new FormData(a);s.append("status",t);var d,r,o,n,i,c,l,p,u=0,m=[];c=$(".total-numbers").text(),$(".items-container>tr").each((function(){m=[],d=$(this).find(".item-name").val(),r=$(this).find(".item-description").val(),o=$(this).find(".qty").val(),n=$(this).find(".rate").val(),i=$(this).find(".item-amount").text(),$.each($($(this).find(".tax-rates option:selected")),(function(){m.push($(this).val())})),s.append("itemsArr["+u+"][item]",d),s.append("itemsArr["+u+"][description]",r),s.append("itemsArr["+u+"][quantity]",o),s.append("itemsArr["+u+"][rate]",n),s.append("itemsArr["+u+"][total]",i),s.append("itemsArr["+u+"][tax]",m),u++})),$("#taxesListTable>tr").each((function(){l=(l=$(this).find(".tax-value").text()).replace("%",""),p=$(this).find(".footer-tax-numbers").text(),s.append("taxes["+l+"]",p)})),s.append("total_amount",c),s.append("sub_total",$("#subTotal").text());var f=$("#hdnProposalId").val();$.ajax({url:route("proposals.update",f),type:"POST",data:s,processData:!1,contentType:!1,beforeSend:function(){startLoader()},success:function(e){if(e.success){var t=e.data.id;window.location=proposalEditURL+"/"+t}},error:function(e){displayErrorMessage(e.responseJSON.message)},complete:function(){stopLoader()}})})),"undefined"!=typeof proposalEdit&&proposalEdit&&($(".related-select-box").trigger("change"),$(".tax-rates").trigger("change"),$(".qty").trigger("keyup"),$("#adjustment").trigger("keyup"),window.calculateSubTotal()),$(".address-modal").on("show.bs.modal",(function(){setTimeout((function(){$("#addressStreet").focus()}),500)})),window.checkAddressFields=function(){return $("#addressStreet,#addressCity,#addressState,#addressZipCode,#addressCountry").filter((function(){return""!=this.value}))},window.showAddressError=function(e){$(".address-modal").modal("show"),displayErrorMessage($(e).data("err-msg"))},window.checkStreetField=function(){return""!==$.trim($("#addressStreet").val())||(showAddressError("#addressStreet"),!1)};var e=$("#addressForm");function t(e){$.ajax({url:route("get.proposal.customer.address"),type:"GET",data:{customer_id:e},success:function(e){if(e.success)if(isEmpty(e.data))$("#addressStreet").val(""),$("#addressCity").val(""),$("#addressState").val(""),$("#addressZipCode").val(""),$("#addressCountry").val(""),$("#address_to").html("_ _ _ _ _ _");else{var t=e.data;$("#address_to").empty(),$("#address_to").append("<span>"+t.street+",</span><br>"),$("#address_to").append("<span>"+t.city+", </span>"),$("#address_to").append("<span>"+t.state+",</span><br>"),$("#address_to").append("<span>"+t.country+" - </span>"),$("#address_to").append("<span>"+t.zip+"</span>"),$("#addressStreet").val(e.data.street),$("#addressCity").val(e.data.city),$("#addressState").val(e.data.state),$("#addressZipCode").val(e.data.zip),$("#addressCountry").val(e.data.country)}},error:function(e){displayErrorMessage(e.responseJSON.message)}})}"undefined"!=typeof editProposalAddress&&editProposalAddress&&(0==checkAddressFields().length?$("#address_to").html("_ _ _ _ _ _"):$("#address_to").html(getAddressDetail(e))),$(document).on("click","#btnSaveAddress",(function(){if(!checkStreetField())return!1;"undefined"!=typeof createProposalAddress&&createProposalAddress&&(0==checkAddressFields().length?$("#address_to").html("_ _ _ _ _ _"):$("#address_to").html(createAddressDetail(e))),"undefined"!=typeof editProposalAddress&&editProposalAddress&&(0==checkAddressFields().length?$("#address_to").html("_ _ _ _ _ _"):$("#address_to").html(getAddressDetail(e))),$(".address-modal").modal("hide")})),$(document).on("change","#customerSelectBox",(function(){var e=$(this).val();isEmpty(e)||t(e)}))}))})();