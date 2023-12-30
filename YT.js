console.log('YT.js >> V2.02.11');

function sendToServer(playlist_txt, listID, nb) {



    // Créez un formulaire dynamiquement
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://miala.000webhostapp.com/YT/add.php';

    // Ajoutez les champs et leurs valeurs
    var champ1 = document.createElement('input');
    champ1.type = 'hidden';
    champ1.name = 'playlist';
    champ1.value = playlist_txt;
    form.appendChild(champ1);

    var champ2 = document.createElement('input');
    champ2.type = 'hidden';
    champ2.name = 'nb';
    champ2.value = nb;
    form.appendChild(champ2);

    var champ3 = document.createElement('input');
    champ3.type = 'hidden';
    champ3.name = 'listID';
    champ3.value = listID;
    form.appendChild(champ3);

    try {
        pl_name = document.getElementById("pl_name").innerText
        if (pl_name != "") {

            var champ4 = document.createElement('input');
            champ4.type = 'hidden';
            champ4.name = 'name';
            champ4.value = pl_name;
            form.appendChild(champ4);
        }

    } catch (error) {

    }

    // Soumettez le formulaire dans le popup
    var popup = window.open('', 'Lecteur MiYT | Connexion au serveur...', 'width=7,height=7');
    form.target = 'Lecteur MiYT | Connexion au serveur...';
    popup.document.body.appendChild(form);
    form.submit();

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://miala.000webhostapp.com/YT/add.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // const data = `playlist=${playlist_txt}&nb=${nb}&listID=${listID}&name=${document.querySelector("title").innerHTML}`;
    // xhr.send(data);

    // xhr.onload = function () {
    //     if (xhr.status === 200) {
    //         console.log(xhr.responseText);
    //     } else {
    //         console.error('Error:', xhr.statusText);
    //     }
    // };

    // xhr.onerror = function () {
    //     console.error('Network error');
    // };

}

function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}

// 1. Créez un objet de lecteur IFrame
var player = 'none';

var id = 0;

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var params = new URLSearchParams(url.search);
var listValue = params.get("list");

var my_playlist_txt = document.getElementById('my_playlist').innerHTML.trim();
var my_playlist = my_playlist_txt.split(';');

var list_length = my_playlist.length;
if (list_length > 1) {

    var reponse = confirm("Lecture de la playlist en mode aléatoire ?");

    if (reponse) {
        shuffleArray(my_playlist);
    }

    sendToServer(my_playlist_txt, listValue, list_length);
    try {
        document.getElementById('pllink').setAttribute("href", "https://www.youtube.com/playlist?list=" + listValue);
    } catch (error) {}
}

function onPlayerReady(event) {
    console.log(event, ': Player Ready => ', player);
    event.target.playVideo();
    player.playVideo();
}

function changeVideo(vid_id) {
    player.pauseVideo();
    player.loadVideoById(vid_id);
    player.playVideo();
    document.title = 'MialaMusic Playlist Randomer';
    document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - MialaMusic Playlist Randomer';
    // window.history.pushState(null, '', '/YT/watch.php?idx=' + id);
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
        // window.location.href = "end.php?v=js";
        window.stop();
        alert("Fin de la playlist.");
        window.location.href = "https://miala.000webhostapp.com/YT?todo=end&list=" + listValue;
    } else {
        changeVideo(my_playlist[id]);
    }
}

document.getElementById('prev_btn').onclick = function () { prev() };
document.getElementById('next_btn').onclick = function () { next() };


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
// <iframe id="player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Chargement en cours..." width="640" height="360" 
// src=https://www.youtube.com/embed/IkMx-PY6XZY?enablejsapi=1&amp;origin=https%3A%2F%2Fmiala.000webhostapp.com&amp;widgetid=1"></iframe>

function onERR() {
    if (currentState === -1 && video_title != '') {
        console.log('Video ERR, next');
        next();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: my_playlist[0],
        playerVars: { 'autoplay': 1, 'picture-in-picture': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onERR
        }
    });

    console.log(player);

    setInterval(pageUpdate, 5000);

}

// $host_msg = document.querySelector('[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]')
// if ($host_msg != null) {
//     $host_msg.parentNode.removeChild($host_msg);
// }

function waitLoad() {
    if (player != 'none') {
        return 'Player already created';
    }
    try {

        if (YT.loaded === 1) {
            console.log('YTiframe API ready !');
            onYouTubeIframeAPIReady();
            return 'Player created';
        } else {
            console.log('Wait for YTiframe API...');
            // Appel récursif avec un délai d'attente de 1 seconde
            setTimeout(function () {
                waitLoad();
            }, 1000);
        }

    } catch (error) {
        console.log('Wait for iframe_api.js run...');
        setTimeout(function () {
            waitLoad();
        }, 2000);
    }
}

console.log(waitLoad());