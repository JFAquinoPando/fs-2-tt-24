// Función para validar si un correo electrónico es válido
function validarCorreo(correo) {
    // Expresión regular para validar formato de correo y que termine con letras
    const regex = /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
    // Retorna true si el correo es inválido, false si es válido
    return !regex.test(correo);
}

// Selecciona todos los elementos <li> del documento
const correos = document.querySelectorAll("li")
// Convierte la NodeList en un array
const correosIterar = Array.from(correos)
// Agrega valores no HTML para probar la validación
correosIterar.push(false)
correosIterar.push(1234545454)

// Selecciona el elemento con la clase 'output' para mostrar resultados
const salida = document.querySelector(".output")

// Filtra los correos inválidos
const resultado = correosIterar.filter(correo => {
    // Si es un elemento HTML, toma su texto; si no, usa el valor directamente
    let valor = correo && correo.textContent !== undefined ? correo.textContent : correo;
    // Muestra en consola el valor y si es válido o no
    console.log(valor, validarCorreo(valor));
    // Devuelve true si el correo es inválido
    return validarCorreo(valor);
}).map(e => e && e.textContent !== undefined ? e.textContent : e);

// Muestra el array de correos inválidos en consola
console.log(resultado);
// Inserta los correos inválidos en el elemento de salida, separados por " * "
salida.insertAdjacentText("afterbegin", resultado.join(" * "))



