/* ==========================================================================
   1. CONFIGURACIÓN Y FUENTE DE DATOS
   ========================================================================== */

/**
 * Fuente de datos estática inicial.
 */
const initialCards = [
  { name: "Valle de Yosemite", link: "https://www.weroad.es/blog/wp-content/uploads/2022/05/yosemite-national-park.jpg" },
  { name: "Lago Louise", link: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Lake_Louise_17092005.jpg" },
  { name: "Montañas Calvas", link: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Bald_Mountain.JPG" },
  { name: "Latemar", link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2OuRdAMquwuchcxmBbEoOtuK-6jEu26Otw0Y4jx52bY8Hj2X6bLvO77Ds&s=10" },
  { name: "Parque Nacional de la Vanoise", link: "https://historichotelsofeurope.com/wp-content/uploads/2022/08/france-vanoise-national-park-hiking..jpg" },
  { name: "Lago di Braies", link: "https://upload.wikimedia.org/wikipedia/commons/2/20/Lago_di_Braies_a_maggio.jpg" }
];

/**
 * DICCIONARIO DE LA UI (Single Source of Truth)
 * Centraliza selectores, clases y textos.
 */
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
    inputUrl: '.popup__input_type_url',
    toastContainer: '#toast-container',
  },
  classes: {
    popupOpened: 'popup_opened',
    closeButton: 'popup__close-button',
    likeButtonActive: 'card__like-button_active',
    inactiveButton: 'popup__button_disabled',
    inputError: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
    toastVisible: 'toast_visible',
  },
  settings: {
    placeholderImage: '../images/placeholder.jpg',
  },
  texts: {
    saving: "Guardando...",
    error: "Ocurrió un error al procesar la solicitud.",
  }
};

/**
 * Textos centralizados para validación de formularios.
 */
const errorMessages = {
  valueMissing: "Por favor, rellena este campo.",
  tooShort: (min) => `Por favor, ingresa al menos ${min} carácteres.`,
  typeMismatch: "Por favor, introduce un enlace URL válido."
};

// INMUTABILIDAD: Protegemos los objetos de configuración para que nadie pueda sobrescribirlos en tiempo de ejecución.
Object.freeze(config);
Object.freeze(config.selectors);
Object.freeze(config.classes);
Object.freeze(config.texts);
Object.freeze(errorMessages);

/* ==========================================================================
   2. NODOS DEL DOM CENTRALIZADOS
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

const popupAddCard = document.querySelector(config.selectors.popupAddCard);
const formAddCard = document.forms[config.selectors.formAddCardName];
const inputTitle = formAddCard.querySelector(config.selectors.inputTitle);
const inputUrl = formAddCard.querySelector(config.selectors.inputUrl);

/* ==========================================================================
   3. FUNCIONES UTILITARIAS Y DE INTERFAZ (UI)
   ========================================================================== */

/**
 * Abre un modal y gestiona la accesibilidad (Focus transfer).
 * @param {HTMLElement} modal - Nodo HTML del popup.
 */
function openPopup(modal) {
  modal.classList.add(config.classes.popupOpened);
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('keydown', handleFocusTrap);
  
  const firstInput = modal.querySelector(config.selectors.formInput);
  if (firstInput) {
    firstInput.focus({ preventScroll: true });
  }
}

/**
 * Cierra un modal y limpia los listeners de teclado para evitar memory leaks.
 * @param {HTMLElement} modal - Nodo HTML del popup.
 */
function closePopup(modal) {
  modal.classList.remove(config.classes.popupOpened);
  setTimeout(() => {
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('keydown', handleFocusTrap); 
  }, 300);
}





function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(`.${config.classes.popupOpened}`);
    if (openedPopup) closePopup(openedPopup);
  }
} 

function handleFocusTrap(evt) {
  if (evt.key !== 'Tab') return;

  const openedPopup = document.querySelector(`.${config.classes.popupOpened}`);
  if (!openedPopup) return;

  const focusableSelectors = [
    config.selectors.formInput,
    config.selectors.submitButton,
    `.${config.classes.closeButton}`
  ].join(', ');
  
  // Filtramos elementos disabled ya que no pueden recibir el foco
  const focusableElements = [...openedPopup.querySelectorAll(focusableSelectors)]
    .filter(element => !element.disabled);

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Lógica circular del tabulador
  if (evt.shiftKey) { 
    if (document.activeElement === firstElement) {
      lastElement.focus();
      evt.preventDefault(); 
    }
  } else { 
    if (document.activeElement === lastElement) {
      firstElement.focus();
      evt.preventDefault(); 
    }
  }
}

/**
 * Muestra una notificación Toast (No bloqueante).
 * @param {string} message - Mensaje a mostrar.
 * @param {string} type - 'error', 'info', etc.
 */
function showToast(message, type = 'error') {
  const container = document.querySelector(config.selectors.toastContainer);
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.classList.add('toast_type_error');
  }
  toast.textContent = message; 

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add(config.classes.toastVisible);
  });

  setTimeout(() => {
    toast.classList.remove(config.classes.toastVisible);
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 3000);
}

/**
 * Centralizador de errores de la aplicación.
 * @param {Error} error - Objeto del error.
 */
