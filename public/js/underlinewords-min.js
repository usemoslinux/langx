var langs_with_no_word_separator=["zh","ja","ko"];function addLinks(a,e){var r="";return r=langs_with_no_word_separator.includes(e)?new RegExp(/(?:\s*<a class='word[^>]+>.*?<\/a>|<[^>]*>)|(\p{L})/giu):new RegExp(/(?:\s*<a class='word[^>]+>.*?<\/a>|<[^>]*>)|(\p{L}+)/giu),result=a.replace(r,(function(a,e){return void 0===e?a:'<a class="word" data-toggle="modal" data-target="#myModal">'+e+"</a>"})),r=new RegExp(/(?<=<[^>]*>)([^\p{L}<]+)/gu),result=result.replace(r,(function(a,e){return void 0===e?a:"<a>"+e+"</a>"})),result}function underlineWords(a,e){var r=a.text,s="",o="",n="",t="",d="",l="";return Object.values(a.user_words).forEach((a=>{a.is_phrase>0?a.status>0?o+=a.word+"|":n+=a.word+"|":a.status>0?t+=a.word+"|":d+=a.word+"|"})),o&&(o=o.slice(0,-1),s=langs_with_no_word_separator.includes(e)?new RegExp("(?:<[^>]*>)|("+o+")","iug"):new RegExp("(?:<[^>]*>)|(?<![\\p{L}])("+o+")(?![\\p{L}])","iug"),r=r.replace(s,(function(a,e){return void 0===e?a:"<a class='word reviewing learning' data-toggle='modal' data-target='#myModal'>"+e+"</a>"}))),n&&(n=n.slice(0,-1),s=langs_with_no_word_separator.includes(e)?new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|("+n+")","iug"):new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|(?<![\\p{L}])("+n+")(?![\\p{L}])","iug"),r=r.replace(s,(function(a,e){return void 0===e?a:"<a class='word learned' data-toggle='modal' data-target='#myModal'>"+e+"</a>"}))),t&&(t=t.slice(0,-1),s=langs_with_no_word_separator.includes(e)?new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|("+t+")","iug"):new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|(?<![\\p{L}])("+t+")(?![\\p{L}])","iug"),r=r.replace(s,(function(a,e){return void 0===e?a:"<a class='word reviewing learning' data-toggle='modal' data-target='#myModal'>"+e+"</a>"}))),d&&(d=d.slice(0,-1),s=langs_with_no_word_separator.includes(e)?new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|("+d+")","iug"):new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|(?<![\\p{L}])("+d+")(?![\\p{L}])","iug"),r=r.replace(s,(function(a,e){return void 0===e?a:"<a class='word learned' data-toggle='modal' data-target='#myModal'>"+e+"</a>"}))),a.high_freq&&(l=a.high_freq.join("|"),s=langs_with_no_word_separator.includes(e)?new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|("+l+")","iug"):new RegExp("(?:s*<a class='word[^>]+>.*?</a>|<[^>]*>)|(?<![\\p{L}])("+l+")(?![\\p{L}])","iug"),r=r.replace(s,(function(a,e,r,s){return void 0===e?a:"<a class='word frequency-list' data-toggle='modal' data-target='#myModal'>"+e+"</a>"}))),addLinks(r,e)}