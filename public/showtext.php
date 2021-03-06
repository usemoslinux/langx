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
require_once APP_ROOT . 'includes/checklogin.php'; // check if user is logged in and set $user object

use Aprelendo\Includes\Classes\Reader;

try {
    $html = '';
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $is_shared = isset($_GET['sh']) && $_GET['sh'] != 0 ? true : false;

        // check if user has access to view this text
        if (!$user->isAllowedToAccessElement('shared_texts', (int)$_GET['id'])) {
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }

        $reader = new Reader($pdo, $is_shared, $_GET['id'], $user->getId(), $user->getLangId());
        $prefs = $reader->getPrefs();

        switch ($prefs->getDisplayMode()) {
            case 'light':
                $html = "class='lightmode'";
                break;
            case 'sepia':
                $html = "class='sepiamode'";
                break;
            case 'dark':
                $html = "class='darkmode'";
                break;
            default:
                break;
        }
        $font_family = $prefs->getFontFamily();
        $font_size = $prefs->getFontSize();
        $text_align = $prefs->getTextAlignment();
        
        $html .= " style='font-family:$font_family;font-size:$font_size;text-align:$text_align;'";
    } else {
        throw new \Exception('Oops! There was an error trying to fetch that text.');
    }
} catch (Exception $e) {
    header('Location:/login.php');
    exit;
}

require_once PUBLIC_PATH . 'head.php';

?>

<body id="readerpage" <?php echo $html; ?>>
    <div class="container-fluid">
        <div class="row">
            <div id="sidebar" class="col-2">
                <div class="sidebar">
                    <div class="sidebar-sticky-item my-4"><button type="button" data-toggle="modal"
                            data-target="#reader-settings-modal" class="btn btn-sm btn-secondary d-block" title="Reading settings">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button id="btn-toggle-audio-player-controls" type="button" class="btn btn-sm btn-primary d-block mt-2" title="Toggle sticky audio controls">
                            <i class="fas fa-headphones"></i>
                        </button>
                        
                        <button id="<?php echo $prefs->getAssistedLearning() ? 'btn-next-phase' : 'btn-save-text'; ?>" type="button" class="btn btn-sm btn-success d-block mt-2" title="Go to phase 2: Listening">
                            <i class="fas fa-chevron-circle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-10 col-sm-8 pl-0 pr-4 pr-sm-0">
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
        require_once PUBLIC_PATH . 'showdicmodal.php'; // load dictionary modal window
        require_once PUBLIC_PATH . 'showreadersettingsmodal.php'; // load preferences modal window
    ?>

    <script defer src="js/underlinewords-min.js"></script>
    <script defer src="js/showtext-min.js"></script>
</body>

</html>