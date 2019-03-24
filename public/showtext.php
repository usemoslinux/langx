<?php 
require_once('../includes/dbinit.php');  // connect to database
require_once(APP_ROOT . 'includes/checklogin.php'); // check if user is logged in and set $user object
?>
<!DOCTYPE html>
<html lang=<?php echo '"' . $user->learning_lang . '"'; ?>>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel='shortcut icon' type='image/x-icon' href='img/logo.svg' />
    <title>Aprelendo</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="css/styles.css" rel="stylesheet">
    
    <!-- JQuery & Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    
    <!-- Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    
</head>

<body id="readerpage"
<?php
use Aprelendo\Includes\Classes\Reader;

try {
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        // check if user has access to view this text
        $table = isset($_GET['sh']) && $_GET['sh'] != 0 ? 'sharedtexts' : 'texts';
        if (!$user->isAllowedToAccessElement($table, $_GET['id'])) {
            throw new Exception ('User is not authorized to access this file.');
        }

        $is_shared = $table == 'sharedtexts' ? true : false;
        $reader = new Reader($con, $is_shared, $_GET['id'], $user->id, $user->learning_lang_id);
        
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
        
        echo " style='font-family:$font_family;font-size:$font_size;text-align:$text_align;'";
    } else {
        throw new Exception ('>Oops! There was an error trying to fetch that text.');
    }
} catch (Exception $e) {
    header('Location:/login.php');
    exit;
}
?>
>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-lg-6 offset-lg-3">
                <?php
                    echo $reader->showText();
                    if ($is_shared) {
                        echo '<input type="hidden" id="is_shared">';
                    }
                ?>
                </div>
                
            </div>
        </div>

        <?php 
        require_once(PUBLIC_PATH . 'showdicmodal.php'); // load dictionary modal window
        ?>

        <script src="js/showtext.js"></script>

</body>

</html>