function googleSignIn(e){var a=e.getBasicProfile();$.ajax({type:"POST",data:{id:a.getId(),name:a.getName(),email:a.getEmail()},url:"ajax/google_oauth.php"}).done((function(e){null==e.error_msg?window.location.replace("texts.php"):showMessage(e.error_msg,"alert-danger")})).fail((function(e,a,r){showMessage("Oops! There was an unexpected error when trying to register you. Please try again later.","alert-danger")}))}function showMessage(e,a){$("#error-msg").html(e).removeClass().addClass("alert "+a),$(window).scrollTop(0)}$(document).ready((function(){$("#form_login").on("submit",(function(e){e.preventDefault();var a=$("#form_login").serialize();$.ajax({type:"POST",url:"ajax/login.php",data:a}).done((function(e){null==e.error_msg?window.location.replace("texts.php"):showMessage(e.error_msg,"alert-danger")})).fail((function(e,a,r){showMessage("Oops! There was an unexpected error when trying to log you in. Please try again later.","alert-danger")}))}))}));