import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const playTime = data;

  localStorage.setItem('videoplayer-current-time', JSON.stringify(playTime));
}

function playOnSavedTime() {
  const getTime = localStorage.getItem('videoplayer-current-time');
  const parsedGetTime = JSON.parse(getTime);

  player
    .setCurrentTime(seconds)
    .then(function (seconds) {
      const { seconds } = parsedGetTime;
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
playOnSavedTime();
