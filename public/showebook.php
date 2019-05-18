<?php
require_once('../includes/dbinit.php');  // connect to database
require_once(APP_ROOT . 'includes/checklogin.php'); // check if user is logged in and set $user object

use Aprelendo\Includes\Classes\Reader;

function getCSS($class, $styles) {
    $class_str = "class='$class'";
    $style_str = " style=\"";
    foreach ($styles as $style => $value) {
        $style_str .= "$style: $value; "; 
    }
    $style_str .= "\"";
    
    return $class_str . ' ' . $style_str; 
}

$class = '';
$styles = [];

try {
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        // check if user has access to view this text
        if (!$user->isAllowedToAccessElement('texts', $_GET['id'])) {
            throw new Exception ('User is not authorized to access this file.');
        }

        $is_shared = isset($_GET['sh']) && $_GET['sh'] != 0 ? true : false;
        $reader = new Reader($con, $is_shared, $_GET['id'], $user->id, $user->learning_lang_id);
        $result = '';
        
        switch ($reader->display_mode) {
            case 'light':
                $class = 'lightmode';
                break;
            case 'sepia':
                $class = 'sepiamode';
                break;
            case 'dark':
                $class = 'darkmode';
                break;
            default:
                break;
        }

        $styles['font-family'] = $reader->font_family;
        $styles['font-size'] = $reader->font_size;
        $styles['text-align'] = $reader->text_align;
        $styles['line-height'] = $reader->line_height;
    } else {
        throw new Exception ('Oops! There was an error trying to fetch that ebook.');
    }
} catch (Exception $e) {
    header('Location:/login.php');
    exit;
}

?>

<!DOCTYPE html>
<html <?php echo getCSS($class, []); ?> >

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />
    <title>Aprelendo</title>

    <!-- Epub.js & jszip -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
    <script defer src="js/epubjs/epub.min.js"></script>

    <!-- JQuery -->
    <script defer src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700|Raleway:400,700" />
    
    <!-- Extra style sheets -->
    <link rel="stylesheet" type="text/css" href="css/ebooks.css">
    <link rel="stylesheet" type="text/css" href="css/styles.css">


</head>

<body id="readerpage" <?php echo getCSS($class, $styles); ?> >

    <div id="navigation" class="sidebar-closed">
        <h1 id="title">...</h1>
        <image id="cover" width="150px" />
        <h2 id="author">...</h2>
        <div id="toc"></div>
    </div>

    <div id="main">
        <div id="header">
            <span id="opener">
                <span id="book-title" class="book-title d-none"></span>

                <svg height="24px" id="hamburger" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32"
                    width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
                </svg>
            </span>
            <span>
                <button class="basic btn btn-secondary float-right" id="btn-save">Save & Close</button>
                <div class="loading-spinner mx-auto float-right">
                    <div></div>
                    <div></div>
                </div>
            </span>
        </div>

        <a id="prev" href="#prev" class="navlink"></a>
        <div id="viewer" class="scrolled"></div>
        <a id="next" href="#next" class="navlink"></a>

    </div>

    <?php 
        require_once(PUBLIC_PATH . 'showdicmodal.php'); // load dictionary modal window
        ?>

    <!-- <script defer src="js/showtext.js"></script> -->
    <script data-id="<?php echo isset($_GET['id']) ? $_GET['id'] : '' ?>" src="js/showebook.js"></script>

    <?php
        $file_name = 'js/tour/' . basename($_SERVER['PHP_SELF'], ".php") . '.js';
        if (file_exists(PUBLIC_PATH . $file_name)) {
            echo "<script defer src='/$file_name'></script>";
        }
        ?>

</body>

</html>