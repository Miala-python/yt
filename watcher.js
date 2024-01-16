console.log('watcher.js >> V2.02.24');

// File: Create Watcher Page

function monNouveauCode () {
    console.log('Mimiala');
}

var htmlElement = document.querySelector('html');
htmlElement.removeAttribute('style');
htmlElement.setAttribute('class', 'has-background-dark has-text-danger-light');

window.stop();

const head = document.querySelector('head');
head.innerHTML = `
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-V0.9.4.min.css">
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-switch.min.css">

<title>Chargement en cours... | MialaMusic</title>
<link rel="icon" href="https://miala-python.github.io/yt/icon.png" type="image/png">
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/style.css">
<link rel="stylesheet" href="https://miala-python.github.io/yt/lib/outlined.icon.fonts.google.css"> <!-- Copyright Google - All right reserved -->`

const body = document.querySelector('body');

var scr_list = [
    // "https://www.youtube.com/s/player/d23221b6/www-widgetapi.vflset/www-widgetapi.js",
    "https://www.youtube.com/iframe_api",
    // "https://miala-python.github.io/yt/iframe_api.js",
    "https://miala-python.github.io/yt/lib/saver.js?ver=" +  Math.random(), //MàJ auto
    "https://miala-python.github.io/yt/lib/jquery.js",
    "https://miala-python.github.io/yt/lib/pubblock.js"
    // "https://cdnjs.cloudflare.com/ajax/libs/fetch/2.6.0/fetch.min.js"
];

scr_list.forEach(element => {
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.src = element;
    body.appendChild(js);
});


body.innerHTML = 
`
<div id='inProgress' class='block'>
<div class='content'>
    <progress id="loading_progress" class="progress is-large is-link" value="50" max="100">Attente de votre réponse...</progress><br><br>
    <h1>Veuillez répondre à la question: OK = Oui , Annuler = Non</h1><br>
    
    <p class="image is-128x128 is-centered">
        <img class="is-rounded" src="https://miala-python.github.io/yt/icon.png" alt="Lecteur MiYT">
    </p><br><br>
</div></div>
`
+ body.innerHTML +
`

<div class="block">
<div class="tags are-medium">
<span class="tag is-primary is-light"><a href="https://miala.000webhostapp.com/YT/">Lecteur MiYT</a></span>
<span class="tag is-light is-danger"><a id="pllink" href="#">Playlist</a></span>
<span class="tag is-light is-danger"><a href="https://www.youtube.com/?Mi=Music">YouTube</a></span>
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
    <!--
    <button id="PiP_btn" class="button is-info is-light" onclick="if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture();
      }">
        PiP</button> -->
</div>
<div class="field">
    <label for="PauseForbidSw">Lecture automatique (pause interdite): Au début uniquement</label>
    <input id="PauseForbidSw" type="checkbox" name="PauseForbidSw" class="switch is-danger">
    <label for="PauseForbidSw"Pendant toute la video</label>
</div>
<br>

<div class="buttons">
    <button id="reset_btn" class="button is-warning is-light">
        <span class="material-symbols-outlined gfonticon_button icon is-small">
            restart_alt
        </span>
    </button>
</div>
<br>
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