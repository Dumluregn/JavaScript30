const PLAYER = document.querySelector(".player");
const VIDEO = PLAYER.querySelector(".viewer");
const PROGRESS = PLAYER.querySelector(".progress");
const PROGRESSBAR = PLAYER.querySelector(".progress__filled");
const TOGGLE = PLAYER.querySelector(".toggle");
const SKIPBUTTONS = PLAYER.querySelectorAll("[data-skip]");
const RANGES = PLAYER.querySelectorAll(".player__slider");
const FULLSCREENBUTTON = PLAYER.querySelector(".fullscreen");

PROGRESSBAR.style.flexBasis = "0%";
let mouseDown = false;
let fullScreen = false;
const defaultWidth = "750px";

function togglePlay(){
    VIDEO.paused ? VIDEO.play() : VIDEO.pause();
}

function togglePlayButton(){
    const ICON = this.paused ? '►' : '❚ ❚';
    TOGGLE.innerHTML = ICON;
}

function skip(){
    VIDEO.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate(){
    VIDEO[this.name] = this.value;
}

function handleProgress(){
    const PERCENTAGE = (VIDEO.currentTime / VIDEO.duration) * 100;
    PROGRESSBAR.style.flexBasis = PERCENTAGE + "%";
}

function scrub(e){
    VIDEO.currentTime = (e.offsetX / PROGRESS.offsetWidth) * VIDEO.duration;
}

function toggleFullScreen(){
    if (fullScreen){
        PLAYER.style.maxWidth = defaultWidth;
        PLAYER.style.width = defaultWidth;

    } else {
        PLAYER.style.maxWidth = window.outerWidth + "px";
        PLAYER.style.width = window.outerWidth + "px";
    }
    fullScreen = !fullScreen;
}

VIDEO.addEventListener("click", togglePlay);
VIDEO.addEventListener("play", togglePlayButton);
VIDEO.addEventListener("pause", togglePlayButton);
VIDEO.addEventListener("timeupdate", handleProgress);

TOGGLE.addEventListener("click", togglePlay);
SKIPBUTTONS.forEach(button => button.addEventListener("click", skip));
RANGES.forEach(range => range.addEventListener("change", handleRangeUpdate));
FULLSCREENBUTTON.addEventListener("click", toggleFullScreen);

PROGRESS.addEventListener("click", scrub);
PROGRESS.addEventListener("mousedown", () => mouseDown = true);
PROGRESS.addEventListener("mouseup", () => mouseDown = false);
PROGRESS.addEventListener("mousemove", (e) => mouseDown && scrub(e));
