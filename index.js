        const remote = require("electron").remote;
        var isInYoutubeDiv = false;
        $(document).ready(function () {
            var ul = document.getElementById('videosToPlayList');
            $(ul).click(function (el) {
                var url = "https://www.youtube.com/watch?v=" + el.target.videoId;
                goToVideoClicked(url);
            });
            $('#youtubeDiv').mouseenter(function(){isInYoutubeDiv=true;});
            $('#youtubeDiv').mouseleave(function(){isInYoutubeDiv=false;});
        });

        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "Escape":
                    remote.getCurrentWindow().close();
                    break;
            }
        });

        function offset(el) {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        function MouseHandlerEnter() {
             var appIcon = document.getElementById('appIconId');
             var moveIcon = document.getElementById('moveIconId');
             appIcon.style.opacity = 1;
             moveIcon.style.opacity = 1;
            // var windowX = (window.screenX < 0) ? window.screen.width + window.screenX : window.screenX;
            // var windowXCenter = windowX + (window.innerWidth / 2);
            // var windowYCenter = window.screenTop + (window.innerHeight / 2);

            // var screenWidth = window.screen.width;
            // var screenHeight = window.screen.height;

            // if(windowXCenter > screenWidth / 2)
            // {
            //     //right
            //     console.log("right");
            //     window.moveTo(window.screenX - (window.innerWidth / 2), window.screenY);
            //      var x = ((window.screenX + window.innerWidth /2) - 10);//offset(youtubeDiv).left + (youtubeDiv.offsetWidth- appIcon.clientWidth / 2); 
            //      var el = document.getElementById('appIconId'); 
            //      el.style.position = "absolute"; 
            //      el.style.left = x + 'px'; 
            // }
            // else
            // {
            //     //left
            //     console.log("left");
            //     // var x = 10; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.left = x + 'px'; 
            // }

            // if(windowYCenter > screenHeight / 2)
            // {
            //     //bottom
            //     console.log("bottom");
            //     // var y = 500;//(offset(youtubeDiv).top + youtubeDiv. clientHeight) - (appIcon.clientHeight / 2);; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.top = y + 'px'; 
            // }
            // else
            // {
            //     //top
            //     console.log("top");
            //     // var y = 10; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.top = y + 'px'; 
            // }

             var youtubeDiv = document.getElementById('youtubeDiv');
             youtubeDiv.style.display = "inline-block";

        }

        function MouseHandlerLeave() {
            var youtubeDiv = document.getElementById('youtubeDiv');
            youtubeDiv.style.display = "none";

            var appIcon = document.getElementById('appIconId');
            var moveIcon = document.getElementById('moveIconId');
            appIcon.style.opacity = 0.2;
            moveIcon.style.opacity = 0.2;

            // var appIconX = offset(appIcon).left;
            // var appIconY = offset(appIcon).top;
            // var screenW = window.outerWidth;
            // var screenH = window.outerHeight;

            // if(appIconX + appIcon.offsetWidth > screenW / 2)
            // {
            //     //right

            //     // var x = 748;//offset(youtubeDiv).left + (youtubeDiv.offsetWidth- appIcon.clientWidth / 2); 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.left = x + 'px'; 
            // }
            // else
            // {
            //     //left
            //     // var x = 10; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.left = x + 'px'; 
            // }

            // if(appIconY + appIcon.offsetHeight > screenH /2)
            // {
            //     //bottom
            //     // var y = 500;//(offset(youtubeDiv).top + youtubeDiv. clientHeight) - (appIcon.clientHeight / 2);; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.top = y + 'px'; 
            // }
            // else
            // {
            //     //top
            //     // var y = 10; 
            //     // var el = document.getElementById('appIconId'); 
            //     // el.style.position = "absolute"; 
            //     // el.style.top = y + 'px'; 
            // }
        }

        var currentVideoList = ["https://www.youtube.com/watch?v=0cJuSXHn3MU", "https://www.youtube.com/watch?v=NsB2eya4nFA"];
        var currentVidListTitles = [];
        var currentVidListCount = 0;
        var currentHTMLList = [{}];

        function getVideoTitle(vidId) {
            var xhttp = new XMLHttpRequest();
            currentHTMLList = (currentHTMLList == undefined || currentHTMLList == null) ? document.getElementById('videosToPlayList') : currentHTMLList;

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var videoData = JSON.parse(this.responseText);
                    currentVidListTitles.push(videoData.items[0].snippet.title);
                    var item = document.createElement('li');
                    var videoObj = videoData.items[0].snippet;
                    item.title = "Uploader: " + videoObj.channelTitle;
                    item.style = "padding-top: 5px;";
                    item.videoId = vidId;
                    item.id = "id_" + vidId;
                    var title = videoObj.title;
                    if (title.length > 60)
                        title = title.substring(0, 57);
                    title += "...";
                    item.appendChild(document.createTextNode(title));
                    currentHTMLList.appendChild(item);
                    $(item).hover(function () {
                        $(this).css("text-decoration", "underline");
                    }, function () {
                        $(this).css("text-decoration", "none");
                    });
                }
            };
            var APIKEY = "INEEDAKEY";
            xhttp.open("GET", `https://www.googleapis.com/youtube/v3/videos?key=${APIKEY}&part=snippet&id=` + vidId, true);
            xhttp.send();
        }

        function goToVideoClicked(url) {
            var index = currentVideoList.indexOf(url);
            if (index > -1) {
                currentVideoList.splice(index, 1);
                loadVid(url, true);
            }
            else {
                var toastNotification = document.getElementById("snackbar");
                toastNotification.innerHTML = "Error: Could not load video."
                toastNotification.className = "show";
                setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
            }
        }

        function makeUL() {
            // Create the list element:
            currentHTMLList = document.getElementById('videosToPlayList');
            var input = document.getElementById('url');
            input.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    var val = input.value.replace(/(\r\n\t|\n|\r\t)/gm, "");
                    if (val != "") {
                        if (!currentVideoList.includes(val)) {
                            loadVid(input.value, false);
                        }
                        else {
                            document.getElementById('url').value = "";
                            var toastNotification = document.getElementById("snackbar");
                            toastNotification.innerHTML = "Video already within the list."
                            toastNotification.className = "show";
                            setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
                        }
                    }
                    else {
                        document.getElementById('url').value = "";
                        var toastNotification = document.getElementById("snackbar");
                        toastNotification.innerHTML = "Please provide a valid link."
                        toastNotification.className = "show";
                        setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
                    }
                }
            });
            currentVidListCount = currentVideoList.length;
            for (var i = 0; i < currentVideoList.length; i++) {
                var vidId = getVideoId(currentVideoList[i]);
                getVideoTitle(vidId);
            }

            return currentHTMLList;
        }

        function getVideoId(url) {
            var vidId = url.replace(url.substring(0, url.indexOf('?v=') + 3), "");

            return vidId;
        }

        function clearUL() {
            currentVidListCount = 0;
            currentVidListTitles = [];
            //currentHTMLList.empty();
            $("ul").empty();
        }

        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        function onYouTubeIframeAPIReady() {
            var videoUrl = "https://www.youtube.com/watch?v=dFLStfSOJQ0";
            var vidId = videoUrl.replace(videoUrl.substring(0, videoUrl.indexOf('?v=') + 3), "");
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: vidId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            if (currentVideoList.length == 0)
                document.getElementById('buttonNext').style.display = "none";

            event.target.playVideo();
            clearUL();
            document.getElementById('videosToPlay').appendChild(makeUL());
        }

        var done = false;

        function goToNextVid() {
            debugger;
            var nextVid = currentVideoList.shift();
            if (nextVid != undefined)
                loadVid(nextVid, true);
            else {
                var toastNotification = document.getElementById("snackbar");
                toastNotification.innerHTML = "Error: No next video in list."
                toastNotification.className = "show";
                setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
            }
        }

        function onPlayerStateChange(event) {
            if (event.data === 0) {
                goToNextVid();
            }
        }

        function stopVideo() {
            player.stopVideo();
        }

        function isValidURL(url) {
            //VALID: https://www.youtube.com/watch?v=InNbKU4f5s0
            //NOT VALID: https://www.youtube.com/watch?v=NsB2eya4nFA&list=RDNsB2eya4nFA&start_radio=1&t=3971223
            //NOT VALID: https://youtu.be/-Rnpx7vpASg?t=4
            //NOT VALID: https://youtu.be/dFLStfSOJQ0?t=1437

            debugger;

            var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            var isValid = pattern.test(url);

            if (!isValid)
                return false;

            if (url == "" || url == " ")
                return false;

            if (url.includes(".be/"))
                return false;

            if (!url.includes("https://www.youtube.com/watch?v="))
                return false;

            if (url.includes("?t="))
                return false;


            if (url.includes("&list="))
                return false;

            return true;
        }

        function loadVid(url, autoload) {
            url = url.replace(/(\r\n\t|\n|\r\t)/gm, "");
            if (isValidURL(url)) {
                if (url.includes("&list="))
                    url = url.substring(0, url.indexOf("&list="));

                document.getElementById('url').value = "";
                if (autoload) // end of video play new one
                {
                    var vidId = getVideoId(url);
                    player.loadVideoById(vidId, 0, "highres");
                    clearUL();
                    document.getElementById('videosToPlay').appendChild(makeUL());
                }
                else //hit load video
                {
                    if (currentVideoList != 0) {
                        if (!currentVideoList.includes(url)) {
                            currentVideoList.push(url);
                            clearUL();
                            document.getElementById('videosToPlay').appendChild(makeUL());
                        }
                        else {
                            var toastNotification = document.getElementById("snackbar");
                            toastNotification.innerHTML = "Error: Video already within list."
                            toastNotification.className = "show";
                            setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
                        }
                    }
                    else {
                        if (player.getPlayerState() == YT.PlayerState.PLAYING && !done) {
                            currentVideoList.push(url);
                            clearUL();
                            document.getElementById('videosToPlay').appendChild(makeUL());
                        }
                        else {
                            var vidId = getVideoId(url);
                            player.loadVideoById(vidId, 0, "highres");
                        }
                    }

                    if (currentVideoList.length == 0)
                        document.getElementById('buttonNext').style.display = "none";
                    else
                        document.getElementById('buttonNext').style.display = "block";
                }
            }
            else {
                document.getElementById('url').value = "";
                var toastNotification = document.getElementById("snackbar");
                toastNotification.innerHTML = "Please provide a valid link."
                toastNotification.className = "show";
                setTimeout(function () { toastNotification.className = toastNotification.className.replace("show", ""); }, 3000);
            }
        }