function handleError(error) {
  console.error('Error detectado en la aplicación:', error);
  // CORRECCIÓN: Ahora usa la variable centralizada en lugar de un string mágico.
  showToast(config.texts.error, 'error');
}

/* ==========================================================================
   4. SISTEMA DE VALIDACIÓN AUTOMATIZADA
   ========================================================================== */

function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every(input => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.classes.inactiveButton, !isFormValid);
}

function checkFormValidation(popupElement) {
  const inputList = [...popupElement.querySelectorAll(config.selectors.formInput)];
  const buttonElement = popupElement.querySelector(config.selectors.submitButton);
  if (inputList.length && buttonElement) {
    toggleButtonState(inputList, buttonElement);
    const formElement = popupElement.querySelector('form') || popupElement;
    inputList.forEach(input => hideInputError(formElement, input, config));
  }
}

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add(settings.classes.inputError);
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(settings.classes.errorVisible);
  }
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(settings.classes.inputError);
    inputElement.classList.remove(settings.classes.errorVisible);
    errorElement.textContent = '';
  }
}

/**
 * Evalúa la validez de un input, inyecta mensajes personalizados
 * y aplica protección estricta contra XSS en campos de URL.
 */
function checkInputValidity(formElement, inputElement, settings) {
  inputElement.setCustomValidity("");

  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(errorMessages.valueMissing);
    } else if (inputElement.validity.tooShort) {
      const minLength = inputElement.getAttribute("minlength");
      inputElement.setCustomValidity(errorMessages.tooShort(minLength));
    } else if (inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity(errorMessages.typeMismatch);
    }
  } else if (inputElement.type === 'url' && inputElement.value !== "") {
    try {
      const parsedUrl = new URL(inputElement.value);
      const secureProtocols = ["http:", "https:"];
      if (!secureProtocols.includes(parsedUrl.protocol)) {
        inputElement.setCustomValidity(errorMessages.typeMismatch);
      }
    } catch (e) {
      inputElement.setCustomValidity(errorMessages.typeMismatch);
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function enableValidation(settings) {
  const formList = [...document.querySelectorAll('form')];
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function setEventListeners(formElement, settings) {
  const inputList = [...formElement.querySelectorAll(settings.selectors.formInput)];
  const buttonElement = formElement.querySelector(settings.selectors.submitButton);

  if (!buttonElement) return;

  toggleButtonState(inputList, buttonElement);

  formElement.addEventListener('input', (evt) => {
    if (evt.target.matches(settings.selectors.formInput)) {
      checkInputValidity(formElement, evt.target, settings); 
    }
    toggleButtonState(inputList, buttonElement);
  });
}

/* ==========================================================================
   5. GENERADORES DE COMPONENTES DE TARJETA
   ========================================================================== */

function createCard(data) {
  const cardElement = cardTemplate.querySelector(config.selectors.cardElement).cloneNode(true);
  const cardImage = cardElement.querySelector(config.selectors.cardImage);
  const cardTitle = cardElement.querySelector(config.selectors.cardTitle);
  const likeButton = cardElement.querySelector(config.selectors.cardLikeButton);
  const deleteButton = cardElement.querySelector(config.selectors.cardDeleteButton);

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Fotografía de ${data.name}`;

  cardImage.addEventListener('click', () => {
    popupPreviewImage.src = data.link;
    popupPreviewImage.alt = `Fotografía de ${data.name}`;
    popupPreviewTitle.textContent = data.name;
    openPopup(popupImage);
  });

  cardImage.addEventListener('error', () => {
    cardImage.src = config.settings.placeholderImage;
  });

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
   6. MANEJADORES DE ENVÍO DE FORMULARIOS (SUBMIT)
   ========================================================================== */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = formProfile.querySelector(config.selectors.submitButton);
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = config.texts.saving;

  try {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(popupProfile);
  } catch (error) {
    handleError(error);
  } finally {
    submitButton.textContent = originalText;
  }
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formAddCard.querySelector(config.selectors.submitButton);
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = config.texts.saving;

  try {
    const newCardData = {
      name: inputTitle.value,
      link: inputUrl.value
    };

    cardsContainer.prepend(createCard(newCardData));
    closePopup(popupAddCard);
    
    formAddCard.reset();
    checkFormValidation(formAddCard); 
  } catch (error) {
    handleError(error);
  } finally {
    submitButton.textContent = originalText;
  }
}

/* ==========================================================================
   7. EVENT LISTENERS GLOBALES E INICIALIZACIÓN
   ========================================================================== */

buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  checkFormValidation(formProfile);
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  checkFormValidation(formAddCard);
  openPopup(popupAddCard);
});

// Event Delegation para cierre rápido de ventanas
document.addEventListener('mousedown', (evt) => {
  const target = evt.target;
  if (target.classList.contains(config.classes.popupOpened)) {
    closePopup(target);
  } else if (target.classList.contains(config.classes.closeButton)) {
    closePopup(target.closest(config.selectors.popupElement));
  }
});

formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// Exposición EXCLUSIVA para pruebas manuales en consola
window.showToast = showToast;
window.config = config;

// Arranque de la App
document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards();
  enableValidation(config);
});