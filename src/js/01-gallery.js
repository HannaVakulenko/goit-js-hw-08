//Завдання 1 - бібліотека SimpleLightbox

import { galleryItems } from './gallery-items';
// Підключення бібліотеки SimpleLightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

//Пошук елементу контейнеру галереї
const galleryContainer = document.querySelector('.gallery');

//Створення розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const imgElements = galleryItems.reduce((acum, item) => {
  return (acum += `
    <a class="gallery__item" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" title="${item.description}" alt="${item.description}" />
    </a>
  `);
}, '');

//Рендер розмітки (додавання в DOM)
galleryContainer.insertAdjacentHTML('beforeend', imgElements);

//Ініціалізація бібліотеки та додавання відображення підписів до зображень
new SimpleLightbox('.gallery a', {
  captionDelay: 250, //підпис розміщується знизу та з'являється через 250 мілісекунд після відкриття зображення
});
