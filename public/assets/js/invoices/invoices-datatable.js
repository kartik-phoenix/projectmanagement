(()=>{"use strict";$(document).ready((function(){$("#paymentStatus").select2({width:"150px"})})),$(document).on("click",".delete-btn",(function(){var e=$(this).attr("data-id");deleteItemLiveWire(route("invoices.destroy",e),Lang.get("messages.contact.invoice"))})),$(document).on("change","#paymentStatus",(function(){window.livewire.emit("filterStatus",$(this).val())})),$(document).on("mouseenter",".livewire-card",(function(){$(this).find(".invoice-action-btn").removeClass("d-none")})),$(document).on("mouseleave",".livewire-card",(function(){$(this).find(".invoice-action-btn").addClass("d-none"),$(this).parent().trigger("click")})),null===customerId&&document.addEventListener("livewire:load",(function(e){Livewire.hook("message.processed",(function(e,t){var n=$(".owl-carousel");n.trigger("destroy.owl.carousel"),n.html(n.find(".owl-stage-outer").html()).removeClass("owl-loaded"),livewireLoadOwel(n)}))})),$(document).ready((function(){$("#invoicePaymentStatus").select2()})),$(document).on("change","#invoicePaymentStatus",(function(){window.livewire.emit("filterStatus",$(this).val())})),document.addEventListener("DOMContentLoaded",(function(e){Livewire.hook("message.received",(function(e,t){setTimeout((function(){$(document).find("#invoicePaymentStatus").select2("destroy"),$(document).find("#invoicePaymentStatus").select2(),$(document).find(".select2").removeClass("opacity-0")}),200)}))}))})();