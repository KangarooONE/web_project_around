/* ==========================================================================
   1. CONFIGURACIÓN Y FUENTE DE DATOS
   ========================================================================== */
const initialCards = [
  { name: "Valle de Yosemite", link: "https://www.weroad.es/blog/wp-content/uploads/2022/05/yosemite-national-park.jpg" },
  { name: "Lago Louise", link: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Lake_Louise_17092005.jpg" },
  { name: "Montañas Calvas", link: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Bald_Mountain.JPG" },
  { name: "Latemar", link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OuRdAMquwuchcxmBbEoOtuK-6jEu26Otw0Y4jx52bY8Hj2X6bLvO77Ds&s=10" },
  { name: "Parque Nacional de la Vanoise", link: "https://historichotelsofeurope.com/wp-content/uploads/2022/08/france-vanoise-national-park-hiking..jpg" },
  { name: "Lago di Braies", link: "https://upload.wikimedia.org/wikipedia/commons/2/20/Lago_di_Braies_a_maggio.jpg" }
];

const config = {
  selectors: {
    cardsList: '.cards__list',
    cardTemplate: '#card-template',
    cardElement: '.card',
    cardImage: '.card__image',
    cardTitle: '.card__title',
    cardLikeButton: '.card__like-button',
    cardDeleteButton: '.card__delete-button',
    
    profileName: '.profile__name',
    profileAbout: '.profile__description',
    buttonEditProfile: '.profile__edit-button',
    buttonAddCard: '.profile__add-button',
    
    popupProfile: '.popup_type_edit-profile',
    popupAddCard: '.popup_type_add-card',
    popupElement: '.popup',

    popupImage: '.popup_type_image',       
    popupPreviewImage: '.popup__image', 
    popupPreviewTitle: '.popup__caption',
    
    formInput: '.popup__input',
    submitButton: '.popup__button',
    
    formProfileName: 'edit-profile',
    formAddCardName: 'add-card',
    
    inputName: '.popup__input_type_name',
    inputAbout: '.popup__input_type_about',
    inputTitle: '.popup__input_type_title',
    inputUrl: '.popup__input_type_url'
  },
  classes: {
    popupOpened: 'popup_opened',
    closeButton: 'popup__close-button',
    likeButtonActive: 'card__like-button_active',
    inactiveButton: 'popup__button_disabled'
  },
  settings: {
    placeholderImage: '../images/placeholder.jpg'
  }
};

/* ==========================================================================
   2. NODOS DEL DOM
   ========================================================================== */
const cardsContainer = document.querySelector(config.selectors.cardsList);
const cardTemplate = document.querySelector(config.selectors.cardTemplate).content;


const profileSection = document.querySelector('.profile'); 
const profileName = profileSection.querySelector(config.selectors.profileName);
const profileAbout = profileSection.querySelector(config.selectors.profileAbout);
const buttonEditProfile = profileSection.querySelector(config.selectors.buttonEditProfile);
const buttonAddCard = document.querySelector(config.selectors.buttonAddCard);
const popupImage = document.querySelector(config.selectors.popupImage);
const popupPreviewImage = popupImage.querySelector(config.selectors.popupPreviewImage);
const popupPreviewTitle = popupImage.querySelector(config.selectors.popupPreviewTitle);

const popupProfile = document.querySelector(config.selectors.popupProfile);
const formProfile = document.forms[config.selectors.formProfileName];
const inputName = formProfile.querySelector(config.selectors.inputName);
const inputAbout = formProfile.querySelector(config.selectors.inputAbout);
const buttonSaveProfile = formProfile.querySelector(config.selectors.submitButton);

const popupAddCard = document.querySelector(config.selectors.popupAddCard);
const formAddCard = document.forms[config.selectors.formAddCardName];
const inputTitle = formAddCard.querySelector(config.selectors.inputTitle);
const inputUrl = formAddCard.querySelector(config.selectors.inputUrl);
const buttonSaveCard = formAddCard.querySelector(config.selectors.submitButton);

/* ==========================================================================
   3. FUNCIONES UTILITARIAS Y DE INTERFAZ
   ========================================================================== */
function openPopup(modal) {
  modal.classList.add(config.classes.popupOpened);
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(modal) {
  modal.classList.remove(config.classes.popupOpened);
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(`.${config.classes.popupOpened}`);
    if (openedPopup) closePopup(openedPopup);
  }
}

// Controla el estado del botón basado en la validez de sus campos
function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every(input => input.value.trim() !== '');
  button.disabled = !isFormValid;
  button.classList.toggle(config.classes.inactiveButton, !isFormValid);
}

// Unifica el chequeo de validación sin duplicar lógica en los listeners de apertura
function checkFormValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.selectors.formInput));
  const buttonElement = formElement.querySelector(config.selectors.submitButton);
  if (inputList.length && buttonElement) {
    toggleButtonState(inputList, buttonElement);
  }
}
/* ==========================================================================
   4. GENERADORES DE COMPONENTES
   ========================================================================== */
function createCard(data) {
  const cardElement = cardTemplate.querySelector(config.selectors.cardElement).cloneNode(true);
  const cardImage = cardElement.querySelector(config.selectors.cardImage);
  const cardTitle = cardElement.querySelector(config.selectors.cardTitle);
  const likeButton = cardElement.querySelector(config.selectors.cardLikeButton);
  const deleteButton = cardElement.querySelector(config.selectors.cardDeleteButton);

  cardImage.addEventListener('click', () => {
    popupPreviewImage.src = data.link;
    popupPreviewImage.alt = `Fotografía de ${data.name}`;
    popupPreviewTitle.textContent = data.name;
    openPopup(popupImage);
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Fotografía de ${data.name}`;
  
  cardImage.onerror = () => {
    cardImage.src = config.settings.placeholderImage;
  };

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle(config.classes.likeButtonActive);
  });
  
  deleteButton.addEventListener('click', () => cardElement.remove());
  
  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach(cardData => cardsContainer.append(createCard(cardData)));
}

/* ==========================================================================
   5. MANEJADORES DE FORMULARIOS (SUBMIT HANDLERS)
   ========================================================================== */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: inputTitle.value, link: inputUrl.value }));
  closePopup(popupAddCard);
  formAddCard.reset();
  checkFormValidation(formAddCard);
}

/* ==========================================================================
   6. EVENT LISTENERS E INICIALIZACIÓN
   ========================================================================== */
buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  checkFormValidation(formProfile); // En vez de toggleButtonState manual, usamos el unificador
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  checkFormValidation(formAddCard); // En vez de toggleButtonState manual, usamos el unificador
  openPopup(popupAddCard);
});

document.addEventListener('mousedown', (evt) => {
  const target = evt.target;
  
 if (target.classList.contains(config.classes.popupOpened)) {
    closePopup(target);
  }
  else if (target.classList.contains(config.classes.closeButton)) {
    closePopup(target.closest(config.selectors.popupElement));
  }
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleCardFormSubmit);

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll('form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.selectors.formInput));
  const buttonElement = formElement.querySelector(settings.selectors.submitButton);
  
  // Guardia de seguridad: detiene la ejecución si el formulario no tiene botón de submit
  if (!buttonElement) return;
  
  // Establece el estado inicial del botón al cargar el formulario
  toggleButtonState(inputList, buttonElement);
  
  // Aplica delegación interna para validar ante cualquier cambio en los inputs
  formElement.addEventListener('input', () => {
    toggleButtonState(inputList, buttonElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards();   // 1. Dibuja la galería de tarjetas inicial
  enableValidation(config); // 2. Activa el ecosistema de validación automatizado
});