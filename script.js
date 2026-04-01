document.addEventListener('DOMContentLoaded', function() {

    // Mise en évidence du lien de navigation actif
    const navLinks = document.querySelectorAll('nav ul li a');
    // Récupération du nom du fichier de la page courante
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // On compare l'attribut href du lien et le nom du fichier courant
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Validation basique du formulaire de contact (si présent)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Tous les champs sont requis.');
            }
        });
    }
});
