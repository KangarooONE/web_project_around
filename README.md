# 📸 Around the U.S. — Galería Interactiva Responsiva


¡Hola! Soy Juan, y este es mi desarrollo para el proyecto **Around the U.S.** Se trata de una plataforma visual interactiva construida desde cero. Como apasionado por los detalles y el código limpio, enfoqué este sprint en eliminar redundancias lógicas, centralizar la validación y optimizar la gestión de eventos en el DOM.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![BEM](https://img.shields.io/badge/BEM-Methodology-000000?style=for-the-badge&logo=css3&logoColor=yellow)
![Git Flow](https://img.shields.io/badge/Git_Flow-Exact_Branches-232F3E?style=for-the-badge&logo=git&logoColor=white)

---

## 🚀 Funcionalidades

La plataforma permite gestionar una galería dinámica de imágenes y la información del usuario en tiempo real:
* **Gestión de Perfil:** Edición interactiva de nombre y biografía con precarga automática de datos existentes al abrir el formulario.
* **Galería Interactiva:** Renderizado inicial de tarjetas, capacidad para añadir nuevas ubicaciones al vuelo, dar "like" a tus favoritas o eliminarlas de la interfaz de usuario.
* **Popup de Vista Previa:** Visualización ampliada de imágenes con pie de foto dinámico de forma fluida.
* **Validación Avanzada (UX):** Bloqueo y desbloqueo del botón de guardado en tiempo real frente a campos vacíos o cadenas de texto compuestas únicamente por espacios.

---

## 📐 Detalles Técnicos y Arquitectura (Mejoras del Sprint)

Hacer que funcione no es suficiente; el código debe ser mantenible y eficiente. En este sprint se implementaron mejoras críticas bajo estándares profesionales:

* **Unificación de Validación (DRY):** Se eliminó la dispersión lógica mediante el centralizador `checkFormValidation()`. El estado de los botones de envío se sincroniza bajo el mismo canal automatizado, tanto en la escucha pasiva de inputs como en el momento exacto en que se inicializa o resetea un modal.
* **Cierre Eficiente de Modales (Burbujeo Optimizado):** Se refactorizó la escucha global de clics mediante un árbol de decisiones límpio en `mousedown`. Si el usuario hace clic en el overlay (fondo negro), `evt.target` se gestiona directamente eliminando consultas redundantes de escalado (`.closest()`) en el DOM, reservándolo exclusivamente para los botones específicos de cierre.
* **Modularidad CSS (BEM):** Cada componente (`card`, `popup`, `profile`, `header`, `footer`) vive en su propio archivo independiente dentro de la carpeta `blocks/`.
* **Manejo de Errores Nativo:** Integración de escuchas `onerror` en el renderizado de imágenes para sustituir enlaces caídos o rotos con un *placeholder* seguro, evitando rupturas estéticas en la UI.

## 📐 Detalles Técnicos, Arquitectura y Estándares Metodológicos

Este desarrollo se rige bajo rigurosos estándares de la industria y especificaciones modernas:

* **Especificación ECMAScript 6+ (ES6+):** Uso estricto de scope moderno (`const`/`let`), funciones flecha para el control del contexto léxico de `this`, y métodos declarativos de arrays (`.forEach()`, `.every()`) para una lógica más limpia, legible y alineada al paradigma funcional.
* **Metodología BEM (Block, Element, Modifier):** Arquitectura CSS estructurada internacionalmente bajo el estándar de nomenclatura de bloques (`.popup`), elementos (`.popup__container`) y modificadores (`.popup_opened`). Esto garantiza un aislamiento total de estilos, previniendo colisiones en la cascada y facilitando la reutilización de componentes.
* **Enfoque Responsive Mobile-First:** Maquetación adaptativa estructurada desde la base para dispositivos móviles pequeños, aplicando los cambios de escala para pantallas de escritorio mediante Media Queries masivos (`@media (min-width: 1024px)`). Esto reduce la carga de procesamiento del navegador en pantallas móviles al evitar la sobreescritura de reglas pesadas.
* **Principio DRY (Don't Repeat Yourself):** Centralización absoluta de selectores y clases en un objeto de configuración (`config`) al inicio del script. Esto desacopla la lógica de JS del marcado HTML, estableciendo una "única fuente de verdad" y simplificando mantenimientos futuros.
* **Unificación de Validación Dinámica:** Eliminación de redundancias lógicas mediante el centralizador `checkFormValidation()`. El estado de los botones de envío se sincroniza bajo el mismo canal automatizado, tanto en la escucha pasiva de inputs como en el momento exacto en que se inicializa o resetea un modal.
* **Cierre Eficiente de Modales (Burbujeo Optimizado):** Refactorización de la escucha global de clics mediante un árbol de decisiones limpio en `mousedown`. Si el usuario hace clic en el overlay (fondo negro), `evt.target` se gestiona directamente eliminando consultas redundantes de escalado (`.closest()`) en el DOM, reservándolo exclusivamente para los botones específicos de cierre.
* **Manejo de Errores Nativo:** Integración de escuchas `onerror` en el renderizado de imágenes para sustituir enlaces caídos o rotos con un *placeholder* seguro, evitando rupturas estéticas en la UI.
---

## 📁 Estructura Limpia del Directorio

```text
📁 Proyecto
│
├── 📁 blocks/          # Estilos modulares puros bajo metodología BEM
│
├── 📁 pages/           # Punto de entrada de estilos globales (index.css)
│
├── 📁 scripts/         # Lógica interactiva en Vanilla JavaScript (index.js)
│
├── 📁 vendor/          # Dependencias y recursos externos (Normalize.css, Fonts)
│
├── 📁 images/          # Assets optimizados (iconos SVGs, fotos de UI)
│
├── 📄 index.html       # Estructura semántica accesible con atributos ARIA
└── 📄 README.md        # Documentación técnica
```
📦 **Mantenido y desarrollado por Juan Delgado** _Proyecto educativo de código abierto enfocado en las buenas prácticas de UI/UX y optimización web._

##Github Pages

https://github.com/KangarooONE/web_project_around
