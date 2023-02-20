// Завдання 2 - відеоплеєр
// Скрипт буде зберігати поточний час відтворення відео у локальне сховище і,
// після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

import Player from '@vimeo/player'; //імпорт бібліотеки Vimeo плеєра згідно документації
import { throttle } from 'lodash'; //Додали до проекту бібліотеку lodash.throttle

const iframe = document.getElementById('vimeo-player'); // Знаходження в документі елементу iframe за індентифікатором

const player = new Player(iframe); // Створення екземпляра плеєру з классу бібліотеки Vimeo

// Дадавання слухача на відстежування події timeupdate
player.on(
  'timeupdate',
  throttle(e => {
    // Збереження часу відтворення у локальне сховище за ключем "videoplayer-current-time"
    localStorage.setItem('videoplayer-current-time', e.seconds);
  }, 1000) //Оновлення часу відтворенняу сховищі відбувається з інтервалом в секунду
);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);
// Під час перезавантаження сторінки скористалися методом setCurrentTime()
// з метою відновлення відтворення зі збереженої позиції,
// записаної у локальне сховище за ключем "videoplayer-current-time"
// Через оператор OR (||) встановили друге значення 0, який вибере метод,
// щоб не виникла помилка після перезавантеження сторінки без відтворення відео:
// "Uncaught(in promise) TypeError: There must be a value to set",
// у випадку, коли в локальне сховище ще не записалося значення часу.
