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
    $("#search").focus();
    $("input:checkbox").prop("checked", false);

    if ($('#modal-achievements').length) {
        $('#modal-achievements').modal('show');
    }

    /**
     * Deletes selected texts from the database
     * Trigger: when user selects "Delete" in the action menu
     */
    $("#mDelete").on("click", function() {
        if (confirm("Really delete?")) {
            var ids = [];
            $("input.chkbox-selrow:checked").each(function() {
                ids.push($(this).attr("data-idText"));
            });

            var uri_params = getCurrentURIParameters();
            var is_archived = uri_params.sa == "1";
            var cur_page = uri_params.p ? uri_params.p : "1";

            /**
             * Deletes selected texts from the database (based on their ID).
             * When done, also removes selected rows from HTML table.
             * @param  {integer array} textIDs Ids of the selected elements in the database
             */
            $.ajax({
                url: "ajax/removetext.php",
                type: "POST",
                data: {
                    textIDs: JSON.stringify(ids),
                    is_archived: is_archived ? 1 : 0
                }
            })
                .done(function() {
                    var params = {  p: cur_page,
                                    ft: $("#ft").val(), // filter type
                                    fl: $("#fl").val(), // filter level
                                    s: $("#s").val(),   // search text
                                    sa: $("#sa").val(), // is shared
                                    o: $("#o").val()    // order
                                };

                    var uri_str = parameterizeArray(params);

                    window.location.replace("texts.php" + uri_str);
                })
                .fail(function() {
                    alert(
                        "There was an error when trying to delete the selected texts. Refresh the page and try again."
                    );
                });
        }
    }); // end #mDelete.on.click

    /**
     * Archives selected texts
     * Trigger: when user selects "Archive" in the action menu
     */
    $("#mArchive").on("click", function() {
        var archivetxt = $(this).text() === "Archive";
        var ids = [];
        $("input.chkbox-selrow:checked").each(function() {
            ids.push($(this).attr("data-idText"));
        });

        var uri_params = getCurrentURIParameters();
        var cur_page = uri_params.p ? uri_params.p : "1";

        /**
         * Moves selected texts from the "texts" table to the "archived_texts" table in the database (archive);
         * or, vice-versa, moves texts from the "archived_texts" table to the "texts" table (unarchive)
         * This is done based on text IDs.
         * @param {integer array} ids Ids of the selected elements in the database
         * @param {boolean} archivetxt If true, archive text; else, unarchive text
         */
        $.ajax({
            url: "ajax/archivetext.php",
            type: "POST",
            data: {
                textIDs: JSON.stringify(ids),
                archivetext: archivetxt
            }
        })
            .done(function() {
                var params = {  p: cur_page,
                                ft: $("#ft").val(), // filter type
                                fl: $("#fl").val(), // filter level
                                s: $("#s").val(),   // search text
                                sa: $("#sa").val(), // is shared
                                o: $("#o").val()    // order
                            };

                var uri_str = parameterizeArray(params);

                window.location.replace("texts.php" + uri_str);
            })
            .fail(function() {
                alert(
                    "There was an error when trying to archive the selected texts. Refresh the page and try again."
                );
            }); // end ajax
    }); // end mArchive.on.click

    /**
     * Enables/Disables action menu based on the number of selected elements.
     * If there is at least 1 element selected, it enables it. Otherwise, it is disabled.
     */
    function toggleActionMenu() {
        if ($("input[type=checkbox]:checked").length === 0) {
            $("#actions-menu").addClass("disabled");
        } else {
            $("#actions-menu").removeClass("disabled");
        }
    } // end toggleActionMenu

    $(document).on("change", ".chkbox-selrow", toggleActionMenu);

    /**
     * Selects/Unselects all texts from the list
     */
    $(document).on("click", "#chkbox-selall", function(e) {
        e.stopPropagation();

        var $chkboxes = $(".chkbox-selrow");
        $chkboxes.prop("checked", $(this).prop("checked"));

        toggleActionMenu();
    }); // end #chkbox-selall.on.click

    /**
     * Shows selection in Filter menu
     */
    $("#btn-filter + div > a").on("click", function() {
        var $item = $(this);

        if ($item.is('.sa')) {
            $item.toggleClass("active");
        } else {
            $item.addClass("active");

            var filter = '';
            if ($item.is('.ft')) {
                filter = '.ft';
            } else if ($item.is('.fl')) {
                filter = '.fl';
            }

            $item.siblings(".active" + filter).each(function() {
                $(this).toggleClass("active");
            });
        }
    }); // end #btn-filter + div > a.on.click

    /**
     * Selects sorting
     */
    $("#dropdown-menu-sort").on("click", function(e) {
        var filename = getCurrentFileName();
        var params = {  ft: $("#ft").val(), // filter type
                        fl: $("#fl").val(), // filter level
                        s: $("#s").val(),   // search text
                        sa: $("#sa").val(), // is shared
                        o: $("#o").val()    // order
                    };

        var uri_str = parameterizeArray(params);
        window.location.replace(filename + uri_str);
    }); // end #dropdown-menu-sort.on.click

    /**
     * Turn off clicking for disabled navigation items
     */
    $(document).on("click", "li.disabled", function() {
        return false;
    }); // end li.disabled.on.click

    /**
     * Hides welcome message for this and future sessions
     */
    $(".close").on("click", function(e) {
        e.preventDefault();

        setCookie("hide_welcome_msg", true, 365 * 10);
    }); // end .close.on.click

    /**
     * Gets current page file name
     */
    function getCurrentFileName() {
        var url = window.location.pathname;

        var filename = "";
        if (url.indexOf("&") > -1) {
            filename = url.substring(
                url.lastIndexOf("/") + 1,
                url.indexOf("&")
            );
        } else {
            filename = url.substring(url.lastIndexOf("/") + 1);
        }

        return filename;
    } // end getCurrentFileName

    /**
     * Returns current URI parameters
     */
     function getCurrentURIParameters() {
        var parts = window.location.search.substr(1).split("&");
        var result = { p: "1" };

        if (parts != "") {
            for (var i = 0; i < parts.length; i++) {
                var temp = parts[i].split("=");
                result[decodeURIComponent(temp[0])] = decodeURIComponent(
                    temp[1]
                );
            }
        }
        
        return result; // remove trailing '&'
    } // end getCurrentURIParameters

    /**
     * Converts array to URI string with parameters
     * @param {array} arr 
     * @returns string
     */
     function parameterizeArray(arr) {
        let result = '?';
                        
        for (const key in arr) {
            if (arr[key]) {
                result += key + '=' + encodeURIComponent(arr[key]) + '&';
            }
        }

        return result.slice(0,-1);
    } // end parameterizeArray
});
