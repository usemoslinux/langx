$(document).ready((function(){$("#btn-save-reader-prefs").on("click",(function(){$doc=$(parent.document.body),$doc.css({"font-family":$("#fontfamily").val(),"font-size":$("#fontsize").val(),"text-align":$("#alignment").val(),"line-height":$("#lineheight").val()}),$("#text").css("line-height",$("#lineheight").val()),$doc.removeClass().addClass($("#mode").val()+"mode"),$.ajax({url:"/ajax/savepreferences.php",type:"POST",data:$("#prefs-modal-form").serialize()})}))}));