import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

playOnSavedTime();

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const playTime = data;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(playTime));
}

function playOnSavedTime() {
  const getTime = localStorage.getItem(LOCALSTORAGE_KEY);

  if (getTime) {
    const parsedGetTime = JSON.parse(getTime);
    const { seconds } = parsedGetTime;

  player
    .setCurrentTime(seconds)
    .then(function (seconds) {

    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;

        default:
          break;
      }
    });
  }
}