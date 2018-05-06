<?php
session_start();

require_once 'db/dbinit.php';

$userid = '1';

// save preferences values in $_SESSION

$result = mysqli_query($con, "SELECT * FROM preferences WHERE prefUserId = '$userid'");
$row = mysqli_fetch_assoc($result);

$_SESSION['fontfamily'] = isset($row['prefFontFamily']) ? $row['prefFontFamily'] : "Helvetica";
$_SESSION['fontsize'] = isset($row['prefFontSize']) ? $row['prefFontSize'] : '12px';
$_SESSION['lineheight'] = isset($row['prefLineHeight']) ? $row['prefLineHeight'] : '1';
$_SESSION['alignment'] = isset($row['prefAlignment']) ? $row['prefAlignment'] : 'left';
$_SESSION['mode'] = isset($row['prefMode']) ? $row['prefMode'] : 'light';
$_SESSION['actlangid'] = isset($row['prefActLangId']) ? $row['prefActLangId'] : 0;

require_once('header.php');
?>

  <!-- *****************************************************************************************************************
TABS
***************************************************************************************************************** -->

  <div class="container mtb">
    <div class="row">
      <div class="col-lg-12">
        <!-- Tabs  -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
            <a href="#mytexts" aria-controls="mytexts" role="tab" data-toggle="tab">
              <span class="glyphicon glyphicon-book"></span> My texts</a>
          </li>
          <li role="presentation" class="nav">
            <a href="#rss" aria-controls="rss" role="tab" data-toggle="tab">
              <span class="glyphicon glyphicon-fire"></span> RSS</a>
          </li>
        </ul>

        <!-- Tab panes: content inside tabs -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane fade in active" id="mytexts">
            <div class="row flex">
              <div class="col-xs-12 col-md-9">
                <form class="" action="" method="post">
                  <div class="input-group searchbox">
                    <input type="text" id="search" name="searchtext" class="form-control" placeholder="Search...">
                    <div class="input-group-btn">
                      <button type="submit" name="submit" class="btn btn-default">
                        <i class="glyphicon glyphicon-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-xs-12 col-md-3 searchbox">
                <button type="button" name="btn-addtext" class="btn btn-default" onclick="window.location='addtext.php'">
                  <span class="glyphicon glyphicon-plus"></span> Add text</button>
                <button type="file" name="btn-upload" class="btn btn-success">
                  <span class="glyphicon glyphicon-upload"></span> Upload text</button>
              </div>
            </div>
            <?php $showarchivedtexts = false; require_once('listtexts.php') ?>
          </div>
          <div role="tabpanel" class="tab-pane fade" id="rss">chau</div>
        </div>
      </div>
    </div>
  </div>
  
<?php require_once('footer.php') ?>
