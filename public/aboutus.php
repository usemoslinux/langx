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
 
require_once '../includes/dbinit.php'; // connect to database
require_once PUBLIC_PATH . 'head.php';

use Aprelendo\Includes\Classes\User;

$user = new User($pdo);

if (!$user->isLoggedIn()) {
    require_once PUBLIC_PATH . 'simpleheader.php';
} else {
    require_once PUBLIC_PATH . 'header.php';
}
?>

<div class="container mtb d-flex flex-grow-1 flex-column">
    <div class="row">
        <div class="col-sm-12">
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="index.php">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                        <span class="active">About us</span>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    
    <main>
        <div class="simple-text">
            <!-- TEAM -->
            <div class="row vertical-align-center">
                <div class="col-sm-9">
                    <section>
                        <h4>Team</h4>
                        <p>Hey guys! I'm <strong>Pablo</strong>, creator of Aprelendo. I'm a <strong>diplomat</strong> and as part of my job I'm always in contact with people from other countries and frequently need to communicate in several languages.</p>
                        
                        <p>I have always been intrigued by how people can become fluent in a second language. Think about it, we all learned our native language without problems. So, <strong>why is it so difficult to learn additional languages?</strong> Well, for starters, we learned our native language in an immersive environment, while we generally try to study other languages in a very limited and sporadic way, whether due to lack of time, necessity or desire. We think that approaching the task in a more "rational" and "methodical" fashion will make things easier, but on the contrary this is rarely effective. You probably speak your native language without knowing all its rules by heart, but you still use it every day. In contrast, when you study other languages, you spend hours analyzing rules or different meanings of some words, but you can't even express yourself well or engage in a simple conversation.</p>
                        
                        <p>It seems evident to me that <strong>there is something wrong with the way foreign languages are taught in academic institutions</strong> around the world. Aprelendo is my small contribution to change that situation. Also, it allowed me to combine two of my biggest passions: computer science and languages.</p>
                    </section>
                </div>
                <div class="col-sm-3 d-none d-sm-block">
                    <figure>
                        <img class="rounded-circle" src="img/avatar_pablo.jpg" alt="Pablo Castagnino - Photo">
                    </figure>
                </div>
            </div>

            <!-- ABOUT APRELENDO -->
            <br>
            <div class="row vertical-align-center">
                <div class="col-sm-9">
                    <section>
                        <h4>Immersion</h4>
                        <p>Evidence shows that <strong>the best way to learn a language is through immersion</strong>. That's how we all learned to speak our native language. Also, people who become really fluent in a second language tend to use it at home in some way or another and have the help of a "caring and interested tutor" (either their parents or soulmate).</p>

                        <p><strong>Yet, immersion can be quite difficult to achieve when studying a second language</strong>, as only a few have a "caring language tutor" at home, and it is even more difficult to find one in a work or day-to-day environment. It may even be materially impossible since your colleagues or friends may not understand that language or will not have the patience to deal with you, especially if you do not share a similar level of proficiency. Living in another country could help, but it's definitely not enough. Not to mention that only a few have the opportunity to live abroad.</p>

                        <br>
                        <h4>About Aprelendo</h4>
                        <p>In a context in which the Internet has become a tool for bringing people together and disseminating information, <strong>online learning</strong> has become increasingly popular. Some language learning services allow you to contact native speakers and chat with them at your best convenience. Other focus almost entirely on vocabulary acquisition, by using flashcards or other similar methods, like gamification.</p>

                        <p>Aprelendo, on the other hand, is based on the idea that <strong>learning a new language by reading texts you like is easier, more engaging and more effective than reviewing stand-alone flashcards</strong>, as most language learning services seem to do these days. Instead, <strong>we developed a method called <a href="totalreading.php">total reading</a></strong>, which enables students to develop not only their reading comprehension -as the name might imply-, but all their comprehension (reading & listening) and communication (writing & speaking) skills in a second language.</p>
                        
                        <p>One word of caution: learning a new language is like running a marathon, not a sprint. It takes a lot of time, perseverance and effort. This will not change by using Aprelendo. Think of <a href="totalreading.php">total reading</a> only as a complement to other methods you may choose in your learning experience. In this regard, it is advisable that you alternate your Aprelendo sessions with grammar lessons or other approaches that let you better understand the intricacies of your target language. Apart from that, while <a href="totalreading.php">total reading</a> can be beneficial to all, it yields better results for those who already have an initial knowledge of the language and want to improve or get out of the "learning plateau" that often afflicts intermediate or advanced students.</p>
                        
                        <p>In sum, <strong>Aprelendo was designed to allow you to learn new languages from the comfort of your home and adapting to your schedules and interests</strong> with the added benefit of improving all your levels of comprehension and communication in each session. As long as you can read at least 1 article per day using Aprelendo, we are sure you will notice the results within a few weeks. Just try it and <a href="https://www.facebook.com/aprelendo" target="_blank" rel="noopener noreferrer">let us know</a> what you think.</p>
                    </section>
                </div>
                <div class="col-sm-3 d-none d-sm-block">
                    <figure>
                        <img class="img-fluid" src="img/logo.svg" alt="Aprelendo logo">
                    </figure>
                </div>
            </div>
        </div>
    </main>
</div>
<!--/container -->

<?php require_once 'footer.php';?>