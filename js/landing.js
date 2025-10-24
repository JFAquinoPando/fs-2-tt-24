const urlImagen = "https://i.ytimg.com/vi/G6Wj_okoujU/hqdefault.jpg"
const resultado = await fetch(urlImagen)


document.getElementById('toggle-dark').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
});

if (resultado.status === 200 || resultado.status === 304) {
    document.querySelector(".about-image")
    .insertAdjacentHTML("afterbegin", 
        `<img class="img-full" src='${urlImagen}'>`);    
}

