# 📸 Around the U.S. — Galería Interactiva Responsiva


¡Hola! Soy Juan, y este es mi desarrollo para el proyecto **Around the U.S.** Se trata de una plataforma visual interactiva construida desde cero. Como apasionado por los detalles y el código limpio, enfoqué este sprint en eliminar redundancias lógicas, centralizar la validación y optimizar la gestión de eventos en el DOM.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![BEM](https://img.shields.io/badge/BEM-Methodology-000000?style=for-the-badge&logo=css3&logoColor=yellow)
![Git Flow](https://img.shields.io/badge/Git_Flow-Exact_Branches-232F3E?style=for-the-badge&logo=git&logoColor=white)

---

## 🌟 Estándares de Calidad y Calidad de Vida (DX)

* **Accesibilidad (a11y):** Implementación de semántica HTML5 y navegación mediante teclado (tecla `Esc` para cierre de modales y gestión de foco) para cumplir con una experiencia inclusiva.
* **Arquitectura Escalable:** El proyecto utiliza **BEM** como metodología de nomenclatura, garantizando que el CSS sea modular, predecible y fácil de mantener a medida que la aplicación crece.
* **Performance:** Optimización del flujo de carga y manejo de eventos mediante delegación, minimizando la carga en el DOM y asegurando una respuesta inmediata ante interacciones.
* **Git Flow:** Desarrollo estructurado mediante ramas, garantizando un historial de commits limpio y un despliegue seguro a través de GitHub Pages.

## 🏗️ Fundamentos de Arquitectura y Buenas Prácticas

### Más allá de la funcionalidad, el proyecto prioriza la calidad del código mediante prácticas que garantizan un desarrollo profesional:

- #### **Metodología BEM (Block, Element, Modifier):** La arquitectura CSS sigue el estándar internacional de nomenclatura (ej. .popup__container). Esto permite aislar estilos, prevenir colisiones en la cascada y facilita la reutilización de componentes de forma modular.

- #### **Organización Modular:** El proyecto está estructurado para ser escalable, separando los estilos (blocks/), la lógica interactiva (scripts/) y los activos, lo que facilita el mantenimiento a largo plazo.

- #### **Validación de Datos en Tiempo Real:** El sitio incluye un sistema de validación dinámica que guía al usuario. Los botones de guardado responden instantáneamente a la integridad de los campos, evitando errores de usuario mediante un feedback claro y preventivo.

## 🛡️ Mejoras Técnicas, Seguridad y Arquitectura

### Este sprint se centró en elevar la robustez de la aplicación mediante implementaciones críticas:

- **Validación de Seguridad Anti-XSS:** Se implementó una verificación estricta de protocolos en los campos de URL utilizando la API URL de JavaScript. Esto bloquea proactivamente intentos de inyección maliciosa **(como protocolos javascript: o data:)**, asegurando que solo enlaces seguros sean procesados.

- **Gestión Segura de Interfaz (Toasts):** Se reemplazó el tradicional alert() por un componente Toast moderno inyectado dinámicamente. El contenido se procesa mediante textContent para prevenir cualquier tipo de inyección de código y se gestiona su ciclo de vida para evitar fugas de memoria.

- **Animaciones Fluidas y Estables:** Se eliminó el uso de display: none en las transiciones de los popups, sustituyéndolo por una combinación de opacity y visibility. Esto permite que el navegador ejecute los efectos de entrada y salida de forma nativa, suave y sin saltos visuales en el layout.

- **Arquitectura de Eventos y Accesibilidad:** Se implementó una trampa de foco (Focus Trap) y una gestión eficiente de los event listeners. Esto asegura una navegación por teclado accesible y evita errores de ejecución al limpiar correctamente los recursos tras el cierre de cada modal.

- **Principio DRY (Don't Repeat Yourself):** Centralización absoluta de selectores y configuraciones en un objeto único, desacoplando la lógica de JavaScript del marcado HTML y garantizando un mantenimiento escalable.


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

## Github Pages
[https://github.com/KangarooONE/web_project_around](https://github.com/KangarooONE/web_project_around)
