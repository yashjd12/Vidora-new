import React, { useEffect } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';

const VideoPlayer = (props) => {
  const videoId = props.videoId
  const hlsId = props.hlsId
  const source = `https://dm040wdizsv0s.cloudfront.net/assets/${hlsId}/HLS/${videoId}.m3u8`;
  console.log(source)
  useEffect(() => {
    const initVideoPlayer = () => {
      const video = document.getElementById('player');
      const defaultOptions = {
        controls: [
          'play-large',
          'restart',
          'rewind',
          'play',
          'fast-forward',
          'progress',
          'current-time',
          'duration',
          'mute',

          'volume',
          'captions',
          //'settings',
          'pip',
          'airplay',
          'fullscreen',
        ],
      };

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(source);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          const availableQualities = hls.levels.map((l) => l.height);

          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (e) => updatedQuality(e),
          };

          new Plyr(video, defaultOptions);
        });
        hls.attachMedia(video);
        window.hls = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For browsers that support HLS natively (e.g., Safari)
        video.src = source;
        video.addEventListener('loadedmetadata', function () {
          const availableQualities = [{ width: video.videoWidth, height: video.videoHeight }];

          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (e) => updatedQuality(e),
          };

          new Plyr(video, defaultOptions);
        });
      }
    };

    const updatedQuality = (newQuality) => {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          window.hls.currentLevel = levelIndex;
        }
      });
    };

    initVideoPlayer();
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <video id="player" controls></video>
    </div>
  );
};

export default VideoPlayer;
