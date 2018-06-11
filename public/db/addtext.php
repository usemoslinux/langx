<?php 
  require_once('dbinit.php'); // connect to database
  if ($_POST['mode'] == 'rss') { // add rss entry
    if (isset($_POST['title']) && isset($_POST['text'])) {
      $actlangid = $_COOKIE['actlangid'];
      $title = mysqli_real_escape_string($con, $_POST['title']);
      $author = mysqli_real_escape_string($con, $_POST['author']);
      $link = mysqli_real_escape_string($con, $_POST['url']);
      $text = mysqli_real_escape_string($con, $_POST['text']);
  
      $result = mysqli_query($con, "INSERT INTO texts (textLgID, textTitle, textAuthor, text, textSourceURI)
                VALUES ('$actlangid', '$title', '$author', '$text', '$url')") or die(mysqli_error($con));
  
      // if successful, return insert_id in json format
      $arr = array('insert_id' => mysqli_insert_id($con));
      echo json_encode($arr);
    }
  } else if ($_POST['mode'] == 'simple') { // add simple text
    if (isset($_POST['title']) && isset($_POST['text'])) {
      $actlangid = $_COOKIE['actlangid'];
      $title = mysqli_real_escape_string($con, $_POST['title']);
      $author = mysqli_real_escape_string($con, $_POST['author']);
      $source_url = mysqli_real_escape_string($con, $_POST['url']);
      $text = mysqli_real_escape_string($con, $_POST['text']);
    
      // Audio file validation
      if (isset($_FILES['audio']) && $_FILES['audio']['error'] !== UPLOAD_ERR_NO_FILE) {
        $target_dir = APP_ROOT . '/public/uploads/';
        $target_file_name = basename($_FILES['audio']['name']);
        $target_file_URI = $target_dir . $target_file_name;
  
        $file_extension = pathinfo($target_file_URI,PATHINFO_EXTENSION);
        $file_size = $_FILES['audio']['size'] / 1024; // size in KBs
  
        $upload_max_filesize = ini_get('upload_max_filesize'); // max file size
        $allowed_extensions = array('mp3', 'ogg');
  
        $errormsg = "";
        
        // Check if file exists
        if (file_exists($target_file_URI)) {
          $errormsg .= "File already exists. Change the file name and try again.\n";
        }
  
        // Check file size
        if ($_FILES['audio']['error'] == UPLOAD_ERR_INI_SIZE) {
          $errormsg .= "File size should be less than $upload_max_filesize\n" .
          "This is a limitation of the hosting server.\n" .
          "If you have access to the php ini file you can fix this by changing the <code>upload_max_filesize</code> setting.\n" .
          "If you can't, please ask your host to increase the size limits.\n";
        }
  
          // Check file extension
          $allowed_ext = false;
          for ($i=0; $i < sizeof($allowed_extensions); $i++) {
            if (strcasecmp($allowed_extensions[$i], $file_extension) == 0) {
              $allowed_ext = true;
            }
          }
  
          if (!$allowed_ext) {
            $errormsg .= 'Only the following file types are supported: ' . implode(', ', $allowed_extensions) . "\n";
          }
  
          // upload file & save info to db
          if ($_FILES['audio']['error'] == UPLOAD_ERR_OK && empty($errormsg)) {
            if (!is_dir($target_dir)) {
              mkdir($target_dir);
            }
            // try to move file to uploads folder. If this fails, show error message
            if (!move_uploaded_file($_FILES['audio']['tmp_name'], $target_file_URI)) {
              $errormsg .= "Sorry, there was an error uploading your file.\n";
            }
          }
        } elseif ($_FILES['audio']['error'] == UPLOAD_ERR_INI_SIZE) {
          $errormsg .= "File size should be less than $upload_max_filesize.";
        }
  
      if (empty($errormsg)) {
        // save text in db
        $audio_uri = empty($target_file_name) ? '' : '/uploads/' . $target_file_name;
        if (!empty($_POST['id'])) {
          $id = $_POST['id'];
          $sql = "UPDATE texts SET textLgId='$actlangid', textTitle='$title',
          textAuthor='$author', text='$text', textAudioURI='$audio_uri', 
          textSourceURI='$source_url' WHERE textID='$id'";
        } else {
          $sql = "INSERT INTO texts (textLgId, textTitle, textAuthor, text, textAudioURI, textSourceURI)
          VALUES ('$actlangid', '$title', '$author', '$text', '$audio_uri', '$source_url') ";
        }
        $result = mysqli_query($con, $sql) or die(mysqli_error($con));
        //$error = mysqli_error($con);
        $arr = array('success_msg' => 'success');
        echo json_encode($arr);
        //$error = mysqli_error($con);
        //header('Location: /');
      } else {
        $arr = array('error_msg' => $errormsg);
        echo json_encode($arr);
      }
  
      // //catch file overload error...
      // if (empty($_FILES) && empty($_POST) && isset($_SERVER['REQUEST_METHOD']) && strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
      //   $post_max_size = ini_get('post_max_size'); //grab the size limits...
      //   echo  "<div class='alert alert-danger'>Please note that posts larger than $post_max_size will result in this error!" .
      //         "<br>This is a limitation of the hosting server." .
      //         "<br>If you have access to the php ini file you can fix this by changing the <code>post_max_size</code> setting." .
      //         "<br>If you can't, please ask your host to increase the size limits.</div>";
      // }
    }
  }
?>