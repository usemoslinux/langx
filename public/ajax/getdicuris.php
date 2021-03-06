<?php
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

require_once '../../includes/dbinit.php'; // connect to database
require_once APP_ROOT . 'includes/checklogin.php'; // loads User class & checks if user is logged in

use Aprelendo\Includes\Classes\Language;

try {
    $lang = new Language($pdo, $user->getId());
    $lang->loadRecord($user->getLangId());

    $result['dictionary_uri'] = $lang->getDictionaryUri();
    $result['translator_uri'] = $lang->getTranslatorUri();

    echo json_encode($result);
} catch (\Exception $e) {
    $result['error_msg'] = $e->getMessage();
    echo json_encode($result);
}
