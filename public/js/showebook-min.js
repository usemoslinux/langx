$(document).ready((function(){var e=$("html").attr("lang"),t=$("script[src*='showebook.js']").attr("data-id"),n=ePub(),a=document.getElementById("viewer");(new FormData).append("id",t),fetch("ajax/getebook.php?id="+t).then((function(e){if(200===e.status)return e;throw new Error(e.statusText)})).then((e=>e.arrayBuffer())).then((e=>n.open(e))).catch((function(e){alert("There was an unexpected problem opening this ebook file. Try again later."),window.location.replace("texts.php")}));var o=n.renderTo("viewer",{flow:"scrolled-doc"}),r=document.getElementById("readerpage");o.themes.register("darkmode","/css/ebooks-min.css"),o.themes.register("lightmode","/css/ebooks-min.css"),o.themes.register("sepiamode","/css/ebooks-min.css"),o.themes.default({body:{"font-family":r.style.fontFamily+" !important","font-size":r.style.fontSize+" !important","text-align":r.style.textAlign+" !important","line-height":r.style.lineHeight+" !important",padding:"0 5% !important"}}),o.themes.select(r.className),n.opened.then((function(){var e=n.key()+"-lastpos",t=localStorage.getItem(e);u(t||1)})),n.loaded.spine.then((e=>{e.each((e=>{e.load(n.load.bind(n))}))}));var i=document.getElementById("next");i.addEventListener("click",(function(e){e.preventDefault(),$.when(l()).then((function(){u(i.href.substr(i.href.indexOf("/",8)+1)),$("html, body").animate({scrollTop:0},"slow")}))}),!1);var d=document.getElementById("prev");function l(){$(document).find('iframe[id^="epubjs"]');var e=[],t="";$(document).find(".learning").each((function(){t=$(this).text().toLowerCase(),-1==jQuery.inArray(t,e)&&e.push(t)})),$.ajax({type:"POST",url:"/ajax/archivetext.php",async:!1,data:{words:e}}).fail((function(e,t,n){alert("Oops! There was an error updating the database.")})),window.parent.show_confirmation_dialog=!1}d.addEventListener("click",(function(e){e.preventDefault(),$.when(l()).then((function(){u(d.href.substr(d.href.indexOf("/",8)+1)),$("html, body").animate({scrollTop:0},"slow")}))}),!1),$("body").on("click","#btn-save",(function(){l(),window.location.replace("texts.php")})),parent.window.addEventListener("unload",(function(){n.destroy()}));var s=document.getElementById("navigation"),c=document.getElementById("main");function u(t){var o=n.spine.get(t);return o&&o.render().then((function(r){var l=$("<div/>").append(r);l.find("*").removeAttr("class").removeAttr("style"),$(".loading-spinner").fadeIn(1e3),$.ajax({type:"POST",url:"/ajax/getuserwords.php",data:{txt:l.html()},dataType:"json"}).done((function(t){a.innerHTML=underlineWords(t,e),$(".loading-spinner").fadeOut(1e3)})).fail((function(e,t,n){alert("There was an unexpected error when trying to underline words for this ebook!")}));var s=o.next(),c=o.prev();s?(nextNav=n.navigation.get(s.href),nextNav?nextLabel=nextNav.label:nextLabel="next",i.textContent=nextLabel+" »",i.href=s.href):i.textContent="",c?(prevNav=n.navigation.get(c.href),prevNav?prevLabel=prevNav.label:prevLabel="previous",d.textContent="« "+prevLabel,d.href=c.href):d.textContent="",localStorage.setItem(n.key()+"-lastpos",t)})),o}document.getElementById("opener").addEventListener("click",(function(e){s.classList.toggle("sidebar-closed"),c.classList.toggle("sidebar-opened"),e.preventDefault()}),!1),n.loaded.navigation.then((function(e){var t=document.getElementById("toc"),n=document.createDocumentFragment(),a=function(e,t){var n=document.createElement("ul");t.forEach((function(e){var t=document.createElement("li"),o=document.createElement("a");o.textContent=e.label,o.href=e.href,t.appendChild(o),e.subitems&&a(t,e.subitems),o.onclick=function(){return u(o.getAttribute("href")),s.classList.add("closed"),!1},n.appendChild(t)})),e.appendChild(n)};a(n,e),t.appendChild(n),t.offsetHeight+60<window.innerHeight&&t.classList.add("fixed")})),n.loaded.metadata.then((function(e){var t=document.getElementById("title"),a=document.getElementById("book-title"),o=document.getElementById("author"),r=document.getElementById("cover");null!=t&&(t.textContent=e.title,a.textContent=e.title,o.textContent=e.creator,n.archive?n.archive.createUrl(n.cover).then((function(e){r.src=e})):r.src=n.cover)}))}));