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

if (isset($_POST['word'])) {
    require_once('dbinit.php'); // connect to database
    require_once(PUBLIC_PATH . '/classes/words.php'); // loads Words class
    require_once(PUBLIC_PATH . '/db/checklogin.php'); // loads User class & checks if user is logged in
    
    $user_id = $user->id;
    $learning_lang_id = $user->learning_lang_id;
    
    $word = $_POST['word'];
    $status = 2;
    $isphrase = $_POST['isphrase'];
    
    try {
        $words_table = new Words($con, $user_id, $learning_lang_id);
        $result = $words_table->add($word, $status, $isphrase);

        if (!$result) {
            throw new Exception ('Oops! There was an unexpected error trying to add this word.');
        }
    } catch (Exception $e) {
        $error = array('error_msg' => $e->getMessage());
        header('Content-Type: application/json');
        echo json_encode($error);
    }
    
}
?>