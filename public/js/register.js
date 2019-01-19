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
  $('#form_register').on('submit', function (e) {
    e.preventDefault();

    var form_data = $('#form_register').serialize();
    
    $.ajax({
      type: "POST",
      url: "ajax/register.php",
      data: form_data
    })
    .done(function (data) {
      if(data.error_msg == null) {
        // window.location.replace('texts.php');
        showMessage('An email has been sent to your account with the activation link.', 'alert-success');
      } else {
        showMessage(data.error_msg, 'alert-danger');
      }
    })
    .fail(function (xhr, ajaxOptions, thrownError) {
      showMessage('Oops! There was an unexpected error when trying to register you. Please try again later.', 'alert-danger');
    }); // end of ajax
  }); // end of #form_register.on.submit


  /**
   * Shows custom message in the top section of the screen
   * @param {string} html
   * @param {string} type 
   */
  function showMessage(html, type) {
    $('#error-msg').html(html)
      .removeClass('hidden')
      .addClass('alert ' + type);
    $(window).scrollTop(0);
  } // end of showMessage

});