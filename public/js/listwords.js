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

    // action menu implementation

    /**
     * Deletes selected words from the database
     * Trigger: when user selects "Delete" in the action menu
     */
    $("#mDelete").on("click", function() {
        if (confirm("Really delete?")) {
            var ids = [];
            $("input.chkbox-selrow:checked").each(function() {
                ids.push($(this).attr("data-idWord"));
            });

            /**
             * Deletes selected words from the database (based on their ID).
             * When done, also removes selected rows from HTML table.
             * @param  {integer array} textIDs Ids of the selected elements in the database
             */
            $.ajax({
                url: "ajax/removeword.php",
                type: "POST",
                data: {
                    wordIDs: JSON.stringify(ids)
                }
            })
                .done(function() {
                    window.location.replace(
                        "words.php" + parameterizeArray(getCurrentURIParameters())
                    );
                })
                .fail(function(request, status, error) {
                    alert(
                        "There was an error when trying to delete the selected words. Refresh the page and try again."
                    );
                });
        }
    }); // end #mDelete.on.click

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
     * Selects sorting
     */
    $("#dropdown-menu-sort").on("click", function(e) {
        var params = { s: $("#s").val(), 
                       o: $("#o").val() };

        var uri_str = parameterizeArray(params);
        
        window.location.replace("words.php" + uri_str);
    }); // end #dropdown-menu-sort.on.click
});
