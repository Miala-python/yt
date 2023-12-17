var videos = [],
    infini_detect = 0;

function scrollPage() {
    body = document.getElementById("contents"), window.scrollTo(0, body.scrollHeight)
}

function extractVideos() {
    for (var t = document.querySelectorAll("#video-title"), n = 0; n < t.length; n++) try {
        var e = t[n].href.split("=")[1];
        videos.includes(e) || (videos.push(e), infini_detect = 0)
    } catch (e) {
        console.log("VIDEO IGNOREE: "), console.log(t[n])
    }
}

function end_scan() {
    var e = document.createElement("form");
    e.setAttribute("method", "post"), e.setAttribute("action", "http://miala.000webhostapp.com/YT/custom.php");
    var t = document.createElement("input");
    t.setAttribute("type", "hidden"), t.setAttribute("name", "videos"), t.setAttribute("value", videos.join(">>")), e.appendChild(t);
    var n = prompt("Le scan et fini. Il vous suffit de rentrer un nom, d`appuyer sur envoyer et de démarrer la lecture ;)", "Une playlist."),
        t = document.createElement("input");
    t.setAttribute("type", "hidden"), t.setAttribute("name", "pl_name"), t.setAttribute("value", n), e.appendChild(t);
    n = document.createElement("input");
    n.setAttribute("type", "hidden"), n.setAttribute("name", "version"), n.setAttribute("value", "V2"), e.appendChild(n);
    t = document.createElement("input");
    t.setAttribute("type", "hidden"), t.setAttribute("name", "id");
    const i = new URL(window.location.href);
    n = i.searchParams.get("list");
    t.setAttribute("value", n), e.appendChild(t), document.body.appendChild(e), e.submit()
}

function scan_vids() {
    document.title = infini_detect + ";" + videos.length + "] Scan en cours... | MialaMusic", infini_detect += 4, extractVideos(), scrollPage(), null !== document.querySelector(".circle .style-scope .tp-yt-paper-spinner") ? setTimeout(scan_vids, 1e3) : infini_detect < 100 ? setTimeout(scan_vids, 500) : end_scan()
}
var scan_buttons = document.getElementsByClassName("yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading");
Array.from(scan_buttons).forEach(e => {
    e.removeAttribute("href"), e.innerHTML = "Scanner la playlist", e.onclick = function() {
        e.setAttribute("disabled", ""), scan_vids()
    }
});
