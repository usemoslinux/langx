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

require_once '../../includes/dbinit.php'; // connect to database
require_once APP_ROOT . 'includes/checklogin.php'; // loads User class & checks if user is logged in

stream_context_set_default(
    array(
     'http' => array(
      'proxy' => "tcp://www-proxy.mrec.ar:8080",
      'request_fulluri' => true      
     )
    )
   );

try {
    if (isset($_GET['url']) && !empty($_GET['url'])) {
        $url = $_GET['url'];
        $result = @file_get_contents($url);
        echo $result ? $result : '';
    } else {
        throw new Exception ('There was a problem retrieving that URL. Please check it is not empty or malformed.');
    }    
} catch (Exception $e) {
    $error = array('error_msg' => $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode($error);
}

?>