# 📸 Around the U.S. — Galería Interactiva Responsiva

¡Hola! Soy Juan, y este es mi desarrollo para el proyecto **Around the U.S.** Se trata de una plataforma visual interactiva construida desde cero. Como apasionado por los detalles y el código limpio, enfoqué este sprint en lograr una arquitectura modular casi impecable, un rendimiento veloz y una interfaz de usuario fluida.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![BEM](https://img.shields.io/badge/BEM-Methodology-000000?style=for-the-badge&logo=css3&logoColor=yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git Flow](https://img.shields.io/badge/Git_Flow-Exact_Branches-232F3E?style=for-the-badge&logo=git&logoColor=white)

---

## 🚀 Lo que hace la aplicación (Funcionalidades)

La plataforma permite gestionar la información del usuario en tiempo real sin recargar el navegador:
* **Gestión de Perfil:** Apertura y cierre del popup interactivo para editar el nombre de usuario y su biografía.
* **Sincronización Inteligente:** Al abrir el formulario, este se precarga automáticamente con los datos que ya están visibles en la pantalla.
* **Validación Quirúrgica (UX):** El botón "Guardar" se bloquea y desbloquea dinámicamente. Si dejas los campos vacíos o pones puros espacios en blanco, la app no te dejará enviar datos inválidos.
* **Efectos de Interacción:** Hovers controlados y transiciones suaves en botones de likes, edición y cierre.

---

## 📐 Detalles Técnicos y Arquitectura 
Para mí, que funcione no es suficiente; tiene que ser elegante por dentro. La estructura del código sigue estándares profesionales rigurosos:

* **Modularidad CSS (BEM):** Cada componente (`card`, `popup`, `profile`, `header`, `footer`) vive en su propio archivo independiente dentro de la carpeta `blocks/`. El archivo `index.css` orquesta todo limpiamente por cascada.
* **Optimización de Red:** Configuración avanzada de **fuentes variables** en un solo archivo físico para mitigar peticiones innecesarias al servidor.
* **Validación Segura con JavaScript:** Control absoluto del DOM mediante búsquedas acotadas dentro de nodos específicos (`popup.querySelector`), mejorando el rendimiento de memoria en comparación con búsquedas globales en el documento.

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