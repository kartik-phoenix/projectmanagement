(()=>{"use strict";$(document).ready((function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")}}),$(document).on("click","#invoiceStripePayment",(function(){var n=this,e={invoiceId:invoiceID};$(this).html('<div class="spinner-border spinner-border-sm" role="status">\n<span class="sr-only">Loading...</span>\n</div>  Loading...'),$(this).addClass("disabled"),$.post(invoiceStripePaymentUrl,e).done((function(n){var e=n.data.sessionId;stripe.redirectToCheckout({sessionId:e}).then((function(n){manageAjaxErrors(n)}))})).catch((function(e){manageAjaxErrors(e),$(n).removeClass("disabled")}))}))}))})();