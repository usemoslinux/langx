$(document).ready(function() {

    selword = null;
    dictionaryURI = '';
    translatorURI = '';
    prevsel = 0; // previous selection index in #selPhrase

    // set keyboard shortcuts
    $(window).on('keydown', function(e) {
        switch (e.keyCode) {
            case 80: // "p" keyCode
            $('#audioplayer')[0].play();
            break;
            case 83: // "s" keyCode
            $('#audioplayer')[0].pause();
            break;
        }
    });

    $(document).on('click', 'span.word', function(){

        var audioplayer = $('#audioplayer');

        if (audioplayer.length) { // if there is audio playing
            if (!audioplayer.prop('paused') && audioplayer.prop('currentTime')) {
                audioplayer.trigger('pause'); // pause audio
                playingaudio = true;
            } else {
                playingaudio = false;
            }
        }

        $.ajax({
          url: 'db/geturis.php',
          type: 'GET',
          async: false,
          dataType: 'json',
          //data: {param1: 'value1'}
        })
        .done(function(data) {
          dictionaryURI = data.LgDict1URI;
          translatorURI = data.LgTranslatorURI;
          console.log("success");
        })
        .fail( function(xhr, textStatus, errorThrown) {
          alert(xhr.responseText);
        });

        // show dictionary
        var url = dictionaryURI.replace('%s', encodeURIComponent($(this).text()));

        $('#dicFrame').get(0).contentWindow.location.replace(url);
        // the previous line loads iframe content without adding it to browser history,
        // as this one does: $('#dicFrame').attr('src', url);
        selword = $(this);

        // build phrase select element in modal window
        $('#selPhrase').empty();
        $('#selPhrase').append($('<option>', {
            value: selword.text(),
            text: selword.text()
        }));
        phraselength = 0;
        selword.nextAll('span').slice(0,20).each(function(i, item){
            if (phraselength == 5 || $(item).text().search('.') > 0) {
                return false;
            } else {
                if ($(item).hasClass('word')) {
                    $('#selPhrase').append($('<option>', {
                        value: selword.text() + selword.nextAll('span').slice(0,i+1).text(),
                        text: selword.text() + '...' + $(item).text()
                    }));
                    phraselength++;
                }
            }
        });
        $('#selPhrase').append($('<option>', {
            value: 'translateparagraph',
            text: 'Translate whole paragraph'
        }));

        prevsel = 0;

    });

    $('#btnadd').on('click', function() {
        // check if selection is a word or phrase
        var selection = $('#selPhrase option:selected').val();
        var selphrase_sel_index = $('#selPhrase').prop('selectedIndex');
        var selphrase_count = $('#selPhrase option').length;
        var is_phrase = selphrase_sel_index > 0 && selphrase_sel_index != selphrase_count-1;

        // add selection to "words" table
        $.ajax({
            type: 'POST',
            url: 'db/addword.php',
            data: { word: selection, isphrase: is_phrase },
            success: function(){ // if successful, underline word or phrase
                if (is_phrase) {
                    var firstword = selword.text();
                    var phraseext = selphrase_sel_index + 1;
                    var filterphrase = $('span.word').filter(function() { return $(this).text().toLowerCase() === firstword.toLowerCase(); });

                    filterphrase.each(function() {
                        var lastword = $(this).nextAll('span.word').slice(0,phraseext-1).last();
                        var phrase = $(this).nextUntil(lastword).addBack().next('span.word').addBack();

                        if(phrase.text().toLowerCase() === selection.toLowerCase()) {
                            phrase.wrapAll("<span class='word new' data-toggle='modal' data-target='#myModal'></span>");
                            phrase.contents().unwrap();
                        }
                    });
                } else {
                    var filterword = $('span.word').filter(function() { return $(this).text().toLowerCase() === selection.toLowerCase(); });
                    filterword.html("<span class='word new' data-toggle='modal' data-target='#myModal'>" + selection + "</span>");
                    filterword.contents().unwrap();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Oops! There was an error adding this word or phrase to the database.");
            }
        });

    });

    $('#btnremove').on('click', function(){
        $.ajax({
            type: 'POST',
            url: 'db/removeword.php',
            data: { word: selword.text() },
            success: function(){
                var filter = $('span.word').filter(function() {
                    return $(this).text().toLowerCase() === selword.text().toLowerCase();
                });

                $.ajax({
                    url: 'underlinewords.php',
                    type: 'POST',
                    data: {txt: selword.text()}
                })
                .done(function(result) {
                    filter.html(result);
                    filter.contents().unwrap();
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Oops! There was an error removing the word from the database.");
            }
        });


    });

    $('#myModal').on('hidden.bs.modal', function () {
        // if user was playing audio, resume playback
        var audioplayer = $('#audioplayer');
        if (playingaudio && audioplayer.length) {
            audioplayer.trigger("play");
        }

    });

    $('#btnarchive').on('click', function() {
        // build array with underlined words
        var oldwords = [];
        var word = "";
        $('.learning').each(function(){
            word = $(this).text().toLowerCase();
            if (jQuery.inArray(word, oldwords) == -1) {
                oldwords.push(word);
            }

        });

        $.ajax({
            type: 'POST',
            url: 'db/archivetext.php',
            data: { words: oldwords, textID: $('#container').attr('data-textID'), archivetext: true },
            success: function(data) {
                window.location.replace('/');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Oops! There was an error updating the database.");
            }
        });
    });

    // audio playback rate slider
    $('#pbr').on('input change', function() {
        cpbr = parseFloat($(this).val()).toFixed(1);
        $('#currentpbr').text(cpbr);
        $('#audioplayer').prop('playbackRate', cpbr);
    });


    $('#selPhrase').on('change', function(e) {
        var selindex = $('#selPhrase').prop('selectedIndex');
        var url = '';
        //alert('selindex=' + selindex + '; prevsel=' + prevsel);

        if (selindex == $('#selPhrase option').length-1) { // translate whole paragraph
            url = translatorURI.replace('%s', encodeURIComponent(selword.parent('p').text()));
            var win = window.open(url);
            if (win) {
                win.focus();
            } else {
                alert("Couldn't open translator window. Please allow popups for this website");
            }
            $(this).prop('selectedIndex', prevsel);
        } else { // else, select phrase & look it up in dictionary
            phrase = $('#selPhrase option').eq(selindex).val();
            url = dictionaryURI.replace('%s', encodeURIComponent(phrase));
            $('#dicFrame').get(0).contentWindow.location.replace(url);
            prevsel = selindex;
        }
    });
});