$(document).ready((function(){function e(e,t){$("#alert-msg").html(e).removeClass().addClass("alert "+t),$(window).scrollTop(0)}function t(){0==$("#external_call").length&&($("input").not(":hidden").val(""),$("#text").val(""),$("#yt-video").attr("src","about:blank"))}function a(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}t(),$("#url").focus(),$("#form-addvideo").on("submit",(function(t){t.preventDefault();var a=$("#form-addvideo").serializeArray();a.push({name:"shared-text",value:!0}),$.ajax({type:"POST",url:"ajax/addtext.php",data:a}).done((function(t){void 0!==t?void 0!==t.error_msg&&e(t.error_msg,"alert-danger"):window.location.replace("sharedtexts.php")})).fail((function(t,a,r){e("Oops! There was an unexpected error when uploading this text.","alert-danger")}))})),$("#btn-fetch").on("click",(function(){var r=$("#url").val();if(video_id=function(e){if(0===e.lastIndexOf("https://youtu.be/"))return e.substr(17);var t=new Array("https://www.youtube.com/watch","https://m.youtube.com/watch"),a=e.split("?"),r=a[1].split("&");for(let e=0;e<t.length;e++)if(0===a[0].lastIndexOf(t[e]))for(let e=0;e<r.length;e++)if(0===r[e].lastIndexOf("v="))return r[e].substring(2)}(r),t(),""!=video_id){var o="https://www.youtube.com/embed/"+video_id;$("#error-msg").addClass("d-none"),$("#btn-fetch-img").removeClass().addClass("fas fa-sync fa-spin"),$.ajax({type:"POST",url:"ajax/fetchvideo.php",data:{video_id:video_id}}).done((function(t){void 0!==t&&(void 0!==t.error_msg?e(t.error_msg,"alert-danger"):($("#yt-video").length&&$("#yt-video").get(0).contentWindow.location.replace(o),$("#title").val(a(t.title)),$("#author").val(a(t.author)),$("#url").val(r),""==t.text?($("#text").val(""),e('This video does not include valid audio transcripts. Please make sure to use <a class="alert-link" href="https://www.youtube.com/results?sp=EgIoAQ%253D%253D&search_query=yoursearchterms" target="_blank" rel="noopener noreferrer">videos that include transcripts</a> in the language your are learning and that are not auto-generated by Google.',"alert-danger")):($("#text").val(t.text),$("#alert-msg").addClass("d-none"))))})).fail((function(t,a,r){e("Oops! There was an unexpected error trying to get that video. Please try again later.","alert-danger")})).always((function(){$("#btn-fetch-img").removeClass().addClass("fas fa-arrow-down")}))}else e('Malformed Youtube URL link. It should have the following format: https://www.youtube.com/watch?v=video_id or https://youtu.be/video_id<br>Remember to replace "video_id" with the corresponding video ID and try again.',"alert-danger")})),$("#external_call").length&&$("#btn-fetch").trigger("click")}));