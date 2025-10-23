# Resumen de Refactorización y Mejoras

Este documento resume los cambios realizados en la página `landing.html` para mejorar la estructura del código y la funcionalidad del modo oscuro.

## 1. Refactorización de Código

Con el objetivo de seguir las buenas prácticas de desarrollo web, se separaron las responsabilidades del código de la siguiente manera:

-   **CSS Externo**: Todo el código CSS que se encontraba dentro de una etiqueta `<style>` en `landing.html` fue extraído y movido a un nuevo archivo: `css/style.css`.
-   **JavaScript Externo**: El código JavaScript, responsable de la funcionalidad del botón de modo oscuro, fue movido de una etiqueta `<script>` a su propio archivo: `js/landing.js`.
-   **Actualización del HTML**: El archivo `landing.html` fue modificado para eliminar el código CSS y JavaScript en línea. En su lugar, se agregaron los enlaces correspondientes para cargar los nuevos archivos `css/style.css` y `js/landing.js`.

Esta separación mejora la mantenibilidad, legibilidad y rendimiento del sitio, ya que permite que los navegadores almacenen en caché los archivos CSS y JS de forma independiente.

## 2. Corrección del Modo Oscuro

La funcionalidad del modo oscuro no se aplicaba correctamente a todos los elementos de la página. Se realizaron las siguientes mejoras:

-   **Selectores CSS Corregidos**: Se ajustaron los selectores CSS para que dependieran de la clase `.dark-mode` en la etiqueta `<body>`, asegurando que los estilos se apliquen de manera global y correcta.
-   **Estilos Completos**: Se añadieron nuevos estilos para garantizar que todos los componentes (fondos de secciones, tarjetas, textos, etc.) cambien de apariencia adecuadamente al activar el modo oscuro.
-   **Consistencia Visual**: Gracias a estas correcciones, la experiencia de usuario en modo oscuro ahora es visualmente coherente y agradable en toda la página.
