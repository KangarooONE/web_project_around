console.log('JS cargó');



const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup_type_edit-profile');


editButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});




closeButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});