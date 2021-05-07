$(document).ready((function(){var e,t,a,n,o,r=!1,i=!1,s=null,l=null,d="",p="",u="",c=2,h=!1,g=0,w=0;window.parent.show_confirmation_dialog=!0;var m=$("html").attr("lang"),f=$(parent.document),v=f.find("#dicFrame"),y=f.find('iframe[id^="epubjs"]');function x(e){var t=(new Date).getTime(),a=$("#audioplayer");t-e>1e3&&!a.prop("ended")?a.trigger("play"):(!a.prop("paused")&&a.trigger("pause"),l=setTimeout((()=>{x(e)}),1e3))}function b(){var e=s.prevUntil(":contains('.')").last();e=e.length>0?e:s;var t=s.prev().nextUntil(":contains('.')").last().next();t=t.length>0?t:s.nextAll().last().next();var a=e.nextUntil(t).addBack().next().addBack().text().replace(/(\r\n|\n|\r)/gm," ");return p.replace("%s",encodeURI(a))}function k(){var e=[],t=[],a="",n=!0,o=$("#is_shared").length>0,r=0;$(".learning").each((function(){a=$(this).text().toLowerCase(),-1==$.inArray(a,e)&&e.push(a)})),t.push($("#text-container").attr("data-textID")),o&&(t=void 0,n=void 0),$.ajax({type:"POST",url:"/ajax/archivetext.php",data:{words:e,textIDs:JSON.stringify(t),archivetext:n}}).done((function(e){if(null==e.error_msg){var t={words:{new:$(".reviewing.new").length,learning:$(".reviewing.learning").length,forgotten:$(".reviewing.forgotten").length},texts:{reviewed:1}};$.ajax({type:"post",url:"ajax/updateuserscore.php",data:t}).done((function(e){if(null==e.error_msg){r=e.gems_earned,window.parent.show_confirmation_dialog=!1;var t=Number($(".word").length)+Number($(".phrase").length),a=$('<form action="/textstats.php" method="post"><input type="hidden" name="created" value="'+$(".reviewing.new").length+'" /><input type="hidden" name="reviewed" value="'+$(".reviewing.learning").length+'" /><input type="hidden" name="learned" value="'+$(".learned").length+'" /><input type="hidden" name="forgotten" value="'+$(".reviewing.forgotten").length+'" /><input type="hidden" name="total" value="'+t+'" /><input type="hidden" name="gems_earned" value="'+r+'" /><input type="hidden" name="is_shared" value="'+$("#is_shared").length+'" /></form>');$("body").append(a),a.submit()}else alert("Oops! There was an unexpected error.")})).fail((function(e,t,a){alert("Oops! There was an unexpected error.")}))}else alert("Oops! There was an unexpected error.")})).fail((function(e,t,a){alert("Oops! There was an unexpected error.")}))}function C(){var e=$("#audioplayer");e.prop("currentTime","0"),e.trigger("play")}function T(){0!=$("#audioplayer").find("source").attr("src")&&(0==$(".dict-answer").length?($(".learning, .new, .forgotten").each((function(e,t){var a=$(this),n=a.text().length,o=a.width(),r=a.css("font-size");a.hide().after('<div class="input-group dict-input-group"><input type="text" class="dict" style="width:'+o+"px; line-height:"+r+';" maxlength="'+n+'" data-text="'+a.text()+'"><span class="input-group-append dict-answer d-none"></span></div>')})),$("html, body").animate({scrollTop:0},"slow"),C(),$(":text:first").focus()):($(".learning, .new, .forgotten").each((function(e,t){$(this).show().nextAll(":lt(1)").remove()})),$("html, body").animate({scrollTop:0},"slow"),$("#audioplayer").trigger("pause")))}function _(){0!=$("#audioplayer").find("source").attr("src")||(0==$(".learning, .new, .forgotten").length?($("#btn-next-phase").html('Finish & Save<br><span class="small">Skipped some phases: no audio detected & no underlined words</span>'),c=6):($("#btn-next-phase").html('Go to phase 5<br><span class="small">Skipped some phases: no audio detected</span>'),c=5))}y=y.length>0?y:$("html"),"text"==$("#text-container").data("type")&&$.ajax({type:"POST",url:"/ajax/getuserwords.php",data:{txt:$("#text").text()},dataType:"json"}).done((function(e){$("#text").html(underlineWords(e,m))})).fail((function(e,t,a){})).always((function(){_()})),$(window).on("keydown",(function(e){var t=$("#audioplayer");if(t.length&&e.ctrlKey)switch(e.keyCode){case 32:t.prop("paused")?t.trigger("play"):t.trigger("pause");break}})),$("body").on("input","input:text",(function(e){var t=(new Date).getTime();9!=(e.keyCode||e.which)&&(clearTimeout(l),x(t))})),$("body").on("click","#btn-abloop",(function(e){e.preventDefault(),e.stopPropagation(),0==g&&0==w?(g=$("#audioplayer").prop("currentTime"),$(this).text("B")):g>0&&0==w?(w=$("#audioplayer").prop("currentTime"),$(this).text("C")):(g=w=0,$(this).text("A"))})),$("#audioplayer").on("timeupdate",(function(){w>0&&$(this).prop("currentTime")>=w&&$(this).prop("currentTime",g)})),$(document).on("contextmenu",(function(e){return e.preventDefault(),!1})),$(document).on("mousedown touchstart",".word",(function(n){n.stopPropagation(),n.which<2?(r=!0,e=t=$(this),"touchstart"==n.type&&(a=new Date,o=e.offset().top-$(window).scrollTop())):3==n.which&&(s=$(this),window.open(b()))})),$(document).on("mouseup touchend",".word",(function(o){if(o.stopPropagation(),n=new Date,"touchend"==o.type&&(i||(r=n-a>1e3),$("html").css({overflow:"visible"}),i=!1),r&&o.which<2){if(r=!1,e===t){var l=$(this).closest(".learning, .learned, .forgotten");s=l.length?l:$(this)}!function(){var e=$("#audioplayer");e.length&&(!e.prop("paused")&&e.prop("currentTime")?(e.trigger("pause"),h=!0):h=!1);o=s.text(),r=m,i=f.find("#bdgfreqlvl"),$.ajax({type:"GET",url:"/ajax/getwordfreq.php",data:{word:o,lg_iso:r}}).done((function(e){0==e?i.hide():e<81?i.hide().text("High frequency word").removeClass().addClass("badge badge-danger").show():e<97&&i.hide().text("Medium frequency word").removeClass().addClass("badge badge-warning").show()})).fail((function(){i.hide()})),t=$(parent.document).find("#btnremove"),a=$(parent.document).find("#btnadd"),n=s.filter(".learning, .new, .forgotten, .learned").length,s.filter(".word").length==n?!1===t.is(":visible")&&(t.show(),a.text("Forgot")):(t.hide(),a.text("Add")),f.find("#iframe-loader").attr("class","lds-ripple m-auto"),v.attr("class","d-none"),u=b();var t,a,n;var o,r,i;var l=s.text().replace(/\r?\n|\r/gm," "),p=d.replace("%s",encodeURIComponent(l));v.get(0).contentWindow.location.replace(p),$("#btnadd").focus(),f.find("#myModal").modal("show")}()}a=n=new Date})),$.fn.isAfter=function(e){return this.prevUntil(e).length!==this.prevAll().length},$(document).on("mouseover touchmove",".word",(function(l){if(l.stopPropagation(),n=new Date,"touchmove"==l.type){var d=$(this).offset().top-$(window).scrollTop();(i=i||Math.abs(o-d)>0)||(r=n-a>1e3)}r&&("touchmove"==l.type&&$("html").css({overflow:"hidden"}),$(".word").removeClass("highlighted"),(t="mouseover"===l.type?$(this):$(document.elementFromPoint(l.originalEvent.touches[0].clientX,l.originalEvent.touches[0].clientY))).isAfter(e)?(e.nextUntil(t.next(),".word").addBack().addClass("highlighted"),s=e.nextUntil(t.next()).addBack()):(e.prevUntil(t.prev(),".word").addBack().addClass("highlighted"),s=t.nextUntil(e.next()).addBack()))})),$.ajax({url:"/ajax/getdicuris.php",type:"GET",dataType:"json"}).done((function(e){null==e.error_msg&&(d=e.dictionary_uri,p=e.translator_uri)})),v.on("load",(function(){f.find("#iframe-loader").attr("class","d-none"),v.removeClass()})),f.on("click","#btn-translate",(function(){window.open(u)})),f.on("click","#btnadd",(function(){var e=s.length>1?1:0,t=s.text(),a=0!=$("#audioplayer").find("source").attr("src");$.ajax({type:"POST",url:"/ajax/addword.php",data:{word:t,is_phrase:e}}).done((function(){var n=0==$(".learning, .new, .forgotten").length;if(e){var o=s.filter(".word").length;y.contents().find("span.word").filter((function(){return $(this).text().toLowerCase()===s.eq(0).text().toLowerCase()})).each((function(){var e=$(this).nextAll("span.word").slice(0,o-1).last(),a=$(this).nextUntil(e).addBack().next("span.word").addBack();a.text().toLowerCase()===t.toLowerCase()&&(a.wrapAll("<span class='word reviewing new' data-toggle='modal' data-target='#myModal'></span>"),a.contents().unwrap())}))}else{var r=y.contents().find("span.word").filter((function(){return $(this).text().toLowerCase()===t.toLowerCase()}));r.each((function(){var e=$(this);e.is(".new, .learning, .learned, .forgotten")?e.wrap("<span class='word reviewing forgotten' data-toggle='modal' data-target='#myModal'></span>"):e.wrap("<span class='word reviewing new' data-toggle='modal' data-target='#myModal'></span>")})),r.contents().unwrap()}6==c&&n&&(a?($("#btn-next-phase").html('Go to phase 4<br><span class="small">Writing</span>'),c=4):_())})).fail((function(e,t,a){alert("Oops! There was an error adding this word or phrase to the database.")})),s.removeClass("highlighted")})),f.on("click","#btnremove",(function(){var e=0!=$("#audioplayer").find("source").attr("src");$.ajax({type:"POST",url:"/ajax/removeword.php",data:{word:s.text()}}).done((function(){var t=y.contents().find("span.word").filter((function(){return $(this).text().toLowerCase()===s.text().toLowerCase()}));$.ajax({type:"POST",url:"/ajax/getuserwords.php",data:{txt:s.text()},dataType:"json"}).done((function(a){var n=$(underlineWords(a,m)),o={},r=/""/;t.each((function(){o=$(this),n.filter(".word").each((function(e){r=langs_with_no_word_separator.includes(m)?new RegExp("(?<![^])"+$(this).text()+"(?![$])","iug").exec(o.text()):new RegExp("(?<![\\p{L}|^])"+$(this).text()+"(?![\\p{L}|$])","iug").exec(o.text()),$(this).text(r);var t=$(this).text().toLowerCase(),n=a.user_words.find((function(e){return e.word==t}));void 0!==n&&(2==n.status?$(this).removeClass("learning").addClass("new"):3==n.status&&$(this).removeClass("learning").addClass("forgotten"))})),o.replaceWith(n.clone())})),4==c&&e>0&&0==$(".learning, .new, .forgotten").length&&($("#btn-next-phase").html('Finish & Save<br><span class="small">Skipped phase 4 (writing) & 5 (reviewing): no underlined words</span>'),c=6)}))})).fail((function(e,t,a){alert("Oops! There was an error removing the word from the database.")}))})),$("body").on("click","#btn-next-phase",(function(){var e=0!=$("#audioplayer").find("source").attr("src"),t=$("#alert-msg-phase");switch(c<6&&!e&&_(),c){case 2:$("html, body").animate({scrollTop:0},"slow"),c++,t.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><h5>Assisted learning - Phase 2: Listening</h5><span class="small">Pay attention to the pronunciation of each word. You can slow down the audio if necessary.</span>'),$(this).html('Go to phase 3<br><span class="small">Speaking</span>'),C();break;case 3:$("html, body").animate({scrollTop:0},"slow"),0==$(".learning, .new, .forgotten").length?($(this).html('Finish & Save<br><span class="small">Skipped phase 4 (writing) & 5 (reviewing): no underlined words</span>'),c=6):($(this).html('Go to phase 4<br><span class="small">Writing</span>'),c++),t.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><h5>Assisted learning - Phase 3: Speaking</h5><span class="small">Read the text out loud and try to emulate the pronunciation of each word as you listen to the audio. You can slow it down if necessary.</span>'),C();break;case 4:$("html, body").animate({scrollTop:0},"slow"),c++,$(this).html('Go to phase 5<br><span class="small">Reviewing</span>'),t.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><h5>Assisted learning - Phase 4: Writing</h5><span class="small">Fill in the blanks as you listen to the dictation.</span>'),T();break;case 5:$("html, body").animate({scrollTop:0},"slow"),c++,$(this).html("Finish & Save"),t.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><h5>Assisted learning - Phase 5: Reviewing</h5><span class="small"><u>This is the most <a href="https://en.wikipedia.org/wiki/Testing_effect" class="alert-link" target="_blank" rel="noopener noreferrer">critical phase</a> for long-term language acquisition.</u><br>Review all the underlined words, even the ones with green underlining. Make an effort to remember their meaning and pronunciation, while also paying attention to their spelling. Speak out alternative sentences using these words. The latter is essential to turn your <a href="https://en.wiktionary.org/wiki/passive_vocabulary" class="alert-link" target="_blank" rel="noopener noreferrer">passive vocabulary</a> into <a href="https://en.wiktionary.org/wiki/active_vocabulary" class="alert-link" target="_blank" rel="noopener noreferrer">active vocabulary</a>.</span>'),T();break;case 6:k();break;default:break}})),$("body").on("click","#btn-save",k),f.on("hidden.bs.modal","#myModal",(function(){var e=$("#audioplayer");h&&e.length&&e.trigger("play"),s.removeClass("highlighted")})),$("body").on("input change","#range-speed",(function(){var e=parseFloat($(this).val()).toFixed(1);$("#currentpbr").text(e),$("#audioplayer").prop("playbackRate",e)})),$("body").on("click","#btndictation",(function(){T()})),$("body").on("blur",":text",(function(){var e=$(this);e.val().toLowerCase()==e.attr("data-text").toLowerCase()?(e.css("border-color","green"),e.next("span").not(".d-none").addClass("d-none")):""!=$.trim(e.val())&&(e.css("border-color","crimson"),e.next("span").removeClass("d-none").addClass("dict-wronganswer").text("[ "+e.attr("data-text")+" ]"))})),$("body").on("input",".dict",(function(e){if(13===e.which){var t=$(".dict").index(this)+1;$(".dict").eq(t).focus()}})),f.on("click","#retry-audio-load",(function(e){e.preventDefault(),$("#alert-msg-audio").addClass("d-none"),$("#audioplayer-loader").removeClass("d-none"),function(){var e=$("#audioplayer");if(!(e.length>0))return!1;var t=$("#text").text();$.ajax({type:"POST",url:"/ajax/fetchaudiostream.php",data:{text:t,langiso:m},dataType:"json"}).done((function(t){return null==t.error&&t.response?($("#audio-mp3").attr("src",t.response),e[0].load(),$("#audioplayer-loader").addClass("d-none"),$("#audioplayer").removeClass("d-none"),$("#audioplayer-speedbar").removeClass("d-none"),$("#btn-next-phase").html('Go to phase 2<br><span class="small">Listening</span>'),c=2,!0):($("#audioplayer-loader").addClass("d-none"),$("#alert-msg-audio").removeClass("d-none").empty().append('There was an unexpected error trying to create audio from this text. <a class="alert-link" href="#" id="retry-audio-load">Try again</a> later.'),_(),!1)})).fail((function(e){return 403==e.status?($("#audioplayer-loader").addClass("d-none"),$("#alert-msg-audio").removeClass("d-none").empty().append('You have reached your audio streaming limit for today. Although it is possible to continue with the revision of the text, we do not recommend it. Alternatively, you can try again tomorrow or <a class="alert-link" href="gopremium.php">improve your plan</a> to increase your daily audio streaming limit.')):($("#audioplayer-loader").addClass("d-none"),$("#alert-msg-audio").removeClass("d-none").empty().append('There was an unexpected error trying to create audio from this text. <a class="alert-link" href="#" id="retry-audio-load">Try again</a> later.')),_(),!1}))}()})),$(document).on("click",y,(function(e){if(!1===$(e.target).is(".word")){e.stopPropagation();var t=$("#text-container").length?$("#text-container"):y.contents();r=!1,$("html").css({overflow:"visible"}),t.find(".highlighted").removeClass("highlighted")}})),$(window.parent).on("beforeunload",(function(){if(window.parent.show_confirmation_dialog)return"To save your progress, please click the Save button before you go. Otherwise, your changes will be lost. Are you sure you want to exit this page?"}))}));