"use strict";

// Utilidades para validar y procesar correos

// Expresión regular para validar formato de correo que termine con letras
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;

// Convierte distintos tipos de entrada a texto plano
function toText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value.textContent === "string") return value.textContent.trim();
  return String(value).trim();
}

// Determina si un correo es válido
function esCorreoValido(value) {
  const texto = toText(value);
  return EMAIL_REGEX.test(texto);
}

// Determina si un correo es inválido
function esCorreoInvalido(value) {
  return !esCorreoValido(value);
}

// Obtiene los candidatos desde los elementos <li>
function obtenerCandidatos() {
  const nodos = document.querySelectorAll("li");
  return Array.from(nodos).map(toText);
}

// Renderiza la lista de correos inválidos en el elemento de salida
function renderizarInvalidos(invalidos, selectorSalida = ".output") {
  const salida = document.querySelector(selectorSalida);
  if (!salida) {
    console.warn(`Elemento "${selectorSalida}" no encontrado; no se puede mostrar la salida.`);
    return;
  }
  if (!invalidos.length) {
    // Sin inválidos, no añadimos contenido; limpiar si se desea
    // salida.textContent = "";
    return;
  }
  salida.insertAdjacentText("afterbegin", invalidos.join(" * "));
}

// Flujo principal autosuficiente para evitar fugas al ámbito global
(function main() {
  const candidatos = obtenerCandidatos();

  // Log de depuración: valor y si es inválido
  candidatos.forEach((valor) => console.log(valor, esCorreoInvalido(valor)));

  const invalidos = candidatos.filter(esCorreoInvalido);

  // Muestra el array de correos inválidos en consola
  console.log(invalidos);

  // Inserta en el elemento de salida
  renderizarInvalidos(invalidos);
})();

