<?php

if (isset($_POST['word'])) {
  require_once('dbinit.php'); // connect to database

  $word = mysqli_real_escape_string($con, $_POST['word']);
  $status = 2;
  //$isphrase = filter_var($_POST['isphrase'], FILTER_VALIDATE_BOOLEAN);
  $isphrase = $_POST['isphrase'];
  $lgid = $_COOKIE['actlangid'];

  $result = mysqli_query($con, "INSERT words (wordLgId, word, wordStatus, isPhrase, wordCreated)
             VALUES ($lgid, '$word', $status, $isphrase, now()) ON DUPLICATE KEY UPDATE
             wordLgId=$lgid, word='$word', wordStatus=$status, isPhrase=$isphrase, wordModified=now()") 
             or die(mysqli_error($con));
  // $result = mysqli_query($con, "REPLACE INTO words (wordLgId, word, wordStatus, isPhrase, wordCreated)
  //           VALUES ($lgid, '$word', $status, $isphrase, now())") or die(mysqli_error($con));
}
?>