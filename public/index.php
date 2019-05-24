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

require_once '../includes/dbinit.php';

use Aprelendo\Includes\Classes\User;

$user = new User($con);

// if user is already logged in, go to "My Texts" section
if ($user->isLoggedIn()) {
    header('Location:texts.php');
    exit;
}

require_once PUBLIC_PATH . 'head.php';
?>

<!-- HEADERWRAP -->
<div id="headerwrap" class="headerwrap">
    <div class="blurry-background">
        <?php 
    require_once PUBLIC_PATH . 'simpleheader.php';
    ?>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h1>Learn foreign languages<br />by reading<br /> your favorite texts</h1>
                    <h5>Want to know more about our method? We call it
                        <a href="totalreading.php">
                            <u>total reading</u>.
                        </a></h5>
                    <br />
                    <h4>Select the language you want to learn to create an account <br>
                for free</h4>
                    <br />
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=english">
                        <span class="flag-icon">
                            <img src="img/flags/en.svg" alt="English" class="flag-icon">
                            <p>English</p>
                        </span>
                    </a>
                </div>
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=spanish">
                        <span class="flag-icon">
                            <img src="img/flags/es.svg" alt="Spanish" class="flag-icon">
                            <p>Spanish</p>
                        </span>
                    </a>
                </div>
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=portuguese">
                        <span class="flag-icon">
                            <img src="img/flags/pt.svg" alt="Portuguese" class="flag-icon">
                            <p>Portuguese</p>
                        </span>
                    </a>
                </div>
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=french">
                        <span class="flag-icon">
                            <img src="img/flags/fr.svg" alt="French" class="flag-icon">
                            <p>French</p>
                        </span>
                    </a>
                </div>
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=italian">
                        <span class="flag-icon">
                            <img src="img/flags/it.svg" alt="Italian" class="flag-icon">
                            <p>Italian</p>
                        </span>
                    </a>
                </div>
                <div class="col-sm-4 col-lg-2">
                    <a href="register.php?tolang=german">
                        <span class="flag-icon">
                            <img src="img/flags/de.svg" alt="German" class="flag-icon">
                            <p>German</p>
                        </span>
                    </a>
                </div>
                <!--/col -->
            </div>
            <!-- /row -->
        </div>
        <!-- /container -->
    </div>

</div>
<!-- /headerwrap -->

<!-- SERVICE -->
<div id="service" class="service">
    <div class="container">
        <div class="row centered">
            <div class="col-lg-4">
                <i class="fab fa-osi"></i>
                <h4>Open source</h4>
                <p>Aprelendo is open source software, meaning you can download and fiddle with its source code. This
                    allows us to be super transparent and build a community of users and developers. With some
                    technical knowledge, you can even build your own Aprelendo environment.</p>
                <p>
                    <br />
                    <a href="https://github.com/usemoslinux/aprelendo" target="_blank" rel="noopener noreferrer"
                        class="btn btn-theme">More
                        Info</a>
                </p>
            </div>
            <div class="col-lg-4">
                <i class="fas fa-book-open"></i>
                <h4>Total Reading</h4>
                <p>Immersion is the best way to learn a language, but few -if any- online tools allow you to create
                    an
                    immersive environement. Total reading is a system developed to achieve this goal, from the
                    comfort
                    of your home and with enough flexibility to adapt to your schedules and needs.</p>
                <p>
                    <br />
                    <a href="totalreading.php" class="btn btn-theme">More Info</a>
                </p>
            </div>
            <div class="col-lg-4">
                <i class="fas fa-mobile-alt"></i>
                <h4>Use it on any device</h4>
                <p>You can use Aprelendo on mobile and desktop devices as long as they have an Internet connection.
                    We
                    offer
                    addons for Firefox and Chrome to add texts to your library with the click of a mouse.
                    Bookmarklets
                    are also available for those who prefer a browser agnostic solution.</p>
                <p>
                    <br />
                    <a href="extensions.php" class="btn btn-theme">More Info</a>
                </p>
            </div>
        </div>
        <!--/row -->
    </div>
    <!--/container -->
</div>
<!--/service -->

<!-- HOW IT WORKS -->
<div class="hiw">
    <div class="container">
        <div class="row">
            <h1 id="hiw" class="col-12">How it works</h1>
            <div class="col-xl-6">
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/5HLr9uxJNDs" frameborder="0" allowfullscreen
                        class="video"></iframe>
                </div>
            </div>
            <div class="col-xl-6">
                <ol>
                    <li>Add texts & Youtube videos to your Aprelendo library using our <a href="extensions.php"
                            target="_blank" rel="noopener noreferrer">extensions</a>. Premium users can also upload
                        ebooks and add texts from RSS feeds.</li>
                    <li>Read texts (or transcripts) and look up words you don't know.</li>
                    <li>Whenever you encounter these words they will appear underlined in yellow, indicating you are still learning them. After a couple times without looking for their meaning, the underlining will
                        turn green.</li>
                    <li>If you turn on assisted learning, you will practice not only your reading comprehension
                        skills but also your listening, speaking and writing skills. For more info on this, check
                        our <a href="totalreading.php" target="_blank" rel="noopener noreferrer">total reading</a>
                        section.</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<?php require_once 'footer.php'?>