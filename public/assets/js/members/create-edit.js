(()=>{"use strict";$(document).ready((function(){$("#languageId").select2({width:"100%"}),$(".price-input").trigger("input"),$(document).on("click",".password-show",(function(){var e=$("#password");"password"===e.attr("type")?(e.attr("type","text"),$("#show_hide_password i").removeClass("fa-eye-slash"),$("#show_hide_password i").addClass("fa-eye")):(e.attr("type","password"),$("#show_hide_password i").addClass("fa-eye-slash"),$("#show_hide_password i").removeClass("fa-eye"))})),$(document).on("click",".cPassword-show",(function(){var e=$("#cPassword");"password"===e.attr("type")?(e.attr("type","text"),$("#show_hide_cPassword i").removeClass("fa-eye-slash"),$("#show_hide_cPassword i").addClass("fa-eye")):(e.attr("type","password"),$("#show_hide_cPassword i").addClass("fa-eye-slash"),$("#show_hide_cPassword i").removeClass("fa-eye"))})),$(document).on("keyup","#facebookUrl",(function(){this.value=this.value.toLowerCase()})),$(document).on("keyup","#linkedInUrl",(function(){this.value=this.value.toLowerCase()})),$(document).on("keyup","#skypeUrl",(function(){this.value=this.value.toLowerCase()})),$(document).on("submit","#createMember, #editMember",(function(){var e=$("#facebookUrl").val(),s=$("#linkedInUrl").val(),a=$("#skypeUrl").val(),o=new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)facebook.[a-z]{2,3}\/?.*/i),t=new RegExp(/^(https?:\/\/)?((w{2,3}\.)?)linkedin\.[a-z]{2,3}\/?.*/i),r=new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)skype.[a-z]{2,3}\/?.*/i);return""!=e&&!e.match(o)?(displayErrorMessage("Please enter a valid Facebook Url"),!1):""!=s&&!s.match(t)?(displayErrorMessage("Please enter a valid Linkedin Url"),!1):""!=a&&!a.match(r)?(displayErrorMessage("Please enter a valid Skype Url"),!1):""!==$("#error-msg").text()?($("#phoneNumber").focus(),!1):void jQuery(this).find("#btnSave").button("loading")})),$(document).on("change","#logo",(function(){isValidFile($(this),"#validationErrorsBox")?(displayPhoto(this,"#logoPreview"),$("#btnSave").prop("disabled",!1)):$("#btnSave").prop("disabled",!0)}))}))})();