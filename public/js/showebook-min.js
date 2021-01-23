$(document).ready((function(){var e=$("script[src*='showebook-min.js']").attr("data-id"),t=ePub();(new FormData).append("id",e),fetch("ajax/getebook.php?id="+e).then((function(e){if(200===e.status)return e;throw new Error(e.statusText)})).then(e=>e.arrayBuffer()).then(e=>function(e){var n=e;t.open(n);var o=t.renderTo("viewer",{flow:"scrolled-doc"}),a=document.getElementById("readerpage");function r(){var e=$(document).find('iframe[id^="epubjs"]'),t=[],n="";e.contents().find(".learning").each((function(){n=$(this).text().toLowerCase(),-1==jQuery.inArray(n,t)&&t.push(n)})),$.ajax({type:"POST",url:"/ajax/archivetext.php",async:!1,data:{words:t}}).fail((function(e,t,n){alert("Oops! There was an error updating the database.")})),window.parent.show_confirmation_dialog=!1}o.themes.register("darkmode","/css/ebooks-min.css"),o.themes.register("lightmode","/css/ebooks-min.css"),o.themes.register("sepiamode","/css/ebooks-min.css"),o.themes.default({body:{"font-family":a.style.fontFamily+" !important","font-size":a.style.fontSize+" !important","text-align":a.style.textAlign+" !important","line-height":a.style.lineHeight+" !important",padding:"0 5% !important"}}),o.themes.select(a.className),t.ready.then((function(){var e=t.key()+"-lastpos",n=localStorage.getItem(e);if(n)o.display(n);else{var a=window.location.hash.slice(2);o.display(a||void 0)}o.hooks.content.register((function(e){e.addScript("https://code.jquery.com/jquery-3.3.1.min.js").then((function(){Promise.all([e.addScript("/js/showtext-min.js"),e.addScript("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"),e.addScript("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js")]),$(".loading-spinner").fadeIn(1e3),$.ajax({type:"POST",url:"../ajax/underlinewords.php",data:{txt:e.content.innerHTML,is_ebook:!0}}).done((function(t){e.content.innerHTML=t,$(".loading-spinner").fadeOut(1e3)})).fail((function(e,t,n){alert("There was an unexpected error when trying to underline words for this ebook!")}))}))})),document.getElementById("next").addEventListener("click",(function(e){e.preventDefault(),$.when(r()).then((function(){o.next(),$("html, body").animate({scrollTop:0},"slow")}))}),!1),document.getElementById("prev").addEventListener("click",(function(e){e.preventDefault(),$.when(r()).then((function(){o.prev(),$("html, body").animate({scrollTop:0},"slow")}))}),!1)})),o.on("rendered",(function(e){var n=e.next(),o=e.prev();n?(nextNav=t.navigation.get(n.href),nextNav?nextLabel=nextNav.label:nextLabel="next",next.textContent=nextLabel+" »"):next.textContent="",o?(prevNav=t.navigation.get(o.href),prevNav?prevLabel=prevNav.label:prevLabel="previous",prev.textContent="« "+prevLabel):prev.textContent=""})),$("body").on("click","#btn-save",(function(){var e=o.currentLocation().start.cfi;localStorage.setItem(t.key()+"-lastpos",e),r(),window.location.replace("texts.php")})),o.on("relocated",(function(e){})),parent.window.addEventListener("unload",(function(){t.destroy()}));var i=document.getElementById("navigation"),s=document.getElementById("main");document.getElementById("opener").addEventListener("click",(function(e){i.classList.toggle("sidebar-closed"),s.classList.toggle("sidebar-opened"),e.preventDefault()}),!1),t.loaded.navigation.then((function(e){var t=document.getElementById("toc"),n=document.createDocumentFragment(),a=function(e,t){var n=document.createElement("ul");t.forEach((function(e){var t=document.createElement("li"),r=document.createElement("a");r.textContent=e.label,r.href=e.href,t.appendChild(r),e.subitems&&a(t,e.subitems),r.onclick=function(){var e=r.getAttribute("href");return o.display(e),i.classList.add("closed"),!1},n.appendChild(t)})),e.appendChild(n)};a(n,e),t.appendChild(n),t.offsetHeight+60<window.innerHeight&&t.classList.add("fixed")})),t.loaded.metadata.then((function(e){var n=document.getElementById("title"),o=document.getElementById("book-title"),a=document.getElementById("author"),r=document.getElementById("cover");null!=n&&(n.textContent=e.title,o.textContent=e.title,a.textContent=e.creator,t.archive?t.archive.createUrl(t.cover).then((function(e){r.src=e})):r.src=t.cover)}))}(e)).catch((function(e){alert(e.message),window.location.replace("texts.php")}))}));