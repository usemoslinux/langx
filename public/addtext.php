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

require_once('header.php');
?>

<div class="container mtb">
    <div class="row">
        <div class="col-lg-12">
            <ol class="breadcrumb">
                <li>
                    <a href="texts.php">Home</a>
                </li>
                <li>
                    <a class="active">Add text</a>
                </li>
            </ol>
            <?php
          if (isset($_GET['id'])) { // modify text
              $id = $_GET['id'];
              $result = $con->query("SELECT textTitle, textAuthor, text, textSourceURI FROM texts WHERE textID='$id'") or die(mysqli_error($con));
              $row = $result->fetch_assoc();
              $art_title = $row['textTitle'];
              $art_author = $row['textAuthor'];
              $art_url = $row['textSourceURI'];
              $art_content = $row['text'];
          } elseif (isset($_POST['art_title'])) { // rss
              $art_title = $_POST['art_title'];
              $art_author = $_POST['art_author'];
              $art_url = $_POST['art_url'];
              $art_content = $_POST['art_content'];
              $art_is_shared = $_POST['art_is_shared'];
          } elseif (isset($_GET['url'])) { // external call (bookmarklet, addon)
              $art_url = $_GET['url'];
              $external_call = true;
          }
        ?>
                <div id="alert-error-msg" class="hidden"></div>
                <form id="form-addtext" data-premium="<?php echo $user->isPremium() ? 1 : 0; ?>" action="" class="add-form" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="id" value="<?php if (isset($id)) {echo $id;}?>" />
                    <input type="hidden" name="mode" value="simple" />
                    <div class="form-row">
                        <div class="form-group col-xs-12">
                            <label for="type">Type:</label>
                            <select name="type" id="type" class="form-control">
                                <option value="1">Article</option>
                                <option value="2">Conversation</option>
                                <option value="3">Letter</option>
                                <option value="4">Song</option>
                                <option value="7">Other</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title" class="form-control" maxlength="200" placeholder="Text title (required)" autofocus
                                required value="<?php if (isset($art_title)) {echo $art_title;}?>">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="author">Author:</label>
                            <input type="text" id="author" name="author" class="form-control" maxlength="100" placeholder="Author full name (optional)"
                                value="<?php if (isset($art_author)) {echo $art_author;}?>">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-xs-12">
                            <div class="input-group">
                                <label for="url">Source URL:</label>
                                <input type="url" id="url" name="url" class="form-control" placeholder="Source URL (optional)" value="<?php if (isset($art_url)) {echo $art_url;}?>">
                                <div class="input-group-btn">
                                    <button id="btn-fetch" class="btn btn-default" type="button">
                                        <i id="btn-fetch-img" class="fas fa-arrow-down"></i> Fetch</button>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group col-md-3">
                            <input class="hidden" id="audio-uri" type="file" name="audio" accept="audio/mpeg,audio/ogg">
                            <button id="btn-upload-audio" type="button" class="btn btn-primary btn-upload">
                                <i class="fas fa-upload"></i>&nbsp;Upload audio
                            </button>
                        </div> -->
                    </div>
                    <div class="form-row">
                        <div class="form-group col-xs-12">
                            <label for="text">Text:</label>
                            <textarea id="text" name="text" class="form-control" rows="16" cols="80" maxlength="20000" placeholder="Text goes here (required), max. length = 20,000 chars"
                                required><?php if (isset($art_content)) {echo $art_content;}?></textarea>
                            <label for="upload-text" id="upload-txtfile-label">Upload txt file:</label>
                            <input id="upload-text" type="file" name="upload-text" accept=".txt">
                            <div id="shared-text-wrapper-div" class="checkbox">
                                <label for="shared-text" id="shared-text-label">
                                    <input id="shared-text" type="checkbox" name="shared-text" <?php if (isset($art_is_shared)) {echo 'checked';}?>> Share text with the community
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-xs-12 text-right">
                            <?php if (isset($external_call)) { echo '<input id="external_call" type="hidden">'; } ?>
                            <a type="button" id="btn_cancel" name="cancel" class="btn btn-static" onclick="window.location='/'">Cancel</a>
                            <button type="submit" id="btn-save" name="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>                    
                </form>
        </div>
    </div>
</div>

<script src="js/readability/Readability.js"></script>
<script src="js/addtext.js"></script>

<?php require_once 'footer.php'?>