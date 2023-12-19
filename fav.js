console.log('fav.js >> V2.00.10');

var videos = [],
    infini_detect = 0;

function scrollPage() {
    body = document.getElementById("contents"), window.scrollTo(0, body.scrollHeight)
}

function extractVideos() {
    let sugg = document.querySelectorAll('[is-playlist-shelf]');
    if (sugg[0]) {
        sugg[0].remove();
    }
    for (var t = document.querySelectorAll("#video-title"), n = 0; n < t.length; n++) try {
        var e = t[n].href.split("=")[1];
        videos.includes(e) || (videos.push(e), infini_detect = 0)
    } catch (e) {
        console.log("VIDEO IGNOREE: "), console.log(t[n])
    }
}

function end_scan() {
    // Sélectionnez tous les éléments du body sauf celui avec l'id "Miala"
    const elements = document.querySelectorAll('body > :not(#PlayMI)');

    // Parcourez tous les éléments sélectionnés et supprimez-les
    elements.forEach(element => {
        element.remove();
    });

    var htmlElement = document.querySelector('html');
    htmlElement.removeAttribute('style');

    window.stop();

    const head = document.querySelector('head');
    head.innerHTML = `
    <script type="text/javascript" id="www-widgetapi-script" src="https://www.youtube.com/s/player/d23221b6/www-widgetapi.vflset/www-widgetapi.js" async=""></script>
    <script type="text/javascript" id="iframe-api-scr" src="https://miala-python.github.io/yt/iframe_api.js"></script>

    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-V0.9.4.min.css">

    <script src="https://miala-python.github.io/yt/lib/pubblock.js"></script>
    <script src="https://miala-python.github.io/yt/lib/jquery.js"></script>
    <title>Echoes of Solitude | MialaMusic</title>
    <link rel="icon" href="https://miala-python.github.io/yt/icon.png" type="image/png">
    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/style.css">
    <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/outlined.icon.fonts.google.css"> <!-- Copyright Google - All right reserved -->`

    const body = document.querySelector('body');
    body.innerHTML += `

    <div class="block">
        <span class="tag is-link is-light is-medium"><a href="index.php">Accueil</a></span>
        <br><br>
        <iframe id="player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Echoes of Solitude" width="640" height="360" src="https://www.youtube.com/embed/kgBPOPOpUWg?enablejsapi=1&amp;origin=https%3A%2F%2Fmiala.000webhostapp.com&amp;widgetid=1"></iframe><br>
        <span id="infos_vid" class="tag is-light">Echoes of Solitude (ID: kgBPOPOpUWg #0) - MialaMusic</span><br><br>
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

    // var e = document.createElement("form");
    // e.setAttribute("method", "post"), e.setAttribute("action", "http://miala.000webhostapp.com/YT/custom.php");
    // var t = document.createElement("input");
    // t.setAttribute("type", "hidden"), t.setAttribute("name", "videos"), t.setAttribute("value", videos.join(">>")), e.appendChild(t);
    // var n = prompt("Le scan et fini. Il vous suffit de rentrer un nom, d`appuyer sur envoyer et de démarrer la lecture ;)", "Une playlist."),
    //     t = document.createElement("input");
    // t.setAttribute("type", "hidden"), t.setAttribute("name", "pl_name"), t.setAttribute("value", n), e.appendChild(t);
    // n = document.createElement("input");
    // n.setAttribute("type", "hidden"), n.setAttribute("name", "version"), n.setAttribute("value", "V2"), e.appendChild(n);
    // t = document.createElement("input");
    // t.setAttribute("type", "hidden"), t.setAttribute("name", "id");
    // const i = new URL(window.location.href);
    // n = i.searchParams.get("list");
    // t.setAttribute("value", n), e.appendChild(t), document.body.appendChild(e), e.submit()
}

function scan_vids() {
    document.title = infini_detect + "%: n°" + videos.length + "] Scan en cours... | MialaMusic";
    infini_detect += 3, extractVideos(), scrollPage();
    null !== document.querySelector(".circle .style-scope .tp-yt-paper-spinner") ? setTimeout(scan_vids, 1e3) : infini_detect < 100 ? setTimeout(scan_vids, 300) : end_scan()
}
var scan_buttons = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading");
Array.from(scan_buttons).forEach(e => {
    e.removeAttribute("href"), e.innerHTML = "Scanner la playlist", e.onclick = function () {
        e.setAttribute("disabled", ""), scan_vids()
    }
});







