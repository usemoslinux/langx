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

require_once '../includes/dbinit.php';  // connect to database
require_once APP_ROOT . 'includes/checklogin.php'; // check if user is logged in and set $user object

$curpage = basename($_SERVER['PHP_SELF']); // returns the current file Name
$show_pages = array('showtext.php', 'showvideo.php', 'showebook.php');
$this_is_show_page = in_array($curpage, $show_pages);

if ($this_is_show_page) {
    $doclang = $user->getLang();

    // check if user has access to view this text
    $table = isset($_GET['sh']) && $_GET['sh'] != 0 ? 'shared_texts' : 'texts';
    if (!$user->isAllowedToAccessElement($table, (int)$_GET['id'])) {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }

    $is_shared = $table == 'shared_texts' ? true : false;
} else {
    $doclang = 'en';
}

?>

<!DOCTYPE html>
<html lang=<?php echo "\"$doclang\""; ?> >

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Language learning platform designed to boost your reading, listening, speaking and writing skills.">
    <meta name="keywords" content="language, learning, language learning, flashcards, total reading, reading, news, ebooks, books, videos">
    <meta name="author" content="Aprelendo">
    <meta name="google-signin-client_id" content="1031628353503-jauslklbhvifr2iv7rr0mglmmp496081.apps.googleusercontent.com" >
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />

    <title>Aprelendo: Learn languages with your favorite texts, ebooks and videos</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700%7CRaleway:400,700" />
    
    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">
    
    <!-- Font awesome icons -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">

    <!-- JQuery JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha384-vk5WoKIaW/vJyUAd9n/wmopsmNhiy+L2Z+SBxGYnUkunIxVxAv/UtMOhba/xskxh" crossorigin="anonymous"></script>

    <!-- Bootstrap JS -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

</head>

<?php
// show wallpaper on every page, except those in $show_pages array
if (!$this_is_show_page) {
    echo $curpage == 'gopremium.php' ? '<body class="blue-gradient-wallpaper">' : '<body class="pattern-wallpaper">';
}
?>

