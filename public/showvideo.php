<!DOCTYPE html>
<html id="html-video" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />
    <title>Aprelendo</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">

    <!-- JQuery & Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</head>

<body id="readerpage"
<?php
require_once('../includes/dbinit.php');  // connect to database
require_once(APP_ROOT . 'includes/checklogin.php'); // check if user is logged in and set $user object

use Aprelendo\Includes\Classes\Reader;
use Aprelendo\Includes\Classes\Videos;

try {
    $id_is_set = isset($_GET['id']) && !empty($_GET['id']);
    if ($id_is_set) {
        $is_shared = isset($_GET['sh']) && $_GET['sh'] != 0 ? true : false;

        // check if user has access to view this text
        if (!$user->isAllowedToAccessElement('sharedtexts', $_GET['id']) || !$is_shared) {
            throw new Exception ('User is not authorized to access this file.');
        }
        
        $reader = new Reader($con, $is_shared, $_GET['id'], $user->id, $user->learning_lang_id);
        
        $video = new Videos($con, $user->id, $user->learning_lang_id);
        $video_row = $video->getById($_GET['id']);
        $yt_id = $video->extractYTId($video_row['stextSourceURI']);

        switch ($reader->display_mode) {
            case 'light':
            echo "class='lightmode'";
            break;
            case 'sepia':
            echo "class='sepiamode'";
            break;
            case 'dark':
            echo "class='darkmode'";
            break;
            default:
            break;
        }
        $font_family = $reader->font_family;
        $font_size = $reader->font_size;
        $text_align = $reader->text_align;
        
        echo " style='font-family:$font_family;font-size:$font_size;text-align:$text_align;>'";
    } else {
        throw new Exception ('Oops! There was an error trying to fetch that video.');
    }
} catch (Exception $e) {
    header('Location:/login.php');
    exit;
}
?>
>

        <div class="container-fluid">
            <div class="row">
                <?php
                    if (isset($reader)) {
                        echo $reader->showVideo($yt_id);
                    }
                ?>
            </div>
        </div>

        <?php 
        require_once(PUBLIC_PATH . 'showdicmodal.php'); // load dictionary modal window
        ?>
        
        <script src="js/showvideo.js"></script>

</body>

<script src="js/ytvideo.js"></script>

</html>