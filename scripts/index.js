/* ==========================================================================
   1. CONFIGURACIÓN Y FUENTE DE DATOS
   ========================================================================== */

/**
 * Fuente de datos inicial estática para el renderizado de los componentes de tarjeta.
 * Se mantiene aislada de la lógica de negocio para facilitar futuras integraciones con APIs.
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
 * Objeto de configuración centralizado (Diccionario de la UI).
 * Actúa como la única fuente de verdad para clases y selectores, permitiendo
 * realizar cambios en el HTML sin necesidad de refactorizar la lógica de JavaScript.
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
    inputUrl: '.popup__input_type_url'
  },
  classes: {
    popupOpened: 'popup_opened',
    closeButton: 'popup__close-button',
    likeButtonActive: 'card__like-button_active',
    inactiveButton: 'popup__button_disabled',
    inputError: 'popup__input_type_error',
    errorVisible: 'popup__error_visible',
  },
  settings: {
    placeholderImage: '../images/placeholder.jpg',
  }
};

/* ==========================================================================
   2. NODOS DEL DOM CENTRALIZADOS
   ========================================================================== */

// Contenedores e infraestructura principal del flujo de tarjetas
const cardsContainer = document.querySelector(config.selectors.cardsList);
const cardTemplate = document.querySelector(config.selectors.cardTemplate).content;

// Sección de perfil de usuario
const profileSection = document.querySelector('.profile'); 
const profileName = profileSection.querySelector(config.selectors.profileName);
const profileAbout = profileSection.querySelector(config.selectors.profileAbout);
const buttonEditProfile = profileSection.querySelector(config.selectors.buttonEditProfile);
const buttonAddCard = document.querySelector(config.selectors.buttonAddCard);

// Componentes del Popup de vista previa de imágenes
const popupImage = document.querySelector(config.selectors.popupImage);
const popupPreviewImage = popupImage.querySelector(config.selectors.popupPreviewImage);
const popupPreviewTitle = popupImage.querySelector(config.selectors.popupPreviewTitle);

// Componentes e Inputs del Formulario de Perfil
const popupProfile = document.querySelector(config.selectors.popupProfile);
const formProfile = document.forms[config.selectors.formProfileName];
const inputName = formProfile.querySelector(config.selectors.inputName);
const inputAbout = formProfile.querySelector(config.selectors.inputAbout);

// Componentes e Inputs del Formulario de Tarjetas
const popupAddCard = document.querySelector(config.selectors.popupAddCard);
const formAddCard = document.forms[config.selectors.formAddCardName];
const inputTitle = formAddCard.querySelector(config.selectors.inputTitle);
const inputUrl = formAddCard.querySelector(config.selectors.inputUrl);

/* ==========================================================================
   3. FUNCIONES UTILITARIAS Y DE INTERFAZ (UI)
   ========================================================================== */

/**
 * Abre un panel modal de forma accesible.
 * Activa las escuchas globales de teclado y transfiere el foco al primer elemento interactivo.
 * @param {HTMLElement} modal - El nodo del popup que se desea abrir.
 */
function openPopup(modal) {
  modal.classList.add(config.classes.popupOpened);
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('keydown', handleFocusTrap);
  
  const firstInput = modal.querySelector(config.selectors.formInput);
  if (firstInput) {
    // preventScroll evita desajustes visuales y saltos de layout al enfocar el elemento
    firstInput.focus({ preventScroll: true });
  }
}

/**
 * Cierra un panel modal de forma limpia.
 * Remueve los listeners globales del teclado para mitigar fugas de memoria (Memory Leaks).
 * @param {HTMLElement} modal - El nodo del popup que se desea cerrar.
 */
function closePopup(modal) {
  modal.classList.remove(config.classes.popupOpened);
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('keydown', handleFocusTrap); // CORREGIDO: Cambiado addEventListener por removeEventListener
}

/**
 * Manejador de evento encargado de cerrar el modal activo si se presiona la tecla Escape.
 * @param {KeyboardEvent} evt - Objeto del evento de teclado nativo.
 */
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(`.${config.classes.popupOpened}`);
    if (openedPopup) closePopup(openedPopup);
  }
} 

/**
 * Trampa de Foco Reactiva (Focus Trap).
 * Isole la navegación por tabulador (Tab / Shift+Tab) dentro del modal activo.
 * Filtra dinámicamente elementos deshabilitados para evitar rupturas de flujo.
 * @param {KeyboardEvent} evt - Objeto del evento de teclado nativo.
 */
