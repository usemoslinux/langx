/**
 * Copyright (C) 2019 Pablo Castagnino
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

$(document).ready(function() {
    emptyAll();
    $("#url").focus();

    /**
     * Adds video to database
     * This is triggered when user presses the "Save" button & submits the form
     * @param e {Event}
     */
    $("#form-addvideo").on("submit", function(e) {
        e.preventDefault();

        var form_data = $("#form-addvideo").serializeArray(); //serialize();
        form_data.push({ name: "shared-text", value: true });

        $.ajax({
            type: "POST",
            url: "ajax/addtext.php",
            data: form_data
        })
            .done(function(data) {
                if (typeof data != "undefined") {
                    if (typeof data.error_msg != "undefined") {
                        showMessage(data.error_msg, "alert-danger");
                    }
                } else {
                    window.location.replace("sharedtexts.php");
                }
            })
            .fail(function(xhr, ajaxOptions, thrownError) {
                showMessage(
                    "Oops! There was an unexpected error when uploading this text.",
                    "alert-danger"
                );
            }); // end of ajax
    }); // end #form-addvideo.on.submit

    /**
     * Fetches Youtube video, including title, channel & transcript
     */
    $("#btn-fetch").on("click", function() {
        var url = $("#url").val();

        video_id = extractYTId(url); //get youtube video id

        emptyAll(); // empty all input boxes

        if (video_id != "") {
            var embed_url = "https://www.youtube.com/embed/" + video_id;

            $("#error-msg").addClass("d-none");
            $("#btn-fetch-img")
                .removeClass()
                .addClass("fas fa-sync fa-spin");

            $.ajax({
                type: "POST",
                url: "ajax/fetchvideo.php",
                data: { video_id: video_id }
            })
                .done(function(data) {
                    if (typeof data != "undefined") {
                        if (typeof data.error_msg != "undefined") {
                            showMessage(data.error_msg, "alert-danger");
                        } else {
                            if ($("#yt-video").length) {
                                $("#yt-video")
                                    .get(0)
                                    .contentWindow.location.replace(embed_url);
                                // changing $('#yt-video') src attribute would affect browser history, that's why
                                // we do it this way
                            }
                            $("#title").val(toSentenceCase(data.title));
                            $("#author").val(toSentenceCase(data.author));
                            $("#url").val(url);

                            if (data.text == "") {
                                $("#text").val("");
                                showMessage(
                                    'This video does not include valid audio transcripts. Please make sure to use <a href="https://www.youtube.com/results?sp=EgIoAQ%253D%253D&search_query=yoursearchterms" target="_blank" rel="noopener noreferrer">videos that include transcripts</a> in the language your are learning and that are not auto-generated by Google.',
                                    "alert-danger"
                                );
                            } else {
                                $("#text").val(data.text);
                                $("#alert-msg").addClass("d-none");
                            }
                        }
                    }
                })
                .fail(function(xhr, ajaxOptions, thrownError) {
                    showMessage(
                        "Oops! There was an unexpected error trying to get that video. Please try again later.",
                        "alert-danger"
                    );
                })
                .always(function() {
                    $("#btn-fetch-img")
                        .removeClass()
                        .addClass("fas fa-arrow-down");
                }); // end ajax
        } else {
            showMessage(
                'Malformed Youtube URL link. It should have the following format: https://www.youtube.com/watch?v=video_id or https://youtu.be/video_id<br>Remember to replace "video_id" with the corresponding video ID and try again.',
                "alert-danger"
            );
        }
    }); // end #btn-fetch.on.click

    /**
     * Shows custom message in the top section of the screen
     * @param {string} html
     * @param {string} type
     */
    function showMessage(html, type) {
        $("#alert-msg")
            .html(html)
            .removeClass()
            .addClass("alert " + type);
        $(window).scrollTop(0);
    } // end showMessage

    /**
     * Empties form
     */
    function emptyAll() {
        if ($("#external_call").length == 0) {
            $("input")
                .not(":hidden")
                .val("");
            $("#text").val("");
            $("#yt-video").attr("src", "about:blank");
        }
    } // end emptyAll

    /**
     * Converts string to Sentence case (first character in upper case, the rest in lower case)
     * @param {string} str
     */
    function toSentenceCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    } // end toSentenceCase

    function extractYTId(url) {
        // check if user copied the url by right-clicking the video (Google's recommended method)
        if (url.lastIndexOf("https://youtu.be/") === 0) {
            return url.substr(17);
        } else {
            // check if user copied the url directly from the url bar (alternative method)
            var yt_urls = new Array(
                "https://www.youtube.com/watch",
                "https://m.youtube.com/watch"
            );

            var url_split = url.split("?");
            var url_params = url_split[1].split("&");

            // check if it's a valid youtube URL
            for (let i = 0; i < yt_urls.length; i++) {
                if (url_split[0].lastIndexOf(yt_urls[i]) === 0) {
                    // extract youtube video id
                    for (let z = 0; z < url_params.length; z++) {
                        if (url_params[z].lastIndexOf("v=") === 0) {
                            return url_params[z].substring(2);
                        }
                    }
                }
            }
        }
    } // end extractYTId

    // Check for an external api call. If detected, try to fetch text using Mozilla's readability parser
    if ($("#external_call").length) {
        $("#btn-fetch").trigger("click");
    }
});
