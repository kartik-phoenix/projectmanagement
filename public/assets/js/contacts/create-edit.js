(()=>{"use strict";$(document).ready((function(){$("#customerId").select2({width:"100%",placeholder:Lang.get("messages.placeholder.select_customer")}),$(document).on("submit","#createContact, #editContact",(function(){if(jQuery(this).find("#btnSave").button("loading"),""!==$("#error-msg").text())return $("#phoneNumber").focus(),!1})),$(document).on("click",".password-show",(function(){var s=$("#password");"password"===s.attr("type")?(s.attr("type","text"),$("#show_hide_password i").removeClass("fa-eye-slash"),$("#show_hide_password i").addClass("fa-eye")):(s.attr("type","password"),$("#show_hide_password i").addClass("fa-eye-slash"),$("#show_hide_password i").removeClass("fa-eye"))})),$(document).on("click",".cPassword-show",(function(){var s=$("#cPassword");"password"===s.attr("type")?(s.attr("type","text"),$("#show_hide_cPassword i").removeClass("fa-eye-slash"),$("#show_hide_cPassword i").addClass("fa-eye")):(s.attr("type","password"),$("#show_hide_cPassword i").addClass("fa-eye-slash"),$("#show_hide_cPassword i").removeClass("fa-eye"))})),$(document).on("change","#profileImage",(function(){isValidFile($(this),"#validationErrorsBox")?(displayPhoto(this,"#previewImage"),$("#btnSave").prop("disabled",!1)):$("#btnSave").prop("disabled",!0)}))}))})();