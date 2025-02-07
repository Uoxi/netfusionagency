// Mode sombre/clair
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
});

// Chargement dynamique des projets
const portfolioGrid = document.getElementById('portfolio-grid');
const loadMoreButton = document.getElementById('load-more');
let projectsLoaded = 0;

const projects = [
    
];

function loadProjects() {
    const projectsToLoad = projects.slice(projectsLoaded, projectsLoaded + 3);
    projectsToLoad.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('portfolio-item');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        portfolioGrid.appendChild(projectElement);
    });
    projectsLoaded += 3;
    if (projectsLoaded >= projects.length) {
        loadMoreButton.style.display = 'none';
    }
}

loadProjects(); // Charge les premiers projets
loadMoreButton.addEventListener('click', loadProjects);



window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // Ajustez cette valeur selon vos besoins
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function () {
        mainNav.classList.toggle('active'); // Ajoute/retire la classe "active"
    });

    // Fermer le menu lorsqu'un lien est cliqué (optionnel)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });
});

menuToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
    if (mainNav.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Icône de fermeture
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Icône hamburger
    }
});

document.addEventListener('click', function (event) {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Réinitialiser l'icône
    }
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêcher la soumission par défaut

    // Récupérer les données du formulaire
    const formData = new FormData(this);

    // Envoyer les données via Fetch API
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Message envoyé avec succès !');
            this.reset(); // Réinitialiser le formulaire
        } else {
            alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
    });
});



