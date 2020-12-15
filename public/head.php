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

require_once '../includes/dbinit.php';  // connect to database

$curpage = basename($_SERVER['PHP_SELF']); // returns the current file Name
$show_pages = array('showtext.php', 'showvideo.php', 'showebook.php');

// these are the same pages that use simpleheader.php instead of header.php
$no_login_required_pages = array('index.php', 'register.php', 'login.php', 'accountactivation.php', 
                                 'aboutus.php', 'privacy.php', 'attributions.php', 'extensions.php', 'support.php', 
                                 'totalreading.php', 'compatibledics.php', 'error.php', 'forgotpassword.php', 
                                 'gopremium.php');

// check if login is required to access page
if (!in_array($curpage, $no_login_required_pages)) {
    require_once APP_ROOT . 'includes/checklogin.php'; // check if user is logged in and set $user object
}                                 

// check if user is allowed to view this page
$this_is_show_page = in_array($curpage, $show_pages);

if ($this_is_show_page) {
    $doclang = $user->getLang();

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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Language learning platform designed to boost your reading, listening, speaking and writing skills.">
    <meta name="keywords" content="language, learning, language learning, flashcards, total reading, reading, news, ebooks, books, videos">
    <meta name="author" content="Aprelendo">
    <meta name="google-signin-client_id" content="913422235077-p01j7jbo80c7vpbesb4uuvl10vemfl13.apps.googleusercontent.com" >
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />

    <title>Aprelendo: Learn languages with your favorite texts, ebooks and videos</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700%7CRaleway:400,700" integrity="sha384-VMwax1QiSiP2EeDnJ3RhuYjZx6Kl3hp/QcrUwm52HErp+KFOuG5f/Z6N1UR8PoWT" crossorigin="anonymous">
    
    <!-- Custom styles for this template -->
    <link href="css/styles-min.css" rel="stylesheet">
    
    <!-- Font awesome icons -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V" crossorigin="anonymous"> 

    <!-- JQuery JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha384-ZvpUoO/+PpLXR1lu4jmpXWu80pZlYUAfxl5NsBMWOEPSjUn/6Z/hRTt8+pR6L4N2" crossorigin="anonymous"></script>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <!-- Google API -->
    <script src="https://apis.google.com/js/platform.js?onload=init" integrity="sha384-dnjYPXNV5CV3yDkFR3TILkxSZmaRe8eDq+NXUrCAU4uqwZAQnIt8HlXt6SAxnNXW" crossorigin="anonymous"></script>
</head>

<?php
// show wallpaper on every page, except those in $show_pages array
if (!$this_is_show_page) {
    echo $curpage == 'gopremium.php' ? '<body class="blue-gradient-wallpaper">' : '<body class="pattern-wallpaper">';
}

?>
