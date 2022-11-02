/**
 * @file video.js
 * Helper scripts related to video.
 * @returns
 */

function getSupportedVideoFormats() {
  // Test from Modernizr.
  var elem = document.createElement('video');
  var bool = false;

  // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
  try {
    if ((bool = !!elem.canPlayType)) {
      bool = new Boolean(bool);
      bool.ogg = elem
        .canPlayType('video/ogg; codecs="theora"')
        .replace(/^no$/, '');

      // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
      bool.h264 = elem
        .canPlayType('video/mp4; codecs="hvc1')
        .replace(/^no$/, '');
      bool.webm = elem
        .canPlayType('video/webm; codecs="vp8, vorbis"')
        .replace(/^no$/, '');

      bool.vp9 = elem
        .canPlayType('video/webm; codecs="vp9"')
        .replace(/^no$/, '');

      bool.hls = elem
        .canPlayType('application/x-mpegURL; codecs="avc1.42E01E"')
        .replace(/^no$/, '');
    }
  } catch (e) {}

  return bool;
}

function getVideoFormat(mime) {
  //   return mime ? 'video/webm' : 'webm';

  var bool = getSupportedVideoFormats();
  // Prioritization of video format fallback.
  if (bool.h264 !== '') {
    return mime ? 'video/mp4;codecs=hvc1' : 'mp4';
  }
  if (bool.webm !== '') {
    return mime ? 'video/webm' : 'webm';
  }
  if (bool.ogg !== '') {
    return mime ? 'video/ogg' : 'ogv';
  }

  console.log('Supported video format', bool);
}

/**
 * parseVideoUrls
 * @param {*} videos
 * @param {*} devices
 * @param {*} formats
 * @returns
 */
export const parseVideoUrls = (videos, devices, formats) =>
  videos.hero
    .map((videos, i) =>
      devices
        .map(device =>
          formats.map((format, i) => `${videos[device]}.${format}`),
        )
        .flat(),
    )
    .flat();

export const addSourceToVideo = (element, src, type) => {
  var source = document.createElement('source');
  source.src = src;
  source.type = type;
  element.appendChild(source);
};

export const createVideo = (
  url = '',
  preload = 'auto',
  width = '1920',
  height = '1080',
) => {
  if (typeof document === 'undefined') return;
  var _video = document.createElement('video');
  _video.setAttribute('crossorigin', 'anonymous');
  _video.setAttribute('loop', 'true');
  _video.setAttribute('muted', 'true');
  // _video.setAttribute('autoplay', autoPlay); // Will delete the preload
  _video.setAttribute('playsinline', 'true');
  _video.setAttribute('webkit-playsinline', 'true');
  _video.setAttribute('preload', preload);
  _video.setAttribute('defaultMuted', 'true');
  _video.setAttribute('width', width);
  _video.setAttribute('height', height);

  addSourceToVideo(_video, `${url}.mp4`, 'video/mp4;codecs=hvc1');
  addSourceToVideo(_video, `${url}.webm`, 'video/webm');

  return _video;
};

/**
 * preloadVideo
 * @param {string} url
 * @param {object} callbacks
 */
export const preloadVideo = async (
  url,
  {
    onProgress = total => console.log('total video loaded', total),
    onLoadComplete = blob => console.log('video loaded', blob),
  },
) => {
  await GET(url);

  function onProgress(event) {
    if (event.lengthComputable) {
      var completion = (event.loaded / event.total) * 100;
      onProgress(completion);
    }
  }

  function onLoad(event) {
    var type = getVideoFormat(true);
    var blob = new Blob([event.target.response], {
      type: type,
    });
    const src = URL.createObjectURL(blob);
    onLoadComplete(src);
  }

  async function GET(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.responseType = 'arraybuffer';
    // xhr.responseType = 'blob';
    xhr.onprogress = onProgress;
    xhr.onload = onLoad;
    xhr.send();
  }
};

/**
 * loadVideoNatively
 */
export const loadVideoNatively = (
  video,
  onProgress = total => console.log('total video loaded', total),
) => {
  function logEvent(e) {
    var debug = [];
    switch (e.type) {
      case 'progress':
        var completion = (this.buffered.end(0) / this.duration) * 100;
        onProgress(completion);
        debug.push(completion);
      default:
        debug.push(e.type, e);
        break;
    }
    console.debug(debug);
  }

  video.addEventListener('loadstart', logEvent);
  video.addEventListener('durationchange', logEvent);
  video.addEventListener('loadedmetadata', logEvent);
  video.addEventListener('loadeddata', logEvent);
  video.addEventListener('progress', logEvent);
  video.addEventListener('canplay', logEvent);
  video.addEventListener('canplaythrough', logEvent);

  video.src = url;
  video.type = getVideoFormat(true);
  video.load();
};

/**
 * rewind
 * @param {object} video is the video element
 * @param {int} endTime is the time to stop the video
 * @param {int} rewindSpeed
 * @returns
 */
export const rewind = (video, endTime = 0, rewindSpeed = 1, debug = true) => {
  var startSystemTime = new Date().getTime();
  var startVideoTime = video.currentTime;

  let intervalRewind = setInterval(function () {
    video.playbackRate = 1.0;
    if (video.currentTime <= endTime) {
      clearInterval(intervalRewind);
      video.pause();
    } else {
      var elapsed = new Date().getTime() - startSystemTime;
      if (debug) console.log('Rewind Elapsed: ' + elapsed.toFixed(3));
      video.currentTime = Math.max(
        startVideoTime - (elapsed * rewindSpeed) / 1000.0,
        0,
      );
    }
  }, 30);
};

/**
 * checkTime
 * @param {*} endTime
 * @param {*} video
 */
export const checkTime = (endTime, video) => {
  if (video.currentTime >= endTime) {
    video.pause();
  } else {
    /* call checkTime every 1/10th 
        second until endTime */
    setTimeout(checkTime, 100, endTime, video);
  }
};
