$(document).ready((function(){$("#prefs-form").submit((function(e){e.preventDefault(),$.ajax({url:"ajax/savepreferences.php",type:"post",data:$("#prefs-form").serialize()}).done((function(e){e.error_msg?$("#msgbox").html(e.error_msg).removeClass().addClass("alert alert-danger"):($("#msgbox").html("<strong>Great!</strong> Your preferences were successfully saved.").removeClass().addClass("alert alert-success"),$(window).scrollTop(0),setTimeout((()=>{window.location.replace("texts.php")}),2e3))})).fail((function(e,r,s){$("#msgbox").html("<strong>Oops!</strong> Something went wrong when trying to save your preferences.").removeClass().addClass("alert alert-danger")}))}))}));