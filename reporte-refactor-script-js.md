# Reporte de Refactorización: `js/script.js`

## Resumen

Se refactorizó por completo `js/script.js` para mejorar legibilidad, modularidad y robustez, sin cambiar el comportamiento principal: detectar correos inválidos listados en elementos `li` del DOM y mostrarlos en el contenedor `.output` separados por ` * `.

## Motivaciones

- Evitar fugas al ámbito global y efectos colaterales.
- Separar responsabilidades (parseo, validación, renderizado).
- Manejar entradas heterogéneas (nodos, strings, otros) de forma segura.
- Facilitar pruebas y mantenimiento con funciones puras y nombres descriptivos.

## Cambios Realizados

1. Encapsulación del flujo en una IIFE para evitar variables globales.
2. Activación de `"use strict"` para un JS más seguro y predecible.
3. Extracción de la expresión regular a una constante reutilizable `EMAIL_REGEX`.
4. Nuevas utilidades y funciones puras:
   - `toText(value)`: Normaliza cualquier entrada a texto (nulos, strings, nodos, números, booleanos), aplicando `trim()`.
   - `esCorreoValido(value)`: Valida con `EMAIL_REGEX`.
   - `esCorreoInvalido(value)`: Negación de la anterior.
   - `obtenerCandidatos()`: Lee todos los `li` y obtiene sus textos ya normalizados.
   - `renderizarInvalidos(invalidos, selectorSalida = ".output")`: Inserta los inválidos en la salida con el formato esperado, advirtiendo si falta el contenedor.
5. Flujo principal claro: obtener candidatos → loguear estado → filtrar inválidos → renderizar.
6. Manejo robusto cuando `.output` no existe: se muestra `console.warn` en lugar de fallar.
7. Eliminación de la inyección de valores de prueba (`false`, `1234545454`) en el arreglo de correos.
8. Nombres de funciones y constantes descriptivos y consistentes en español.

## Diferencias vs. versión anterior

- Conservado:
  - Validación de formato de correo electrónico y listado de inválidos.
  - Inserción en `.output` con separador ` * `.
  - Registro en consola de cada valor con su estado (inválido) y del arreglo final.

- Cambios sutiles y mejoras:
  - Ya no se agregan valores de prueba (p. ej., `false`, `1234545454`) al conjunto a validar.
  - Si no existen inválidos, no se inserta texto en `.output` (antes podía insertarse una cadena vacía).
  - Se aplica `trim()` a los textos, reduciendo falsos negativos por espacios.
  - Se toleran entradas no-string mediante `toText`, evitando errores en consola.
  - Se evita contaminar el ámbito global con variables y funciones.

## Fragmentos relevantes (nueva versión)

```js
"use strict";
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;

function toText(value) { /* … */ }
function esCorreoValido(value) { /* … */ }
function esCorreoInvalido(value) { /* … */ }
function obtenerCandidatos() { /* … */ }
function renderizarInvalidos(invalidos, selectorSalida = ".output") { /* … */ }

(function main() {
  const candidatos = obtenerCandidatos();
  candidatos.forEach(v => console.log(v, esCorreoInvalido(v)));
  const invalidos = candidatos.filter(esCorreoInvalido);
  console.log(invalidos);
  renderizarInvalidos(invalidos);
})();
```

Archivo: `js/script.js`:1

## Consideraciones de Compatibilidad

- La salida visual no cambia salvo que ahora se omite la inserción cuando no hay inválidos.
- Si algún flujo dependía de los valores de prueba agregados al arreglo, ya no estarán presentes.
- La validación sigue una expresión regular estándar para dominios con TLD alfabéticos (`{2,}`).

## Cómo Validar

1. Abrir la página que carga `js/script.js`.
2. Asegurar que existan elementos `li` con correos válidos e inválidos.
3. Verificar en la consola:
   - Cada valor y su estado (true = inválido) se imprime línea a línea.
   - Se imprime el arreglo final de correos inválidos.
4. Verificar en el DOM:
   - En el contenedor `.output` se insertan los correos inválidos separados por ` * `.

## Próximos Pasos (Opcionales)

- Añadir un “modo depuración” para inyectar datos de prueba bajo una bandera, sin tocar producción.
- Internacionalización de mensajes de `console.warn` si se requiere.
- Tests unitarios básicos para `toText` y validación de `EMAIL_REGEX`.

