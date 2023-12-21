console.log('YT.js >> V2.00.08');

// 1. Créez un objet de lecteur IFrame
var player = 'none';

var id = 0;
var my_playlist = document.getElementById('my_playlist').innerText.split('&list;');

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

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: my_playlist[0],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
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
    if (YT.loaded === 1) {
        console.log('YTiframe API ready !');
        onYouTubeIframeAPIReady();
    } else {
        console.log('Wait for YTiframe API...');
      // Appel récursif avec un délai d'attente de 1 seconde
      setTimeout(function() {
        waitLoad();
      }, 1000);
    }
  }
  
waitLoad()