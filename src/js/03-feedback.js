import throttle from 'lodash.throttle';

const LOCKALSTORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onFormSaveFeedback, 500));
formEl.addEventListener('submit', onFormSubmit);

onFormGetFeedback();

function onFormSaveFeedback(evt) {
  const email = formEl.email.value;
  const message = formEl.message.value;

  const inputValue = { email, message };

  localStorage.setItem(LOCKALSTORAGE_KEY, JSON.stringify(inputValue));
}

function onFormGetFeedback() {
  const getFeedback = localStorage.getItem(LOCKALSTORAGE_KEY);
  const parsedGetFeedback = JSON.parse(getFeedback);

  if (getFeedback) {
    const email = parsedGetFeedback.email;
    const message = parsedGetFeedback.message;

    formEl.email.value = email;
    formEl.message.value = message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const submitValue = {
    email: formEl.email.value,
    message: formEl.message.value,
  };
  console.log(submitValue);

  evt.currentTarget.reset();
  localStorage.removeItem(LOCKALSTORAGE_KEY);
}
