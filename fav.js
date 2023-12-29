console.log('fav.js >> V2.02.07');

function run() {


    var videos = [],
        infini_detect = 0;

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
                if (element.textContent.indexOf('Playlists recommandées') !== -1) {
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

    function end_scan() {
        // Sélectionnez tous les éléments du body sauf celui avec l'id "Miala"
        const elements = document.querySelectorAll('body > :not(#PlayMI)');

        // Parcourez tous les éléments sélectionnés et supprimez-les
        elements.forEach(element => {
            element.remove();
        });

        var mpl = document.createElement("p");
        mpl.setAttribute("class", "is-hidden");
        mpl.setAttribute("id", "my_playlist");
        mpl.innerHTML = videos.join(";").replace(/&list/gi, "");
        document.querySelector('html').appendChild(mpl);

        var WatcherMi = document.createElement("script");
        WatcherMi.type = "text/javascript";
        WatcherMi.src = "https://miala-python.github.io/yt/watcher.js";
        WatcherMi.onreadystatechange = monNouveauCode;
        WatcherMi.onload = monNouveauCode;
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

    function scan_vids() {
        document.title = infini_detect + "%: n°" + videos.length + "] Scan en cours... | MialaMusic";
        infini_detect += 3, extractVideos(), scrollPage();
        null !== document.querySelector(".circle .style-scope .tp-yt-paper-spinner") ? setTimeout(scan_vids, 1e3) : infini_detect < 100 ? setTimeout(scan_vids, 300) : end_scan()
    }
    var scan_buttons = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading");
    Array.from(scan_buttons).forEach(e => {
        e.removeAttribute("href"), e.innerHTML = "Scanner la playlist", e.onclick = function () {
            e.setAttribute("disabled", "");
            e.innerHTML = "Scan en cours...";
            scan_vids();
        }
    });

}



var reponse = confirm("Avez-vous actualisé avant de lancer le script ?");

if (reponse) {
    var pln = document.createElement("p");
        pln.setAttribute("class", "is-hidden");
        pln.setAttribute("id", "pl_name");
        pln.innerText = document.querySelector("title").innerHTML;
        document.querySelector('html').appendChild(pln);
    run();
} else {
    alert("Après l'actualisation, veuillez relancer le script.");
    location.reload();
}



