(()=>{"use strict";$(document).ready((function(){$("#goalTypeId").select2({width:"180px"})})),$(document).on("click",".delete-btn",(function(e){var n=$(e.currentTarget).data("id");deleteItemLiveWire(route("goals.destroy",n),Lang.get("messages.common.goal"))})),$(document).on("mouseenter",".livewire-card",(function(){$(this).find(".action-dropdown").removeClass("d-none")})),$(document).on("mouseleave",".livewire-card",(function(){$(this).find(".action-dropdown").addClass("d-none"),$(this).parent().trigger("click")})),$(document).on("change","#goalTypeId",(function(){window.livewire.emit("filterStatus",$(this).val())}))})();