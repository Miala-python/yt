console.log('watcher.js >> V2.01.00');

// File: Create Watcher Page


var htmlElement = document.querySelector('html');
htmlElement.removeAttribute('style');

window.stop();

const head = document.querySelector('head');
head.innerHTML = `
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-V0.9.4.min.css">

<title>Chargement en cours... | MialaMusic</title>
<link rel="icon" href="https://miala-python.github.io/yt/icon.png" type="image/png">
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/style.css">
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/outlined.icon.fonts.google.css"> <!-- Copyright Google - All right reserved -->`

const body = document.querySelector('body');

var scr_list = [
    // "https://www.youtube.com/s/player/d23221b6/www-widgetapi.vflset/www-widgetapi.js",
    "https://www.youtube.com/iframe_api",
    // "https://miala-python.github.io/yt/iframe_api.js",
    "https://miala-python.github.io/yt/lib/jquery.js",
    "https://miala-python.github.io/yt/lib/pubblock.js"
];

scr_list.forEach(element => {
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.src = element;
    body.appendChild(js);
});


body.innerHTML += `

<div class="block">
<div class="tags are-medium">
<span class="tag is-primary is-light"><a href="index.php">MialaMusic</a></span>
<span class="tag is-link is-danger"><a href="#" onclick="location.reload()">Playlist</a></span>
<span class="tag is-link is-danger"><a href="https://www.youtube.com/?Mi=Music">YouTube</a></span>
</div>
<br><br>
<div id="player"></div>
<br>
<span id="infos_vid" class="tag is-light">Chargement en cours... - MialaMusic</span><br><br>
<br>
<div class="buttons">
    <button id="prev_btn" class="button is-danger is-light">
        <span class="material-symbols-outlined gfonticon_button icon is-small">
            skip_previous
        </span>
    </button>
    <button id="next_btn" class="button is-success is-light">
        <span class="material-symbols-outlined gfonticon_button icon is-small">
            skip_next
        </span></button>
</div><br>
</div>
`;

var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://miala-python.github.io/yt/YT.js";
js.onreadystatechange = monNouveauCode;
js.onload = monNouveauCode;
js.id = "PlayMI";
//Ajout de la balise dans la page
document.body.appendChild(js);