console.log('fav.js >> V2.02.08');

/*

function une() {}

function deux() {
    function trois() {
        une();
    }

    trois();
}

deux();

*/

function srcLoaded() {
    console.log('Une ressource à été chargée...');
}


var videos = [];
var infini_detect = 0;
var play_buttons = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading");


function end_scan() {
    // Sélectionnez tous les éléments du body sauf celui avec l'id "Miala"
    const elements = document.querySelectorAll('body > :not(#PlayMI)');

    // Parcourez tous les éléments sélectionnés et supprimez-les
    elements.forEach(element => {
        element.remove();
    });

    //Sauvegarde de la playlist à travers un élement de la page
    var mpl = document.createElement("p");
    mpl.setAttribute("class", "is-hidden");
    mpl.setAttribute("id", "my_playlist");
    mpl.innerHTML = videos.join(";").replace(/&list/gi, "");
    document.querySelector('html').appendChild(mpl);

    // Chargement de la ressource watcher.js
    var WatcherMi = document.createElement("script");
    WatcherMi.type = "text/javascript";
    WatcherMi.src = "https://miala-python.github.io/yt/watcher.js";
    WatcherMi.onreadystatechange = srcLoaded;
    WatcherMi.onload = srcLoaded;
    WatcherMi.id = "WatcherMi";
    //Ajout de la balise dans la page
    document.body.appendChild(WatcherMi);

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



function scrollPage() {
    body = document.getElementById("contents"), window.scrollTo(0, body.scrollHeight)
}

function delRecomVids() {
    // sugg = document.querySelectorAll('[is-playlist-shelf]');
    // console.log('Search Recom... ');
    // console.log(sugg);
    // if (sugg[0]) {
    //     sugg.forEach(element => {
    //         element.remove();
    //         console.log('Recom removed.');
    //     });
    // }

    // Sélectionnez le span avec le texte "Playlists recommandées"
    var spanElements = document.getElementsByTagName('span');

    if (spanElements[0]) {
        for (var i = 0; i < spanElements.length; i++) {
            element = spanElements[i];
            if (element.textContent.indexOf('Playlists recommandées') !== -1 || element.textContent.indexOf('Vidéos recommandées') !== -1) {
                // Accédez à son parent
                var parentElement = element.parentNode;
                for (let parent_lvl = 0; parent_lvl < 4; parent_lvl++) {
                    parentElement = parentElement.parentNode;
                }
                parentElement.remove();
                console.log('Recom removed.');
            }
        };
    }
}

function extractVideos() {
    delRecomVids();
    var ttes_vids = document.querySelectorAll("#video-title");
    for (ttes_vids, n = 0; n < ttes_vids.length; n++)
        try {
            var e = ttes_vids[n].href.split("=")[1];
            videos.includes(e) || (videos.push(e), infini_detect = 0);
        } catch (e) {
            console.log("VIDEO IGNOREE: "), console.log(ttes_vids[n])
        }
}



function scan_vids() {
    document.title = infini_detect + "%: n°" + videos.length + "] Scan en cours... | MialaMusic";
    infini_detect += 3, extractVideos(), scrollPage();
    null !== document.querySelector(".circle .style-scope .tp-yt-paper-spinner") ? setTimeout(scan_vids, 1e3) : infini_detect < 100 ? setTimeout(scan_vids, 300) : end_scan()
}

function run() {
    Array.from(play_buttons).forEach(e => {
        e.removeAttribute("href"), e.innerHTML = "Scanner la playlist";
        e.setAttribute("style", `        
            color: #000000;
            background-color: rgb(0 199 50);`
        );
        e.onclick = function () {
            e.setAttribute("disabled", "");
            e.innerHTML = "Scan en cours...";
            scan_vids();
        }
    });

}


var url = new URL(window.location.href);
var searchParams = new URLSearchParams(url.search);
let TopBar = document.querySelectorAll('div#container.style-scope.ytd-masthead');

if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
    var v = searchParams.get("v");
    videos = [v];
    end_scan();
} else {
    var reponse = confirm("Avez-vous actualisé la page avant de lancer le script ? \n(OK = Oui ; Annuler = Non)");

    if (reponse) {
        var pln = document.createElement("p");
        pln.setAttribute("class", "is-hidden");
        pln.setAttribute("id", "pl_name");
        pln.innerText = document.querySelector("title").innerHTML;
        document.querySelector('html').appendChild(pln);
        run();

        TopBar.innerHTML = `
            Appuyez sur 
            <button onclick="
                Array.from(play_buttons).forEach(e => {
                    e.setAttribute("disabled", "");
                    e.innerHTML = "Scan en cours...";
                });
                scan_vids();">
                ce bouton 
            </button>
            pour lancer le scan.
        `;
        TopBar.setAttribute("style", `
        font-size: x-large
        `
        );
    } else {
        alert("Après l'actualisation, veuillez relancer le script puis répondre oui.");
        location.reload();
    }

}

