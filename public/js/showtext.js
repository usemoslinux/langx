/**
 * Copyright (C) 2018 Pablo Castagnino
 * 
 * This file is part of aprelendo.
 * 
 * aprelendo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * aprelendo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with aprelendo.  If not, see <http://www.gnu.org/licenses/>.
 */

$(document).ready(function () {
	var highlighting = false;
    var $sel_start, $sel_end;
    var $selword = null; // jQuery object of the selected word/phrase
    var time_handler = null;
    var dictionaryURI = "";
    var translatorURI = "";
    var phase = 1; // first phase of the learning cycle
    var playingaudio = false;

    // $doc & $pagereader are used to make this JS code work when showing simple texts & 
    // ebooks (which are displayed inside an iframe)
    var $doc = $(parent.document); 
    var $pagereader = $doc.find('iframe[id^="epubjs"]');
    var $pagereader = $pagereader.length > 0 ? $pagereader : $('html');

    //loadAudio();
    
    /**
     * Sets keyboard shortcuts for media player
     * @param {event object} e Used to get keycodes
     */
    $(window).on("keydown", function (e) {
        var $audioplayer = $("#audioplayer");
        if ($audioplayer.length && e.ctrlKey) {
            switch (e.keyCode) {
                case 32: // "spacebar" keyCode
                    if ($audioplayer.prop("paused")) {
                        $audioplayer.trigger("play");
                    } else {
                        $audioplayer.trigger("pause");
                    }

                    playingaudio = !playingaudio;
                    break;
            }
        }
    });

    /**
     * Pauses dictation audio when user is typing an answer inside an input
     * @param {event object} e Used to get keycodes
     */
    $("body").on("input", "input:text", function (e) {
        var lastkeypress = new Date().getTime();
        var keyCode = e.keyCode || e.which;

        if (keyCode != 9) {
            clearTimeout(time_handler);
            toggleAudio(lastkeypress);
        }
    });

    /**
     * Pauses audio for some secs when user is typing answer in dictation mode
     * @param {Date} lastkeypress 
     */
    function toggleAudio(lastkeypress) {
        var currentTime = new Date().getTime();
        var $audioplayer = $("#audioplayer");

        if (currentTime - lastkeypress > 1000) {
            $audioplayer.trigger("play");
        } else {
            var playing = !$audioplayer.prop("paused");
            if (playing) {
                $audioplayer.trigger("pause");
            }
            time_handler = setTimeout(() => {
                toggleAudio(lastkeypress);
            }, 1000);
        }
    }
    
    $doc.on("vmousedown", ".word", function() {
		// e.preventDefault();
        // e.stopPropagation();
        highlighting = true;
        $sel_start = $(this);
    });
	
	$doc.on("vmouseup", ".word", function(e) {
        // e.preventDefault();
        // e.stopPropagation();
        highlighting = false;
        if ($sel_start.text() === $(e.target).text()) {
            $selword = $(this); 
        }
        showModal();
	});
	
	$.fn.isAfter = function(sel) {
		return this.prevUntil(sel).length !== this.prevAll().length;
	}
	
	$.fn.isBefore = function(sel) {
		return this.nextUntil(sel).length !== this.nextAll().length;
	}
	
	$doc.on("vmouseover", ".word", function() {
		$sel_end = $(this);
		if(highlighting) {
			$(".word").removeClass("highlighted");
			
			if ($sel_end.isAfter($sel_start)) {
				$sel_start.prev().nextUntil($sel_end.next(), ".word").addClass("highlighted");
				$selword = $sel_start.prev().nextUntil($sel_end.next());
			} else {
				$sel_start.next().prevUntil($sel_end.prev(), ".word").addClass("highlighted");
				$selword = $sel_end.prev().nextUntil($sel_start.next());
			}
		}
    });
    
    // ajax call to get dictionary & translator URIs
    $.ajax({
        url: "/ajax/getdicuris.php",
        type: "GET",
        dataType: "json"
    }).done(function (data) {
        dictionaryURI = data.LgDict1URI;
        translatorURI = data.LgTranslatorURI;
    });

    function buildTranslateParagraphLink() {
        var $start_obj = $selword.prevUntil(":contains('.')").last();
        $start_obj = $start_obj.length > 0 ? $start_obj : $selword;
        var $end_obj = $selword.prev().nextUntil(":contains('.')").last().next();
        $end_obj = $end_obj.length > 0 ? $end_obj : $selword.nextAll().last().next();
        var $sentence = $start_obj.nextUntil($end_obj).addBack().next().addBack();

        return translatorURI.replace(
            "%s",
            encodeURIComponent($sentence.text())
        );
    }

    /**
     * Sets Add & Delete buttons depending on whether selection exists in database
     */
    function setAddDeleteButtons() {
        var $btnremove = $(parent.document).find("#btnremove");
        var $btnadd = $(parent.document).find("#btnadd");
        if ($selword.is(".learning, .new, .forgotten, .learned")) {
            if ($btnremove.is(":visible") === false) {
                $btnremove.show();
                $btnadd.text("Forgot");
            }
        } else {
            $btnremove.hide();
            $btnadd.text("Add");
        }
    }

    /**
     * Shows dictionary when user clicks a word
     * All words are enclosed in span.word tags
     */
    function showModal() {
        var audioplayer = $("#audioplayer");

        if (audioplayer.length) {
            // if there is audio playing
            if (!audioplayer.prop("paused") && audioplayer.prop("currentTime")) {
                audioplayer.trigger("pause"); // pause audio
                playingaudio = true;
            } else {
                playingaudio = false;
            }
        }

        setAddDeleteButtons();

        // build translate sentence url
        $("#gt-link").attr("href", buildTranslateParagraphLink());

        // show dictionary
        var url = dictionaryURI.replace("%s", encodeURIComponent($selword.text()));

        $(parent.document).find("#dicFrame")
            .get(0)
            .contentWindow.location.replace(url);
        $('#btnadd').focus();
        // the previous line loads iframe content without adding it to browser history,
        // as this one does: $('#dicFrame').attr('src', url);

        $(parent.document).find('#myModal').modal('show');
    }

    $doc.on("click", "#btnadd", function() {
        var is_phrase = $selword.length > 1;
        var sel_text = $selword.text();

        // add selection to "words" table
        $.ajax({
            type: "POST",
            url: "/ajax/addword.php",
            data: {
                word: sel_text,
                isphrase: is_phrase
            }
        })
        .done(function () {
            // if successful, underline word or phrase
            if (is_phrase) { // if it's a phrase
                var word_count = $selword.filter(".word").length;

                // build filter based on first word of the phrase
                var filterphrase = $pagereader.contents().find("span.word").filter(function () {
                    return (
                        $(this)
                        .text()
                        .toLowerCase() === $selword.eq(0).text().toLowerCase()
                    );
                });

                // loop through the filter and underline all instances of the phrase
                filterphrase.each(function () {
                    var $lastword = $(this)
                        .nextAll("span.word")
                        .slice(0, word_count - 1)
                        .last();
                    var $phrase = $(this)
                        .nextUntil($lastword)
                        .addBack()
                        .next("span.word")
                        .addBack();

                    if ($phrase.text().toLowerCase() === sel_text.toLowerCase()) {
                        if ($(this).is('.new, .learning, .learned, .forgotten')) {
                            $phrase.wrapAll(
                                "<span class='word reviewing forgotten' data-toggle='modal' data-target='#myModal'></span>"
                            );
                        } else {
                            $phrase.wrapAll(
                                "<span class='word reviewing new' data-toggle='modal' data-target='#myModal'></span>"
                            );
                        }

                        $phrase.contents().unwrap();
                    }
                });
            } else { // if it's a word
                // build filter with all the instances of the word in the text                
                var filterword = $pagereader.contents().find("span.word").filter(function () {
                    return (
                        $(this)
                        .text()
                        .toLowerCase() === sel_text.toLowerCase()
                    );
                });

                // loop through the filter and underline all instances of the word
                filterword.each(function () {
                    var $word = $(this);
                    if ($word.is('.new, .learning, .learned, .forgotten')) {
                        $word.html("<span class='word reviewing forgotten' data-toggle='modal' data-target='#myModal'>" +
                            sel_text +
                            "</span>");
                    } else {
                        $word.html("<span class='word reviewing new' data-toggle='modal' data-target='#myModal'>" +
                            sel_text +
                            "</span>");
                    }
                });

                filterword.contents().unwrap();
            }

            // if there were no previous word underlined, therefore phases 2 & 3 were off, 
            // when user adds his first new word, activate these phases
            var actual_phase = $('#alert-msg-phase').attr('data-phase');
            if (phase == 4 && audio_is_loaded && actual_phase == 3) {
                var phase_names = ['Reading', 'Listening', 'Speaking', 'Writing'];
                $('#btn-next-phase').html('Go to phase ' + phase + '<br><span class="small">' + 
                phase_names[phase-1] + '</span>');
                phase = parseInt(actual_phase);
            }

        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(
                "Oops! There was an error adding this word or phrase to the database."
            );
        });
        
        $selword.removeClass("highlighted");
    });

    /**
     * Remove selected word or phrase from database
     */
    $doc.on("click", "#btnremove", function () {
        var audio_is_loaded = $("#audioplayer").find("source").attr("src") != undefined && $("#audioplayer").find("source").attr("src") != "";

        $.ajax({
                type: "POST",
                url: "/ajax/removeword.php",
                data: {
                    word: $selword.text()
                }
            })
            .done(function () {
                var filter = $pagereader.contents().find("span.word").filter(function () {
                    return (
                        $(this)
                        .text()
                        .toLowerCase() === $selword.text().toLowerCase()
                    );
                });

                $.ajax({
                    url: "/ajax/underlinewords.php",
                    type: "POST",
                    data: {
                        txt: $selword.text()
                    }
                }).done(function (result) {
                    filter.html(result);
                    filter.contents().unwrap();
                    // if user is in phase 3 (speaking) and deleted the only word that was underlined
                    // don't allow phase 3 (writing) & go directly to last phase (save changes)
                    if (phase == 3 && audio_is_loaded > 0 && $('.learning, .new, .forgotten').length == 0) {
                        $('#btn-next-phase').html('Finish & Save<br><span class="small">Skipped phase 4 (writing): no underlined words</span>');
                        phase++;
                    }
                });
            })
            .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Oops! There was an error removing the word from the database.");
            });
    });

    $doc.on("click", "#btncancel", function() {

        $selword.removeClass("highlighted");
    });

    /**
     * Triggers next phase of assisted learning
     * Executes when the user presses the big blue button at the end
     */
    $("body").on("click", "#btn-next-phase", function () {
        var audio_is_loaded = $("#audioplayer").find("source").attr("src") != undefined && $("#audioplayer").find("source").attr("src") != "";
        var $msg_phase = $('#alert-msg-phase');

        switch (phase) {
            case 1:
                $("html, body").animate({
                        scrollTop: 0
                    },
                    "slow"
                );
                
                if (!audio_is_loaded) {
                    $(this).html(
                        'Finish & Save<br><span class="small">Skipped phases 2, 3 & 4: no audio detected</span>'
                    );
                    phase = 4;
                    break;
                }
                
                phase++;
                
                $msg_phase.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Assisted learning - Phase 2:</strong> Listening <br><span class="small">Pay attention to the pronunciation of each word. You can slow down the audio if necessary.</span>')
                .attr('data-phase', phase);

                $(this).html(
                    'Go to phase 3<br><span class="small">Speaking</span>'
                );
                
                playAudioFromBeginning();
                break;
            case 2:
                $("html, body").animate({
                        scrollTop: 0
                    },
                    "slow"
                );
                if (!audio_is_loaded) {
                    $(this).html(
                        'Finish & Save<br><span class="small">Skipped phase 4 (writing): no audio detected</span>'
                    );
                    phase = 4;
                    break;
                }

                if ($(".learning, .new, .forgotten").length == 0) {
                    $(this).html(
                        'Finish & Save<br><span class="small">Skipped phase 4 (writing): no underlined words</span>'
                    );
                    phase = 4;
                    $msg_phase.attr('data-phase', 3);
                } else {
                    $(this).html(
                        'Go to phase 4<br><span class="small">Writing</span>'
                    );
                    phase++;
                    $msg_phase.attr('data-phase', phase);
                }
                
                $msg_phase.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Assisted learning - Phase 3:</strong> Speaking <br><span class="small">Read out loud and try to emulate the pronunciation of each word as you listen to the audio. You can slow it down if necessary.</span>')
                
                playAudioFromBeginning();
                break;
            case 3:
                $("html, body").animate({
                        scrollTop: 0
                    },
                    "slow"
                );
                
                phase++;

                $(this).html('Finish & Save');
                
                $msg_phase.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Assisted learning - Phase 4:</strong> Writing.<br><span class="small">Fill in the blanks as you listen to the dictation.</span>')
                .attr('data-phase', phase);
                
                toggleDictation();
                break;
            case 4:
                archiveTextAndSaveWords();
                break;
            default:
                break;
        }
    });


    /**
     * Finished studying this text. Archives text & saves new status of words/phrases 
     * Executes when the user presses the big green button at the end
     */
    $("body").on("click", "#btn-save", archiveTextAndSaveWords);

    /**
     * Archives text (only if necessary) and updates status of all underlined words & phrases
     */
    function archiveTextAndSaveWords() {
        // build array with underlined words
        var oldwords = [];
        var id = [];
        var word = "";
        var archive_text = true;
        var is_shared = $("#is_shared").length > 0

        $(".learning").each(function () {
            word = $(this)
                .text()
                .toLowerCase();
            if (jQuery.inArray(word, oldwords) == -1) {
                oldwords.push(word);
            }
        });

        id.push($("#text-container").attr("data-textID")); // get text ID

        if (is_shared) {
            id = undefined;
            archive_text = undefined;
        }

        $.ajax({
                type: "POST",
                url: "/ajax/archivetext.php",
                data: {
                    words: oldwords,
                    textIDs: JSON.stringify(id),
                    archivetext: archive_text
                }
            }).done(function (data) {
                var url = '/textstats.php';
                var total_words = Number($('.word').length) + Number($('.phrase').length);
                var form = $('<form action="' + url + '" method="post">' +
                            '<input type="hidden" name="created" value="' + $('.reviewing.new').length + '" />' +
                            '<input type="hidden" name="reviewed" value="' +  $('.reviewing.learning').length + '" />' +
                            '<input type="hidden" name="learned" value="' +  $('.learned').length + '" />' +
                            '<input type="hidden" name="forgotten" value="' +  $('.reviewing.forgotten').length + '" />' +
                            '<input type="hidden" name="total" value="' + total_words + '" />' +
                            '</form>');
                $('body').append(form);
                form.submit(); 
            })
            .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Oops! There was an error updating the database.");
            });
    }

    /**
     * Resumes playing if audio was paused when clicking on a word
     */
    $("body").on("hidden.bs.modal", "#myModal", function () {
        var audioplayer = $("#audioplayer");
        if (playingaudio && audioplayer.length) {
            audioplayer.trigger("play");
        }
    });

    /**
     * Changes playback speed when user moves slider
     */
    $("body").on("input change", "#pbr", function () {
        cpbr = parseFloat($(this).val()).toFixed(1);
        $("#currentpbr").text(cpbr);
        $("#audioplayer").prop("playbackRate", cpbr);
    });
    
    /**
     * Play audio from beginning
     */
    function playAudioFromBeginning() {
        var $audioplayer = $("#audioplayer");
        $audioplayer.prop("currentTime", "0");
        $audioplayer.trigger("play");
    }

    /**
     * Toggles dictation on/off
     */
    function toggleDictation() {
        if ($(".dict-answer").length == 0) {
            // toggle dictation on
            //replace all underlined words/phrases with input boxes
            $(".learning, .new, .forgotten").each(function (index, value) {
                var $elem = $(this);
                var length = $elem.text().length;
                var width = $elem.width();
                var line_height = $elem.css('font-size');
                $elem
                    .hide()
                    .after(
                        '<div class="input-group dict-input-group"><input type="text" class="dict" ' +
                        'style="width:' + width + 'px; line-height:' + line_height + ';" ' +
                        'maxlength="' + length + '" data-text="' + $elem.text() + '">' +
                        '<span class="input-group-append dict-answer d-none"></span></div>'
                    );
            });
            $("html, body").animate({
                    scrollTop: 0
                },
                "slow"
            ); // go back to the top of the page

            // automatically play audio, from the beginning
            playAudioFromBeginning()

            $(":text:first").focus(); // focus first input
        } else {
            // toggle dictation off
            $(".learning, .new, .forgotten").each(function (index, value) {
                $elem = $(this);
                $elem
                    .show()
                    .nextAll(":lt(1)")
                    .remove();
            });
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            $("#audioplayer").trigger("pause");
        }
    }

    $("body").on("click", "#btndictation", function () {
        toggleDictation();
    });

    /**
     * Checks if answer is correct and shows a cue to indicate status when user moves 
     * focus out of an input box.
     */
    $("body").on("blur", ":text", function () {
        var $curinput = $(this);
        if (
            $curinput.val().toLowerCase() == $curinput.attr("data-text").toLowerCase()
        ) {
            $curinput.css("border-color", "yellowgreen");
            $curinput
                .next("span")
                .not(".d-none")
                .addClass("d-none");
        } else if ($.trim($curinput.val()) != "") {
            $curinput.css("border-color", "tomato");
            $curinput
                .next("span")
                .removeClass("d-none")
                .addClass("dict-wronganswer")
                .text('[ ' + $curinput.attr("data-text") + ' ]');
        }
    });

    /**
     * Jumps to next input when user presses Enter inside an input
     */
    $("body").on("input", ".dict", function (e) {
        if (e.which === 13) {
            var index = $(".dict").index(this) + 1;
            $(".dict")
                .eq(index)
                .focus();
        }
    });

    $(document).on("click", "#retry-audio-load", function (e) {
        e.preventDefault();
        $('#alert-msg-audio').remove;
        $('#audioplayer-loader').removeClass('d-none');
        loadAudio();
    });

    function skipAudioPhases() {
        $('#audioplayer-loader')
                        .nextAll()
                        .addBack()
                        .slice(0,3)
                        .remove();
        
        $('#btn-next-phase').html(
            'Finish & Save<br><span class="small">Skipped phases 2, 3 & 4: no audio detected</span>'
        );

        phase = 4;
    }

    function loadAudio() { 
        if ($('#audioplayer').length > 0) {
            var txt = $('#text').text();
            var doclang = $('html').attr('lang');
    
            $.ajax({
                type: "POST",
                url: "ajax/fetchaudiostream.php",
                data: {'text': txt, 'langiso': doclang},
                dataType: 'json'
            })
            .done(function (e) {
                if (e.error != null || e.response == false) {
                    skipAudioPhases();
                    return false;
                }
                var $audio_player = $('#audioplayer');
                $audio_player.find('source').attr('src', e.response);
                $audio_player[0].load();
                $('#audioplayer-loader').addClass('d-none');
                $('#audioplayer').removeClass('d-none');
                $('#audioplayer-speedbar').removeClass('d-none');
                return true;
            })
            .fail(function (xhr, ajaxOptions, thrownError) {
                // FIXME: audio streaming sometimes fails with no reason... need to investigate more.
                console.log(xhr.statusText);
                console.log(ajaxOptions);
                console.log(thrownError);

                if (xhr.status == 403) {
                    // TODO: implement "upgrade" page
                    $('#audioplayer-loader').replaceWith('<div id="alert-msg-audio" class="alert alert-danger">You have reached your audio streaming limit for today. Although it is possible to continue with the revision of the text, we do not recommend it. Alternatively, you can try again tomorrow or you can consider supporting us and improving your plan to increase the daily audio streaming limit.</div>');
                } else {
                    $('#audioplayer-loader').replaceWith('<div id="alert-msg-audio" class="alert alert-danger">There was an unexpected error trying to create audio from this text. <a href="#" id="retry-audio-load">Try again</a> later.</div>')
                }

                skipAudioPhases();
                return false;
            });        
        } else {
            return false;
        }
     }
});