function handleFocusTrap(evt) {
  if (evt.key !== 'Tab') return;

  const openedPopup = document.querySelector(`.${config.classes.popupOpened}`);
  if (!openedPopup) return;

  // Selectores estrictos para elementos interactivos controlados por nuestra configuración
  const focusableSelectors = [
    config.selectors.formInput,
    config.selectors.submitButton,
    `.${config.classes.closeButton}`
  ].join(', ');
  
  // Extraemos los nodos y filtramos activamente aquellos bloqueados por la API de validación
  const focusableElements = [
    ...openedPopup.querySelectorAll(focusableSelectors)
  ].filter(element => !element.disabled);

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  // Ejecución del bucle de accesibilidad (WCAG Compliance)
  if (evt.shiftKey) { 
    if (document.activeElement === firstElement) {
      lastElement.focus();
      evt.preventDefault(); // Cancela la salida predeterminada del navegador hacia el fondo
    }
  } else { 
    if (document.activeElement === lastElement) {
      firstElement.focus();
      evt.preventDefault(); // Cancela el desvío del foco hacia elementos como el avatar o tarjetas
    }
  }
}

/**
 * Evalúa los estados de validez de una lista de inputs mediante la Constraint Validation API
 * y altera de forma síncrona las propiedades de accesibilidad y diseño del botón de envío.
 * @param {HTMLInputElement[]} inputs - Arreglo de campos a validar.
 * @param {HTMLButtonElement} button - Botón de submit del formulario.
 */
function toggleButtonState(inputs, button) {
  const isFormValid = inputs.every(input => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle(config.classes.inactiveButton, !isFormValid);
}

/**
 * Re-evalúa el estado de validación de un formulario bajo demanda.
 * Útil para ejecuciones síncronas post-apertura o post-reseteo de modales.
 * @param {HTMLElement} popupElement - Contenedor raíz del formulario.
 */
function checkFormValidation(popupElement) {
  const inputList = [...popupElement.querySelectorAll(config.selectors.formInput)];
  const buttonElement = popupElement.querySelector(config.selectors.submitButton);
  if (inputList.length && buttonElement) {
    toggleButtonState(inputList, buttonElement);
    // Al verificar el formulario completo (como al abrir un modal),
    // nos aseguramos de limpiar cualquier rastro de error visual previo.
    const formElement = popupElement.querySelector('form') || popupElement;
    inputList.forEach(input => hideInputError(formElement, input, config));
  }
}
/**
 * Centralizador global para el tratamiento de excepciones de la interfaz.
 * Evita la interrupción del hilo principal de ejecución ante fallos no previstos.
 * @param {Error} error - Objeto del error capturado.
 */
function handleError(error) {
  console.error('Error detectado en la aplicación:', error);
  alert('Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
}

/**
 * Muestra el mensaje de error de un input específico.
 * Modifica las clases del input y del contenedor span de error asociado.
 * @param {HTMLFormElement} formElement - El formulario que contiene los elementos.
 * @param {HTMLInputElement} inputElement - El campo de texto que falló la validación.
 * @param {string} errorMessage - El mensaje textual de error provisto por el navegador.
 * @param {Object} settings - El objeto de configuración centralizado.
 */
function showInputError(formElement, inputElement, errorMessage, settings) {
  // Buscamos el span de error usando el ID del input + el sufijo del estándar de tu HTML
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  if (errorElement) {
    inputElement.classList.add(settings.classes.inputError);
    errorElement.textContent = errorMessage; // Inyecta "Rellena este campo", "Introduce una URL válida", etc.
    errorElement.classList.add(settings.classes.errorVisible);
  }
}

/**
 * Oculta el mensaje de error de un input específico y limpia su estado.
 * @param {HTMLFormElement} formElement - El formulario que contiene los elementos.
 * @param {HTMLInputElement} inputElement - El campo de texto que se desea limpiar.
 * @param {Object} settings - El objeto de configuración centralizado.
 */
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  if (errorElement) {
    inputElement.classList.remove(settings.classes.inputError);
    errorElement.classList.remove(settings.classes.errorVisible);
    errorElement.textContent = ''; // Limpieza de seguridad
  }
}

/**
 * Evalúa la validez de un input individual utilizando la Constraint Validation API
 * y delega la respuesta visual correspondientemente.
 * @param {HTMLFormElement} formElement - El formulario contenedor.
 * @param {HTMLInputElement} inputElement - El input a evaluar.
 * @param {Object} settings - El objeto de configuración centralizado.
 */
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    // Si es inválido, le pasamos el validationMessage nativo del navegador
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

/* ==========================================================================
   4. GENERADORES DE COMPONENTES
   ========================================================================== */

/**
 * Fábrica de componentes de tarjeta (Card Component Factory).
 * Clona la plantilla HTML, inicializa sus elementos y encapsula sus propios eventos.
 * @param {Object} data - Datos de la tarjeta {name, link}.
 * @returns {HTMLElement} El nodo de la tarjeta listo para ser insertado.
 */
function createCard(data) {
  const cardElement = cardTemplate.querySelector(config.selectors.cardElement).cloneNode(true);
  const cardImage = cardElement.querySelector(config.selectors.cardImage);
  const cardTitle = cardElement.querySelector(config.selectors.cardTitle);
  const likeButton = cardElement.querySelector(config.selectors.cardLikeButton);
  const deleteButton = cardElement.querySelector(config.selectors.cardDeleteButton);

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = `Fotografía de ${data.name}`;

  // Evento local: Apertura de la vista previa de la imagen
  cardImage.addEventListener('click', () => {
    popupPreviewImage.src = data.link;
    popupPreviewImage.alt = `Fotografía de ${data.name}`;
    popupPreviewTitle.textContent = data.name;
    openPopup(popupImage);
  });

  // Manejo elegante de fallos de red (Imágenes caídas o rotas)
  cardImage.addEventListener('error', () => {
    cardImage.src = config.settings.placeholderImage;
  });

  // Evento local: Reacción de Me Gusta
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle(config.classes.likeButtonActive);
  });

  // Evento local: Eliminación explícita del nodo y liberación automática de sus listeners
  deleteButton.addEventListener('click', () => cardElement.remove());

  return cardElement;
}

