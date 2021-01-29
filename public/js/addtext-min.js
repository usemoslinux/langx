$(document).ready((function(){function e(e,t){$("#alert-msg").html(e).removeClass().addClass("alert "+t),$(window).scrollTop(0)}function t(){!function(e){$("#alert-msg").addClass("d-none"),$("#type").prop("selectedIndex",0),$("#title").val(""),$("#author").val(""),$("#title").val(""),$("#text").val(""),$("#upload-text").val(""),$("#audio-uri").val(""),e||$("#url").val("");$("#shared-text").prop("checked",!1)}(!0);var t=$("#url").val();""!=t&&($("#btn-fetch-img").removeClass().addClass("fas fa-sync fa-spin"),$.ajax({type:"GET",url:"ajax/fetchurl.php",data:{url:t}}).done((function(t){if(null!=t.error_msg)e(t.error_msg,"alert-danger");else if(void 0!==t&&0!=t.length){var a=document.implementation.createHTMLDocument("New Document");a.body.parentElement.innerHTML=t;var n=new Readability(a).parse();$("#title").val(n.title),$("#author").val(n.byline);var r="",l=$("<output>").append($.parseHTML(n.content));$("p, h1, h2, h3, h4, h5, h6",l).each((function(){r+=$(this).text().replace(/\s+/g," ")+"\n\n"})),r=(r=r.replace(/(\n){3,}/g,"\n")).replace(/\t/g,""),$("#text").val($.trim(r)),$("#text").trigger("input")}else e("Oops! There was an error trying to fetch this text.","alert-danger")})).fail((function(t,a,n){e("Oops! There was an error trying to fetch this text.","alert-danger")})).always((function(){$("#btn-fetch-img").removeClass().addClass("fas fa-arrow-down")})))}$("#external_call").length&&t(),$("#form-addtext").on("submit",(function(t){t.preventDefault();var a=new FormData(document.getElementById("form-addtext"));$.ajax({type:"POST",url:"ajax/addtext.php",data:a,dataType:"json",contentType:!1,processData:!1}).done((function(t){void 0!==t?e(t.error_msg,"alert-danger"):"on"==a.get("shared-text")?window.location.replace("sharedtexts.php"):window.location.replace("texts.php")})).fail((function(t,a,n){e("Oops! There was an unexpected error when uploading this text.","alert-danger")}))})),$("#btn-upload-audio").on("click",(function(){$("#audio-uri").trigger("click")})),$("#text").on("input",(function(){var e=$(this),t=$("#span-chars-left"),a=1e4-e.val().length;a<0?(t.removeClass("text-success").addClass("text-danger"),t.text(a.toLocaleString()+" over maximum")):(t.removeClass("text-danger").addClass("text-success"),t.text(a.toLocaleString()+" left"))})),$("#upload-text").on("change",(function(){var t=$(this)[0].files[0],a=new FileReader;a.onload=function(t){var a=t.target.result;a.length>1e4?e("This file has more than 10,000 characters. Please try again with a shorter one.","alert-danger"):$("#text").val($.trim(a))},a.readAsText(t)})),$("#btn-fetch").on("click",t),$("#text").text().length>0&&$("#text").trigger("input")}));