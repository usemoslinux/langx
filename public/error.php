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

$error = isset($_GET['error']) ? $_GET['error'] : '';
$error_msg = isset($_GET['message']) ? $_GET['message'] : '';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="Language learning platform designed to boost your reading, listening, speaking and writing skills.">
    <meta name="keywords"
        content="language, learning, language learning, flashcards, total reading, reading, news, ebooks, books, videos">
    <meta name="author" content="Aprelendo">
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />

    <title>Aprelendo: Learn languages with your favorite texts, ebooks and videos</title>

    <link rel="stylesheet" type="text/css" href="css/500.css">
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Lato">
</head>

<body>
    <div class="page-wrap">
        <h1>Oops!</h1>
        <h2><?php echo $error; ?></h2>
        <p><?php echo $error_msg; ?></p>
        <p><a href="/">Home</a></p>
    </div>
</body>

</html>