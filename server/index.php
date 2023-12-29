<?php

$dir = './db/';
// $files = glob($dir);

$path = $dir . 'index.list';

$handle = fopen($path, "r");
$content = fread($handle, filesize($path));
fclose($handle);

$pllist = explode($content, "\n");
?>


<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-V0.9.4.min.css">

    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/style.css">
    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/outlined.icon.fonts.google.css">
    <!-- Copyright Google - All right reserved -->
    <!-- <script type="text/javascript" src="_lib/script.js?v=321"></script> -->


    <title>Accueil || Lecteur MiYT</title>
    <link rel="icon" href="https://miala-python.github.io/yt/icon.png" type="image/png">

    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
</head>

<body>
    <h4>Ce site est prévu pour un usage privé et educatif uniquement. Si le développeur ne vous a donné l'autorisation
        de le consulter, veuillez le
        quitter immediatement.</h4>
    <div class="content">
        <div class="block">

            <div class="box">
                <h1>Miala Playlist Randomer</h1>
                <h2>Dernières playlist jouées: </h2>
                <ul>
                    <?php
                    $i = 0;
                    foreach ($pllist as $pl) {
                        if ($i%2 === 1){
                        echo '<li><a href="load.php?list=' . $pl . '">' . $pllist[$i-1] . '</a></li>';
                        }
                        $i += 1;
                    }
                    ?>
                </ul>
            </div>
        </div>
    </div>
    <iframe width="100%" height="auto" src="https://miala-python.github.io/yt/"></iframe>

</body>

</html>