# 📸 Around the U.S. — Galería Interactiva Responsiva


¡Hola! Soy Juan, y este es mi desarrollo para el proyecto **Around the U.S.** Se trata de una plataforma visual interactiva construida desde cero. Como apasionado por los detalles y el código limpio, enfoqué este sprint en eliminar redundancias lógicas, centralizar la validación y optimizar la gestión de eventos en el DOM.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![BEM](https://img.shields.io/badge/BEM-Methodology-000000?style=for-the-badge&logo=css3&logoColor=yellow)
![Git Flow](https://img.shields.io/badge/Git_Flow-Exact_Branches-232F3E?style=for-the-badge&logo=git&logoColor=white)

---

## 🛡️ Mejoras Técnicas, Seguridad y Arquitectura

### Este sprint se centró en elevar la robustez de la aplicación mediante implementaciones críticas:

- **Validación de Seguridad Anti-XSS:** Se implementó una verificación estricta de protocolos en los campos de URL utilizando la API URL de JavaScript. Esto bloquea proactivamente intentos de inyección maliciosa (como protocolos javascript: o data:), asegurando que solo enlaces seguros sean procesados.

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