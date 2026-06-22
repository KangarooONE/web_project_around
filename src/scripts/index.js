const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup_type_edit-profile');
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__button');


function toggleButtonState() {
  const isFilled = 
    nameInput.value.trim() !== '' &&
    aboutInput.value.trim() !== '';

  saveButton.disabled = !isFilled;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  closePopup();
}

function openPopup() {

  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;

  toggleButtonState();
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleProfileFormSubmit);
nameInput.addEventListener('input', toggleButtonState);
aboutInput.addEventListener('input', toggleButtonState);
