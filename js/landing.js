        const btnDark = document.getElementById('toggle-dark');
        btnDark.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            btnDark.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
        });