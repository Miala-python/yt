console.log('iframe_api.js');
var scriptUrl = 'https:\/\/www.youtube.com\/s\/player\/d23221b6\/www-widgetapi.vflset\/www-widgetapi.js';
try {
    var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", { createScriptURL: function (x) { return x } });
    scriptUrl = ttPolicy.createScriptURL(scriptUrl)
} catch (e) {}
var YT; // = none
if (!window["YT"]) YT = { loading: 0, loaded: 0 };
var YTConfig; // = none
if (!window["YTConfig"]) YTConfig = { "host": "https://www.youtube.com" };
if (!YT.loading) {
    // console.log('¤C2');
    YT.loading = 1;
    (
        function () {
            var l = [];
            YT.ready = function (f) {
                if (YT.loaded) f();
                else l.push(f)
            };
            window.onYTReady = function () {
                YT.loaded = 1;
                var i = 0;
                for (; i < l.length; i++)try { l[i]() } catch (e) { };

                // console.log('¤C5');
            };
            YT.setConfig = function (c) {
                var k;
                for (k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k]
            };
            // console.log('¤C6');
            var a = document.createElement("script"); a.type = "text/javascript"; a.id = "www-widgetapi-script";
            a.src = scriptUrl; a.async = true; var c = document.currentScript;
            if (c) {
                var n = c.nonce || c.getAttribute("nonce"); if (n) a.setAttribute("nonce",
                    n);

                // console.log('¤C7');
            }
            var b = document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b)
        }
    )()
    // console.log('¤C8');
};
// console.log('¤C9');