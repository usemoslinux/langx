<?php
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

require_once '../includes/dbinit.php'; // connect to database
require_once APP_ROOT . 'includes/checklogin.php'; // loads User class & checks if user is logged in

use Aprelendo\Includes\Classes\Texts;
use Aprelendo\Includes\Classes\TextTable;
use Aprelendo\Includes\Classes\ArchivedTexts;
use Aprelendo\Includes\Classes\Pagination;

$user_id = $user->id;
$learning_lang_id = $user->learning_lang_id;

// set variables used for pagination
$page = 1;
$limit = 10; // number of rows per page
$adjacents = 2; // adjacent page numbers

// set variables used for creating the table
$headings = array('Title');
$col_widths = array('33px', '');
$action_menu = $show_archived ? array('mArchive' => 'Unarchive', 'mDelete' => 'Delete') : array('mArchive' => 'Archive', 'mDelete' => 'Delete');
$sort_menu = array( 'mSortByNew' => 'New first', 'mSortByOld' => 'Old first');
$sort_by = isset($_GET['o']) && !empty($_GET['o']) ? $_GET['o'] : 0;

if (isset($_GET) && !empty($_GET)) { // if the page is loaded because user searched for something, show search results
    // initialize pagination variables
    if (isset($_GET['p'])) {
        $page = !empty($_GET['p']) ? $_GET['p'] : 1;
    }
    
    // calculate page count for pagination
    if ($show_archived) {
        $texts_table = new ArchivedTexts($con, $user_id, $learning_lang_id);
    } else {
        $texts_table = new Texts($con, $user_id, $learning_lang_id);
    }
    
    $total_rows = $texts_table->countRowsFromSearch($filter_sql, $search_text);
    $pagination = new Pagination($page, $limit, $total_rows, $adjacents);
    $offset = $pagination->offset;
    
    // get search result
    $rows = $texts_table->getSearch($filter_sql, $search_text, $offset, $limit, $sort_by);
    
    // print table
    if ($rows != false) { // if there are any results, show them
        $table = New TextTable($headings, $col_widths, $rows, $show_archived, $action_menu, $sort_menu);
        echo $table->print($sort_by);

        echo $pagination->print('texts.php', $search_text, $sort_by, $filter, $show_archived); // print pagination
    } else { // if there are no texts to show, print a message
        echo '<p>No texts found with that criteria. Try again.</p>';
    }
} else { // if page is loaded at startup, show start page
    // initialize pagination variables
    $page = isset($_GET['p']) && $_GET['p'] != '' ? $_GET['p'] : 1;
    
    if ($show_archived) {
        $texts_table = new ArchivedTexts($con, $user_id, $learning_lang_id);
    } else {
        $texts_table = new Texts($con, $user_id, $learning_lang_id);
    }

    $total_rows = $texts_table->countAllRows();
    $pagination = new Pagination($page, $limit, $total_rows, $adjacents);
    $offset = $pagination->offset;
    
    // get text list
    $rows = $texts_table->getAll($offset, $limit, $sort_by);
    
    // print table
    if ($rows != false) {
        $table = New TextTable($headings, $col_widths, $rows, $show_archived, $action_menu, $sort_menu);
        echo $table->print($sort_by);

        echo $pagination->print('texts.php', '', $sort_by, $filter, $show_archived); // print pagination
    } else { // if there are no texts to show, print a message
        echo '<p class="text-center">Your private library is empty. Check out some <a href="sources.php">popular sources</a> for this language.</p>';
    }
    
}
?>

<script defer src="js/listtexts.js"></script>
