/**
 * Fonction pour inclure un fichier HTML dans un élément spécifique de la page
 * @param {string} file - Le fichier HTML à charger
 * @param {string} elementId - L'ID de l'élément dans lequel charger le fichier
 */
async function includeHTML(file, elementId) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Erreur de chargement : ${file}`);
        
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;

        // Vérifier si le header est chargé, puis appliquer l'effet de scroll
        if (elementId === 'header') {
            console.log("✔ Header chargé dynamiquement");
            applyActiveClass();
            setupHeaderScroll(); // Initialiser l'animation du header après le chargement 
        }
    } catch (error) {
        console.error(error);
    }
}

// Chargement du header et du footer dynamiquement sur chaque page
document.addEventListener("DOMContentLoaded", function () {
    includeHTML('header.html', 'header');
    includeHTML('footer.html', 'footer');
});

/**
 * Fonction qui applique la classe "active" au lien correspondant à la page actuelle
 */
function applyActiveClass() {
    let links = document.querySelectorAll("nav ul li a, .contact a"); // Inclut aussi le bouton "Contact"
    let currentPage = window.location.pathname.split("/").pop(); // Récupère le fichier actuel (ex: "contact.html")

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Ajoute la classe active au lien correspondant
        }
    });
}

/**
 * Fonction qui anime le header au scroll (rétrécissement et suppression de la bordure)
 */
function setupHeaderScroll() {
    console.log("🔄 Initialisation du scroll header...");

    const checkHeaderLoaded = setInterval(() => {
        const header = document.querySelector("header");
        const headerBorder = document.querySelector(".header-border"); // Sélection de la bordure

        if (header) {
            clearInterval(checkHeaderLoaded); // Arrête la vérification une fois le header chargé
            console.log("✔ Header trouvé, activation du scroll");

            function updateHeader() {
                const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
                
                if (!isScrollable) {
                    console.log("📏 Page trop courte, le header reste grand");
                    header.classList.remove("scrolled");
                    if (headerBorder) headerBorder.style.display = 'block'; // Ré-affiche la bordure si page courte
                    return;
                }

                if (window.scrollY > 50) {
                    console.log("🔽 Scroll détecté, réduction du header et suppression de la bordure");
                    header.classList.add("scrolled");
                    if (headerBorder) headerBorder.style.display = 'none'; // Cache la bordure
                } else {
                    console.log("🔼 Scroll en haut, header en grand");
                    header.classList.remove("scrolled");
                    if (headerBorder) headerBorder.style.display = 'block'; // Ré-affiche la bordure
                }
            }

            // Appliquer au scroll
            window.addEventListener("scroll", updateHeader);
            
            // Vérifier au chargement
            updateHeader();
        }
    }, 100);
}

// Toggle menu mobile
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("main-nav");
  
    if (burger && nav) {
      burger.addEventListener("click", () => {
        nav.classList.toggle("active");
      });
    }
  });
  
  
  

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // ne réanime qu'une fois
        }
      });
    }, {
      threshold: 0.2
    });
  
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  });
  

document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".circle");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const percent = parseInt(circle.dataset.percent, 10);
          const progress = circle.querySelector(".progress");
          const offset = 283 - (283 * percent) / 100;
          progress.style.strokeDashoffset = offset;
          observer.unobserve(circle); // ne réanime pas à chaque scroll
        }
      });
    }, { threshold: 0.4 });
  
    circles.forEach(circle => {
      observer.observe(circle);
    });
  });
  
