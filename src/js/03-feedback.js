// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати
// значення полів у локальне сховище, коли користувач щось друкує.

import { throttle } from 'lodash'; //Додали до проекту бібліотеку lodash.throttle

// Знаходження в документі елементів форми
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
// Ключ для сховища
const LOCALSTORAGE_KEY = 'feedback-form-state';

// Додаємо слухача події input до форми
form.addEventListener(
  'input',
  throttle(e => {
    // Створення об'єкту з властивостями email та message, в яких будуть зберігатися відповідні значення полів форми
    const objectToSave = { email: email.value, message: message.value };

    // Запис у локальне сховище значень полів об'єкту в форматі строки JSON
    // Cховище оновлюється не частіше, ніж раз на 500 мілісекунд)
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

// Додаємо слухача події submit до форми
form.addEventListener('submit', e => {
  e.preventDefault(); // відміняє перезавантеження сторінки при натисканні кнопки "submit"

  // Перевірка чи заповнені всі поля форми
  if (email.value === '' || message.value === '') {
    return alert('Будь-ласка, заповніть всі поля!');
  }

  // Виведення у консоль об'єкта з полями та їхніми поточними значеннями
  console.log({ email: email.value, message: message.value });

  form.reset(); // очищення полів форми
  localStorage.removeItem(LOCALSTORAGE_KEY); // видаляє записи зі сховища за ключем
});

// Обробка помилок під час зчитування запису за ключем зі сховища
// Стандартний метод load
const load = key => {
  try {
    const serializedState = localStorage.getItem(key); //зчитування поточного значення ключа сховища

    return serializedState === null ? undefined : JSON.parse(serializedState);
    // Якщо значення не записане - поверне undefined, інакше розпарсить елемент у валідний об'єкт.
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
// Виклик стандартного методу load для значень ключа LOCALSTORAGE_KEY
const localStorageData = load(LOCALSTORAGE_KEY);

// Перевірка стану сховища, і якщо там є збережені дані, то поля форми будуть ними заповнені.
// В іншому випадку поля будуть порожніми.
if (localStorageData) {
  email.value = localStorageData.email;
  message.value = localStorageData.message;
}
