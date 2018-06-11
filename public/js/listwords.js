$(document).ready(function () {

  $('#search').focus();
  $('input:checkbox').prop('checked', false);

  // action menu implementation

  /**
   * Deletes selected words from the database
   * Trigger: when user selects "Delete" in the action menu
   */
  $("#mDelete").on("click", function () {
    if (confirm("Really delete?")) {
      var ids = [];
      $("input[class=chkbox-selrow]:checked").each(function () {
        ids.push($(this).attr('data-idWord'));
      });

      /**
       * Deletes selected words from the database (based on their ID).
       * When done, also removes selected rows from HTML table.
       * @param  {integer array} textIDs Ids of the selected elements in the database
       */
      $.ajax({
          url: 'db/removeword.php',
          type: 'POST',
          data: {
            wordIDs: JSON.stringify(ids)
          }
        })
        .done(function () {
          window.location.replace('words.php?page=' + getCurrentPage().page);
        })
        .fail(function (request, status, error) {
          alert("There was an error when trying to delete the selected words. Refresh the page and try again.");
        });
      // end ajax
    } // end if
  }); // end mDelete.on.Click

  /**
   * Enables/Disables action menu based on the number of selected elements.
   * If there is at least 1 element selected, it enables it. Otherwise, it is disabled.
   */
  function toggleActionMenu() {
    if ($('input[type=checkbox]:checked').length === 0) {
      $('#actions-menu').addClass('disabled');
    } else {
      $('#actions-menu').removeClass('disabled');
    }
  } // end toggleActionMenu

  /**
   * Returns current page
   */
  function getCurrentPage() {
    var parts = window.location.search.substr(1).split("&");
    if (parts == '') {
      result = {
        page: 1
      };
    } else {
      var result = {};
      for (var i = 0; i < parts.length; i++) {
        var temp = parts[i].split("=");
        result[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
      }
    }
    return result;
  } // end getCurrentPage

  $(document).on('change', '.chkbox-selrow', toggleActionMenu);

  /**
   * Selects/Unselects all texts from the list
   */
  $(document).on('click', '#chkbox-selall', function () {
    var chkboxes = $('.chkbox-selrow');
    chkboxes.prop('checked', $(this).prop('checked'));
    toggleActionMenu();
  });

});