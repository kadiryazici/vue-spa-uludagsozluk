let progressInternal;
let controlTimeout = null;

document.addEventListener("DOMContentLoaded", () => {
  let video = document.querySelector("video");
  let videoContainer = document.querySelector(".video-container");
  let durationEl = videoContainer.querySelector(".duration");
  let fullscreen = videoContainer.querySelector(".fullscreen");
  let normalscreen = videoContainer.querySelector(".normalscreen");
  let progress = videoContainer.querySelector(".current-progress");
  let progressClick = videoContainer.querySelector(
    ".progress-bar .click-handler"
  );
  let loadProgress = videoContainer.querySelector(".loaded-progress");
  let videoControls = document.querySelector(
    ".video-container .video-controls"
  );
  let playButton = videoContainer.querySelector(".play");
  let pauseButton = videoContainer.querySelector(".pause");
  let volumeOnButton = videoContainer.querySelector(".volume-on");
  let volumeOffButton = videoContainer.querySelector(".volume-off");
  let volumeSlider = videoContainer.querySelector("#volume-slider");
  let sliderProgress = videoContainer.querySelector(".slider-progress");

  let isFull = false;
  let playing = true;
  let count = 0;
  let canCount = true;
  let muted = true;

  let secSliderMouseDown = false;
  let sliderPercentage = 0;

  let volumeSliderMouseDown = false;
  let volumeSliderPercentage = 0;

  videoContainer.addEventListener("keyup", (e) => {
    count = 0;
    videoContainer.removeAttribute("hide-controls");
    if (e.keyCode == 39) {
      video.currentTime += 5;
    } else if (e.keyCode == 37) {
      video.currentTime -= 5;
    } else if (e.keyCode == 77) {
      video.muted = !video.muted;
      muted = !muted;
    } else if (e.keyCode == 70) {
      if (isFull) {
        document.exitFullscreen();
        isFull = false;
      } else {
        videoContainer.requestFullscreen();
        isFull = true;
      }
    } else if (e.keyCode == 32) {
      if (playing) {
        video.pause();
      } else {
        video.play();
      }
      playing = !playing;
    }
  });

  volumeSlider.onmousedown = (e) => {
    volumeSliderMouseDown = true;
  };

  volumeSlider.onclick = (e) => {
    let { y } = volumeSlider.getBoundingClientRect();
    let percentage = ((e.clientY - y) / volumeSlider.offsetHeight) * 100;
    volumeSliderPercentage = 100 - percentage;

    if (volumeSliderPercentage > 100) {
      volumeSliderPercentage = 100;
    } else if (volumeSliderPercentage < 0) {
      volumeSliderPercentage = 0;
    }

    sliderProgress.style.height = volumeSliderPercentage + "%";
    video.volume = volumeSliderPercentage / 100;
    video.muted = false;
    muted = false;
  };

  progressClick.onmousedown = (e) => {
    secSliderMouseDown = true;
  };

  window.addEventListener("mousemove", (e) => {
    if (secSliderMouseDown) {
      let { x } = progressClick.getBoundingClientRect();
      let percentage = ((e.clientX - x) / progressClick.offsetWidth) * 100;
      if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 100) {
        percentage = 100;
      }
      sliderPercentage = percentage;
      progress.style.width = percentage + "%";
    }

    if (volumeSliderMouseDown) {
      let { y } = volumeSlider.getBoundingClientRect();
      let percentage = ((e.clientY - y) / volumeSlider.offsetHeight) * 100;
      volumeSliderPercentage = 100 - percentage;

      if (volumeSliderPercentage > 100) {
        volumeSliderPercentage = 100;
      } else if (volumeSliderPercentage < 0) {
        volumeSliderPercentage = 0;
      }

      sliderProgress.style.height = volumeSliderPercentage + "%";
      video.volume = volumeSliderPercentage / 100;
      video.muted = false;
      muted = false;
    }
  });

  window.addEventListener("mouseup", () => {
    if (secSliderMouseDown) {
      secSliderMouseDown = false;
      video.currentTime = (video.duration / 100) * sliderPercentage;
      if (playing) {
        video.play();
        playing = true;
      } else {
        video.pause();
        playing = false;
      }
    }

    if (volumeSliderMouseDown) {
      volumeSliderMouseDown = false;
      video.volume = volumeSliderPercentage / 100;
      video.muted = false;
      muted = false;
    }
  });

  volumeOffButton.onclick = () => {
    muted = !muted;
    if (muted) {
      videoContainer.setAttribute("muted", "");
    } else {
      videoContainer.removeAttribute("muted");
    }
  };

  volumeOnButton.onclick = () => {
    muted = !muted;
    if (muted) {
      videoContainer.setAttribute("muted", "");
    } else {
      videoContainer.removeAttribute("muted");
    }
  };

  videoControls.ondblclick = (e) => {
    e.stopPropagation();
  };
  videoControls.onclick = (e) => {
    e.stopPropagation();
  };

  videoControls.onmouseenter = () => {
    canCount = false;
    count = 0;
  };
  videoControls.onmouseleave = () => {
    canCount = true;
  };

  videoControls.onmousemove = (e) => {
    canCount = false;
    count = 0;
  };

  videoContainer.onmousemove = (e) => {
    if (!canCount) {
      canCount;
    }

    if (!video.paused) {
      videoContainer.removeAttribute("hide-controls");
      count = 0;
    }
  };

  progressInternal = setInterval(bufferFunction, 300);

  let pausePlay = () => {
    if (playing) {
      video.pause();
      playing = false;
    } else {
      video.play();
      playing = true;
    }
  };

  video.onclick = () => {
    pausePlay();
  };
  playButton.onclick = () => {
    pausePlay();
  };
  pauseButton.onclick = () => {
    pausePlay();
  };

  progressClick.onclick = (e) => {
    let left = videoContainer.getBoundingClientRect().x;
    let requestedTime = e.clientX - (left + 17.5);
    let percentage = (requestedTime / progressClick.offsetWidth) * 100;

    video.currentTime = (video.duration * percentage) / 100;
    progress.style.width = percentage + "%";
  };

  video.addEventListener("play", () => {
    clearInterval(progressInternal);
  });

  video.addEventListener("pause", () => {
    progressInternal = setInterval(bufferFunction, 300);
  });

  let screenCheck = () => {
    isFull = !isFull;
    if (isFull) {
      videoContainer.requestFullscreen();
      videoContainer.setAttribute("fullscreen", "");
    } else {
      document.exitFullscreen();
      videoContainer.removeAttribute("fullscreen");
    }
  };

  fullscreen.onclick = () => {
    screenCheck();
  };
  normalscreen.onclick = () => {
    screenCheck();
  };

  videoContainer.ondblclick = () => {
    screenCheck();
  };

  let currentDuration = `00:00:00`;
  let fullDuration = `00:00:00`;

  video.addEventListener("timeupdate", (e) => {
    let duration = msToHMS(e.target.currentTime);
    let hours = duration.hours;
    let minutes = duration.minutes;
    let seconds = duration.seconds;

    progress.style.width =
      (e.target.currentTime / e.target.duration) * 100 + "%";

    durationEl.innerText = `${
      hours > 0 ? hours + ":" : ""
    }${minutes}:${seconds} / ${fullDuration}`;

    try {
      var buffer = video.buffered.end(video.buffered.length - 1);
    } catch (error) {}
    loadProgress.style.width = (buffer / e.target.duration) * 100 + "%";

    if (playing && !video.paused) {
      videoContainer.setAttribute("playing", "");
    } else {
      videoContainer.removeAttribute("playing");
    }

    if (count > 15 && !video.paused) {
      videoContainer.setAttribute("hide-controls", "");
      count = 0;
    }

    if (canCount) count += 1;

    if (video.ended) {
      playing = false;
      videoContainer.removeAttribute("playing");
    }

    if (muted) {
      videoContainer.setAttribute("muted", "");
      video.muted = true;
    } else {
      videoContainer.removeAttribute("muted");
      video.muted = false;
    }
  });

  video.addEventListener("loadedmetadata", (e) => {
    let duration = msToHMS(e.target.duration);
    let hours = duration.hours;
    let minutes = duration.minutes;
    let seconds = duration.seconds;

    fullDuration = (hours > 0 ? hours + "." : "") + minutes + ":" + seconds;

    durationEl.innerText = `${currentDuration} / ${
      hours > 0 ? hours + ":" : ""
    }${minutes}.${seconds}`;
  });
});

let msToHMS = (ms) => {
  let videoDuration = ms;
  let hours = Math.floor(videoDuration / 3600);
  let minutes = Math.floor((videoDuration - hours * 3600) / 60);
  let firstSeconds = videoDuration % 3600;
  let seconds;

  if (firstSeconds < 60) {
    seconds = firstSeconds;
  } else {
    seconds = firstSeconds % 60;
  }

  seconds = Math.floor(seconds);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return {
    hours,
    seconds,
    minutes,
  };
};

let bufferFunction = () => {
  let video = document.querySelector(".video-container video");
  let loadProgress = document.querySelector(
    ".video-container .loaded-progress"
  );

  try {
    var buffer = video.buffered.end(video.buffered.length - 1);
  } catch (error) {}
  loadProgress.style.width = (buffer / video.duration) * 100 + "%";
};