/**
 * Renderiza la colección inicial de tarjetas provista por la base de datos de configuración.
 */
function renderInitialCards() {
  initialCards.forEach(cardData => cardsContainer.append(createCard(cardData)));
}

/* ==========================================================================
   5. MANEJADORES DE FORMULARIOS (SOLID - Single Responsibility)
   ========================================================================== */

/**
 * Procesa la actualización de los datos del perfil del usuario.
 * Controla el UX Lock para mitigar envíos duplicados durante ejecuciones asíncronas.
 * @param {Event} evt - Evento de submit del formulario.
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const submitButton = formProfile.querySelector(config.selectors.submitButton);
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = 'Guardando...';

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

/**
 * Procesa la creación e inserción de una nueva tarjeta en el flujo principal.
 * Restablece el estado de los campos de entrada y del botón de envío tras finalizar con éxito.
 * @param {Event} evt - Evento de submit del formulario.
 */
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = formAddCard.querySelector(config.selectors.submitButton);
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = 'Guardando...';

  try {
    const newCardData = {
      name: inputTitle.value,
      link: inputUrl.value
    };

    cardsContainer.prepend(createCard(newCardData));
    closePopup(popupAddCard);
    
    formAddCard.reset();
    checkFormValidation(formAddCard); // Bloquea el botón post-reset por los requerimientos del HTML
  } catch (error) {
    handleError(error);
  } finally {
    submitButton.textContent = originalText;
  }
}

/* ==========================================================================
   6. VALIDACIÓN AUTOMATIZADA E INFRAESTRUCTURA
   ========================================================================== */

/**
 * Punto de entrada global de la infraestructura de validación de la aplicación.
 * Busca todos los formularios y les inyecta los escuchas reactivos de validación.
 * @param {Object} settings - El objeto de configuración de la app.
 */
function enableValidation(settings) {
  const formList = [...document.querySelectorAll('form')];
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

/**
 * Asigna los oyentes de eventos a los inputs de un formulario específico.
 * Evalúa el estado del botón en tiempo real ante la entrada de datos.
 * @param {HTMLFormElement} formElement - Nodo del formulario.
 * @param {Object} settings - El objeto de configuración de la app.
 */
function setEventListeners(formElement, settings) {
  const inputList = [...formElement.querySelectorAll(settings.selectors.formInput)];
  const buttonElement = formElement.querySelector(settings.selectors.submitButton);

  if (!buttonElement) return;

  toggleButtonState(inputList, buttonElement);

  formElement.addEventListener('input', (evt) => {
    if (evt.target.classList.contains(settings.selectors.formInput.replace('.', ''))) {
  checkInputValidity(formElement, evt.target, settings); //Valida el input en tiempo real
    }
    toggleButtonState(inputList, buttonElement);
  });
}

/* ==========================================================================
   7. EVENT LISTENERS GLOBALES E INICIALIZACIÓN
   ========================================================================== */

// Interacciones de Apertura de Modales
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

// Arquitectura de Delegación de Eventos para Cierre de Modales (Mousedown)
document.addEventListener('mousedown', (evt) => {
  const target = evt.target;
  if (target.classList.contains(config.classes.popupOpened)) {
    closePopup(target);
  } else if (target.classList.contains(config.classes.closeButton)) {
    closePopup(target.closest(config.selectors.popupElement));
  }
});

// Enlace directo de los disparadores de envío (Submit Handlers)
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// Inicialización controlada de la aplicación una vez construido el árbol del DOM
document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards();
  enableValidation(config);
});