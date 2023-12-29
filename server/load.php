<?php

session_start();


if (empty($_GET['list'])):

    header('Location: ./index.php?loaderr=nolist');
else:

    $listID = $_GET['list'];
    $path = './db/' . $listID . '.mimuspl';

    if (!file_exists($path)):
        header('Location: ./index.php?loaderr=nofile');
    else:


        $handle = fopen($path, "r");
        $content = fread($handle, filesize($path));
        fclose($handle);

        $my_playlist = $content;


        ?>

        <html>

        <head>
        </head>

        <body>
            <script type="text/javascript" id="WatcherMi" src="https://miala-python.github.io/yt/watcher.js" />
        </body>
        <p class="is-hidden" id="my_playlist">
            <?php echo $my_playlist; ?>
        </p>
        <?php
        if (!empty($_GET['title'])){
            echo '
            <p class="is-hidden" id="pl_name">
                '.$_GET['title'].'
            </p>';
        }
        
        ?>

        </html>

        <?php



    endif;
endif;