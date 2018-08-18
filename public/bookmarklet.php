<?php require_once('header.php');?>

<div class="container mtb">
  <div class="row">
    <div class="col-xs-12">
      <ol class="breadcrumb">
        <li>
          <a href="texts.php">Home</a>
        </li>
        <li>
          <a class="active">Bookmarklet</a>
        </li>
      </ol>
      <div id="more_content" class="row flex">
        <div class="col-xs-12">
          <h4>What are bookmarklets?</h4>
          <p>Bookmarklets are a "one-click" tool which add functionality to the browser. From a user perspective, they work very much like regular bookmarks.</p>
          <p>For more information on bookmarklets, I suggest reading <a href="https://en.wikipedia.org/wiki/Bookmarklet">Wikipedia's article</a> on this subject.</p>
          <br>
            <h4>How are bookmarklets different from extensions?</h4>
          <ul>
            <li>They do basic tasks on clicking.</li>
            <li>They are universal, i.e. they usually work on any browser and whatever the platform, mobile or desktop.</li>
            <li>They are managed as any bookmarks.</li>
          </ul>
          <br>
          <h4>What does LangX use bookmarklets for?</h4>
          <p>LangX uses bookmarklets to automagically parse the text of the current web page and add it to your library.</p>
          <p>It's an alternative to creating specific addons for different browsers. It's easier to implement and has the added advantage that it works in almost any device and/or browser.</p>
          <br>
          <h4>How do I install LangX's bookmarklet in my web browser?</h4>
          <p>To install the bookmarklet, simply:</p>
          <h5>Desktops</h5>
          <ol>
            <li>Show the Bookmarks Toolbar:
              <p>In Firefox: Go to <kbd>View</kbd> > <kbd>Toolbars</kbd> > <kbd>Bookmarks toolbar</kbd></p>
              <p>In Google Chrome: Go to <kbd>View</kbd> > <kbd>Show bookmarks bar</kbd></p></li>
            <li>Drag the following link (<a href="javascript:(function()%7Bvar%20is_yt_url%20%3D%20false%3B%0A%20%20%20%20%20%20%20%20var%20url%20%3D%20location.href%3B%0A%20%20%20%20%20%20%20%20var%20yt_urls%20%3D%20new%20Array('https%3A%2F%2Fwww.youtube.com%2Fwatch'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'https%3A%2F%2Fm.youtube.com%2Fwatch'%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20'https%3A%2F%2Fyoutu.be%2F')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20for%20(let%20i%20%3D%200%3B%20i%20%3C%20yt_urls.length%3B%20i%2B%2B)%20%7B%0A%20%20%20%20%20%20%20%20%09if%20(url.lastIndexOf(yt_urls%5Bi%5D)%20%3D%3D%3D%200)%20%7B%0A%09%09%09%09location.href%3D'https%3A%2F%2Flocalhost%2Faddvideo.php%3Furl%3D'%2BencodeURIComponent(url)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20is_yt_url%20%3D%20true%3B%0A%20%20%20%20%20%20%20%20%09%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20if%20(!is_yt_url)%0A%20%20%20%20%20%20%20%20%09location.href%3D'https%3A%2F%2Flocalhost%2Faddtext.php%3Furl%3D'%2BencodeURIComponent(url)%3B%7D)()%3B">Add to LangX</a>) to your Bookmarks Toolbar. It should now appear on the toolbar. </li>
          </ol>
          <p>test </p>
          <h5>Mobile devices</h5>
          <p>Adding bookmarklets to mobile devices can easily become very cumbersome if you do not know how to do it.</p>
          <p>The easiest way is to add the bookmarklet in your desktop device, synchronize your favorite Internet browser and wait for the bookmarklet to be automatically added to your mobile device.</p>
          <br>
          <h4>How to use LangX's bookmarklet once installed</h4>
          <h5>Desktops</h5>
          <p>Simply go to the web page you would like to add to you library and click on LangX's bookmarklet. It's as easy as it gets.</p>
          <h5>Mobile devices</h5>
          <p>Go to the web page you would like to add to you library, tap on the URL bar and start to write "LangX". Choose LangX's bookmarklet and let the magic happen.</p>
          <p>In both cases, you'll be redirected to LangX so that you can include audio and do other changes to the text before uploading it to your library.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require_once 'footer.php';?>