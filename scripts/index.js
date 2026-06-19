console.log('JS cargó');



const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__button');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const popup = document.querySelector('.popup_type_edit-profile');

function toggleButtonState() {
  const isFilled = 
    nameInput.value.trim() !== '' &&
    aboutInput.value.trim() !== '';

  saveButton.disabled = !isFilled;
}

nameInput.addEventListener('input', toggleButtonState);
aboutInput.addEventListener('input', toggleButtonState);


editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});