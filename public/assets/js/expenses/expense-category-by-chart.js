(()=>{"use strict";$(document).ready((function(){var e=[],a=[],t=[],s=[];$.each(expenseCategories,(function(r,n){var o=Math.floor(16777215*Math.random()).toString(16),d=n.name;e.push(d.replace("&amp;","&")),a.push(n.expenses_count),t.push("#"+o),s.push("#"+o)}));var r=document.getElementById("expenseCategoryByChart");new Chart(r,{type:"bar",data:{labels:e,datasets:[{label:[Lang.get("messages.expense_by_category")],data:a,backgroundColor:t,borderColor:s,borderWidth:2}]},options:{responsive:!0,scales:{yAxes:[{ticks:{min:0}}]},legend:{display:!1}}})}))})();