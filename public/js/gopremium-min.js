$(document).ready((function(){$("#btn-premium-1m, #btn-premium-3m, #btn-premium-6m, #btn-premium-1y").on("click",(function(){var i=$("#lbl-premium-period").clone();$("#lbl-premium-price").text("$"+$(this).data("price")),$("#lbl-premium-price").append(i),$("#lbl-premium-period").text("/"+$(this).text()+" pass"),$("#inp-item-nbr").val($(this).data("item-nbr")),$(this).siblings().removeClass("active"),$(this).addClass("active")}))}));