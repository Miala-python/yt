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

    const body = document.querySelector('body');
    body += `
            <script type="text/javascript" id="www-widgetapi-script" src="https://www.youtube.com/s/player/d23221b6/www-widgetapi.vflset/www-widgetapi.js" async=""></script><script src="https://www.youtube.com/iframe_api"></script>
            <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/bulma-V0.9.4.min.css">

            <script src="https://miala-python.github.io/yt/lib/pubblock.js"></script>
            <script src="https://miala-python.github.io/yt/lib/jquery.js"></script>
            <title>Echoes of Solitude | MialaMusic</title>
            <link rel="icon" href="https://miala-python.github.io/yt/icon.png" type="image/png">
            <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/style.css">
            <link rel="stylesheet" href="https://miala-python.github.io/yt/lib/outlined.icon.fonts.google.css"> <!-- Copyright Google - All right reserved -->

            <div class="block">
                <span class="tag is-link is-light is-medium"><a href="index.php">Accueil</a></span>
                <br><br>
                <iframe id="player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Echoes of Solitude" width="640" height="360" src="https://www.youtube.com/embed/kgBPOPOpUWg?enablejsapi=1&amp;origin=https%3A%2F%2Fmiala.000webhostapp.com&amp;widgetid=1"></iframe><br>
                <span id="infos_vid" class="tag is-light">Echoes of Solitude (ID: kgBPOPOpUWg #0) - MialaMusic</span><br><br>
                <script>
                    // 1. Créez un objet de lecteur IFrame
                    var player = 'none';

                    var id = 0;
                    var my_playlist = ["` + videos.join('", "') + `"];

                    function onPlayerReady(event) {
                        event.target.playVideo();
                        player.playVideo();

                    }

                    function changeVideo(vid_id) {
                        player.pauseVideo();
                        player.loadVideoById(vid_id);
                        player.playVideo();
                        document.title = 'MialaMusic Playlist Randomer';
                        document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - MialaMusic Playlist Randomer';
                        window.history.pushState(null, '', '/YT/watch.php?idx=' + id);
                    }

                    function prev() {
                        id -= 1;
                        if (id < 0) {
                            alert("Début de la playlist.");
                            id = 0;
                        }
                        changeVideo(my_playlist[id]);
                    }

                    function next() {
                        id += 1;
                        if (id >= my_playlist.length) {
                            window.location.href = "end.php?v=js";
                        }else{
                            changeVideo(my_playlist[id]);
                        }
                    }



                    // 2. Écoutez l'événement onStateChange
                    function onPlayerStateChange(event) {
                        if (event.data == YT.PlayerState.ENDED) {
                            next();
                        } else {
                            clear_pubs();
                        }
                    }

                    function pageUpdate() {
                        //-1: Non initialisé
                        // 0: Terminé
                        // 1: En lecture
                        // 2: En pause
                        // 3: En file d’attente
                        // 5: Vidéo en file d’attente interrompue

                        var duration = player.getDuration();
                        var currentTime = player.getCurrentTime();
                        var currentState = player.getPlayerState();

                        console.log('Page update: ' + currentTime + '/' + duration + ' => ' + currentState);
                        
                        var video_title = player.getVideoData().title;

                        if (currentTime < 10) {
                            if (video_title != '') {
                                document.title = video_title + ' | MialaMusic';
                                document.getElementById('infos_vid').innerText = video_title + ' (ID: ' + player.getVideoData().video_id + ' #' + id + ') - MialaMusic';
                            }
                        }

                        if (currentState === 0) {
                            next();
                        } else if (currentState === 1 && duration > 30) {
                            if (currentTime > (duration - 2)) {
                                next();
                            }
                        } else if (currentTime < 2) {

                            console.log('Try play');
                            player.playVideo();


                            currentState = player.getPlayerState();

                            if (currentState !== 1) {
                                console.log('Clicked');

                                // console.log(currentState === -1 && video_title == '');
                                if (currentState === -1 && video_title == '') {
                                    console.log('Video Indispo, next');
                                    next();
                                }

                                // console.log(document.getElementsByClassName('ytp-button')[0]);
                                document.getElementsByClassName('ytp-button')[0].click();
                                // document.getElementsByClassName('ytp-play-button')[0].click();
                            }


                        }
                    }

                    function onYouTubeIframeAPIReady() {
                        player = new YT.Player('player', {
                            videoId: 'kgBPOPOpUWg',
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange
                            }
                        });

                        setInterval(pageUpdate, 5000);

                    }

                    // window.addEventListener('load', function () {
                    //     if (player == 'none') {
                    //         onYouTubeIframeAPIReady();
                    //     }
                    //     $host_msg = document.querySelector('[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]')
                    //     if ($host_msg != null) {
                    //         $host_msg.parentNode.removeChild($host_msg);
                    //     }
                    // });




                </script><br>
                <div class="buttons">
                    <button onclick="prev();" class="button is-danger is-light">
                        <span class="material-symbols-outlined gfonticon_button icon is-small">
                            skip_previous
                        </span>
                    </button>
                    <button onclick="next();" class="button is-success is-light">
                        <span class="material-symbols-outlined gfonticon_button icon is-small">
                            skip_next
                        </span></button>
                </div><br>
            </div>
`
    
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
    document.title = infini_detect + "%: n°" + videos.length + "] Scan en cours... | MialaMusic", infini_detect += 4, extractVideos(), scrollPage(), null !== document.querySelector(".circle .style-scope .tp-yt-paper-spinner") ? setTimeout(scan_vids, 1e3) : infini_detect < 100 ? setTimeout(scan_vids, 500) : end_scan()
}
var scan_buttons = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading");
Array.from(scan_buttons).forEach(e => {
    e.removeAttribute("href"), e.innerHTML = "Scanner la playlist", e.onclick = function() {
        e.setAttribute("disabled", ""), scan_vids()
    }
});







