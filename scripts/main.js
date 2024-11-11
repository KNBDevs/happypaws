window.onload = function () {
    console.log("Window Loaded - Inicializando mapa y configurando 'About Us'");

    initializeMap();
    initializeHamburgerMenu();
    initializeStickyHeader();
    initializeMainSlider();
    initializeAboutUsTabs();
    initializeIconHoverEffect();
    initializeTeamRSSHoverEffect();
    initializeClientsSlider();
    initializeOffersSlider();
    initializeFAQSection();  
    initializeAdoptCarousel();
    initializeColorSelectorPanel(); 
};

// FUNCION MAPA LOCALIZACION LEAFLET
function initializeMap() {
    const mapContainer = document.getElementById("map");
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('map').setView([40.7382422317298, -74.00887762461242], 20);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const largeIcon = L.icon({
            iconUrl: '/img/mapmarker.png',
            iconSize: [80, 82],
            iconAnchor: [25, 82],
            popupAnchor: [0, -76]
        });
        L.marker([40.7382422317298, -74.00887762461242], { icon: largeIcon }).addTo(map)
            .openPopup();
        console.log("Mapa inicializado exitosamente");
    } else {
        console.error("No se encontró el contenedor del mapa o Leaflet no está definido.");
    }
}





// FUNCION BURGUER MENU RESPONSIVE
function initializeHamburgerMenu() {
    function createHamburgerMenu() {
        if (!document.querySelector('.hamburger-container')) {
            const hamburgerContainer = document.createElement('div');
            hamburgerContainer.classList.add('hamburger-container');
            const hamburgerMenu = document.createElement('div');
            hamburgerMenu.classList.add('hamburger-menu');
            hamburgerMenu.innerHTML = '<div></div><div></div><div></div>';

            // Anidar el menú hamburguesa
            hamburgerContainer.appendChild(hamburgerMenu);
            document.querySelector('.main-bar').appendChild(hamburgerContainer);

            if (!document.querySelector('.dropdown-menu')) {
                const dropdownMenu = document.createElement('ul');
                dropdownMenu.classList.add('dropdown-menu');
                dropdownMenu.innerHTML = `
                    <li><a href="">Home</a></li>
                    <li><a href="">Services</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Prices</a></li>
                    <li><a href="">Gallery</a></li>
                    <li><a href="">Offers</a></li>
                    <li><a href="">Adoption</a></li>
                    <li><a href="">Contact</a></li>
                `;
                document.querySelector('.main-bar').appendChild(dropdownMenu);
            }

            hamburgerContainer.addEventListener('click', () => {
                document.querySelector('.dropdown-menu').classList.toggle('show');
            });
        }
    }

    function removeHamburgerMenu() {
        const hamburgerContainer = document.querySelector('.hamburger-container');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (hamburgerContainer) hamburgerContainer.remove();
        if (dropdownMenu) dropdownMenu.remove();
    }

    // Menu hamburguesa para pantallas de menos 768 px
    function handleMenuDisplay() {
        if (window.innerWidth <= 768) {
            createHamburgerMenu();
        } else {
            removeHamburgerMenu();
        }
    }

    handleMenuDisplay();

    window.addEventListener('resize', handleMenuDisplay);
}

initializeHamburgerMenu();






// DESPLAZAMIENTO HEADER STICKY
function initializeStickyHeader() {
    const orangeBar = document.querySelector('.orange-bar');
    const mainNavbar = document.querySelector('.main-bar-sticky');
    const orangeBarHeight = orangeBar.offsetHeight;
    const originalNavbarHeight = mainNavbar.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            orangeBar.classList.add('hidden');
            mainNavbar.style.transform = `translateY(-${orangeBarHeight}px)`;
            mainNavbar.style.height = `${originalNavbarHeight - orangeBarHeight}px`;
        } else {
            orangeBar.classList.remove('hidden');
            mainNavbar.style.transform = 'translateY(0)';
            mainNavbar.style.height = `${originalNavbarHeight}px`;
        }
    });
}




// FUNCION MAIN SLIDER

function initializeMainSlider() {
    const slides = document.querySelector('.slides');
    const bulletsBox = document.querySelectorAll('.bullet');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        bulletsBox.forEach(bullet => bullet.classList.remove('activeBullet'));
        bulletsBox[index].classList.add('activeBullet');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % bulletsBox.length;
        showSlide(currentIndex);
    }

    function setMobileSettings() {
        clearInterval(interval); 
        interval = setInterval(nextSlide, 5000);         
    }

    function setDesktopSettings() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 3000);
    }

    function updateSettings() {
        if (window.innerWidth <= 768) {
            setMobileSettings();
        } else {
            setDesktopSettings();
        }
    }

    bulletsBox.forEach(bullet => {
        bullet.addEventListener('click', () => {
            currentIndex = parseInt(bullet.getAttribute('slide-position'));
            showSlide(currentIndex);
        });
    });

    updateSettings();
    window.addEventListener('resize', updateSettings);
}

initializeMainSlider();






// FUNCION CAMBIO CONTENEDOR ABOUT-US
function initializeAboutUsTabs() {
    const tabs = {
        about_us_clinic: document.getElementById('about_us_clinic'),
        about_us_phylosophy: document.getElementById('about_us_phylosophy'),
        about_us_team: document.getElementById('about_us_team')
    };

    const contents = {
        about_us_clinic: document.getElementById("content-clinic"),
        about_us_phylosophy: document.getElementById("content-phylosophy"),
        about_us_team: document.getElementById("content-team")
    };

    Object.keys(tabs).forEach(tab => {
        tabs[tab].addEventListener('click', () => showContent(tab));
    });

    function showContent(selectedTab) {
        Object.keys(contents).forEach(content => {
            tabs[content].classList.remove("selected");
            contents[content].classList.add("hide-position");
            contents[content].classList.remove("active");
        });

        tabs[selectedTab].classList.add("selected");
        contents[selectedTab].classList.add("active");
        contents[selectedTab].classList.remove("hide-position");
    }
}

// About-Services cambio de imagen en hover
function initializeIconHoverEffect() {
    const iconContainers = document.querySelectorAll('.icon-circle-container');
    iconContainers.forEach(container => {
        const img = container.querySelector('img');
        const originalSrc = img.getAttribute('data-original');
        const hoverSrc = img.getAttribute('data-hover');
        container.addEventListener('mouseenter', () => { img.src = hoverSrc; });
        container.addEventListener('mouseleave', () => { img.src = originalSrc; });
    });
}

// Our-Team About Us, cambio imagen icono rss
function initializeTeamRSSHoverEffect() {
    document.querySelectorAll('.rss-icon-container').forEach(container => {
        const img = container.querySelector('img');
        const originalSrc = img.src;
        const hoverSrc = originalSrc.replace('-orange', '-white');

        container.addEventListener('mouseenter', () => { img.src = hoverSrc; });
        container.addEventListener('mouseleave', () => { img.src = originalSrc; });
    });
}




// FUNCION SLIDER OPINION CLIENTS
function initializeClientsSlider() {
    const slider = document.querySelector('.opinion-slider');
    const containers = document.querySelectorAll('.opinion-container');
    const bullets = document.querySelectorAll('.client-bullet');
    let index = 0;
    let intervalDuration = 3000;
    let slideInterval;

    if (!slider || containers.length === 0 || bullets.length === 0) {
        console.error("Error: No se encontraron elementos para el slider de clientes.");
        return;
    }

    function slideTo(newIndex) {
        const containerWidth = slider.offsetWidth;
        slider.style.transition = `transform 0.5s ease`;
        slider.style.transform = `translateX(-${newIndex * containerWidth}px)`;
        updateActiveBullet(newIndex);
    }

    function updateActiveBullet(activeIndex) {
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === activeIndex);
        });
    }

    function slideOpinions() {
        index = (index + 1) % containers.length;
        slideTo(index);
    }

    bullets.forEach((bullet, i) => {
        bullet.addEventListener('click', () => {
            clearInterval(slideInterval);
            index = i;
            slideTo(index);
            slideInterval = setInterval(slideOpinions, intervalDuration);
        });
    });

    slideInterval = setInterval(slideOpinions, intervalDuration);
}



// FUNCION FAQ DESPLIEGUE RESPUESTAS
function initializeFAQSection() {
    const faqItems = document.querySelectorAll('.faq-item');
    let activeItem = null;

    faqItems.forEach(item => {
        const questionWrapper = item.querySelector('.question-wrapper');
        const answer = item.querySelector('.answer');
        const arrowIcon = item.querySelector('.arrow-icon');
        answer.style.height = "0";

        questionWrapper.addEventListener('click', () => {
            // Cierra el ítem activo anterior si hay uno
            if (activeItem && activeItem !== item) {
                activeItem.querySelector('.answer').style.height = "0";
                activeItem.querySelector('.arrow-icon').style.transform = "rotate(0deg)";
                activeItem.classList.remove('open');
            }

            // Expande o colapsa el actual
            if (answer.style.height === "0px") {
                answer.style.height = `${answer.scrollHeight}px`;
                arrowIcon.style.transform = "rotate(180deg)";
                item.classList.add('open');
                activeItem = item;
            } else {
                answer.style.height = "0";
                arrowIcon.style.transform = "rotate(0deg)";
                item.classList.remove('open');
                activeItem = null;
            }
        });
    });
}



// FUNCION COLOR SELECTOR PANEL
function initializeColorSelectorPanel() {
    const gearTab = document.querySelector('.gearTabContainer');
    const colorSelectorTheme = document.querySelector('.colorSelectorTheme');

    if (!gearTab || !colorSelectorTheme) {
        console.error("No se encontraron los elementos del panel de selector de color.");
        return;
    }

    gearTab.addEventListener('click', () => {
        colorSelectorTheme.classList.toggle('open');
    });

    const colorImages = document.querySelectorAll('.colorSelector img');
    colorImages.forEach(img => {
        img.addEventListener('click', () => {
            let newSecondColor;
            let newThirdColor;
            switch (img.getAttribute('src')) {
                case 'img/blue-color.png':
                    newSecondColor = '#3497db';
                    newThirdColor = '#0E4F7C';
                    break;
                case 'img/red-color.png':
                    newSecondColor = '#E26659';
                    newThirdColor = '#AA180F';
                    break;
                case 'img/green-color.png':
                    newSecondColor = '#567E32';
                    newThirdColor = '#31B767';
                    break;
                case 'img/brown-color.png':
                    newSecondColor = '#8e6341';
                    newThirdColor = '#DEB35D';
                    break;
                case 'img/yellow-color.png':
                    newSecondColor = '#d35400';
                    newThirdColor = '#f29c12';
                    break;
                default:
                    newSecondColor = '#d35400';
                    newThirdColor = '#f29c12';
            }
            document.documentElement.style.setProperty('--second-color', newSecondColor);
            document.documentElement.style.setProperty('--third-color', newThirdColor);
        });
    });
}


// FUNCION SLIDER MONTH-OFFERS CON BULLETS
function initializeOffersSlider() {
    const offerSlider = document.querySelector('.offer-content');
    const offerContainers = document.querySelectorAll('.offer-content > div');
    const bullets = document.querySelectorAll('.client-bullet-month'); 
    let offerIndex = 0;
    const totalOffers = offerContainers.length;
    const slideTime = 5000; 
    const slideTransitionTime = 1.5; 
    let slideInterval;

    function getSlideWidth() {
        return window.innerWidth <= 768 ? 98 : 65; 
    }

    function slideTo(index) {
        offerSlider.style.transition = `transform ${slideTransitionTime}s ease`;
        offerSlider.style.transform = `translateX(-${index * getSlideWidth()}vw)`;
        updateActiveBullet(index);
    }

    function slideOffers() {
        offerIndex = (offerIndex + 1) % totalOffers;
        slideTo(offerIndex);
    }

    function updateActiveBullet(activeIndex) {
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === activeIndex);
        });
    }

    // Configuración de eventos para los bullets
    bullets.forEach((bullet, i) => {
        bullet.addEventListener('click', () => {
            if (offerIndex !== i) {
                clearInterval(slideInterval);
                offerIndex = i;
                slideTo(offerIndex);
                slideInterval = setInterval(slideOffers, slideTime);
            }
        });
    });

    // Ajustar la posición de desplazamiento al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        offerSlider.style.transform = `translateX(-${offerIndex * getSlideWidth()}vw)`;
    });

    // Iniciar el carrusel automático
    slideInterval = setInterval(slideOffers, slideTime);
    updateActiveBullet(offerIndex);
}

initializeOffersSlider();





// FUNCION CARRUSEL ADOPT-SECTION CON BULLETS
function initializeAdoptCarousel() {
    const slider = document.querySelector('.friends-to-adopt');
    const containers = document.querySelectorAll('.animal-adopt-container');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const bulletContainer = document.querySelector('.bullets-adopt-slider');
    let index = 0;
    let visibleContainers;
    let bullets = [];

    if (!slider || containers.length === 0) {
        console.error("Error: No se encontraron elementos para el carrusel de adopción.");
        return;
    }

    // Función para crear bullets dinámicamente
    function createBullets() {
        bulletContainer.innerHTML = '';
        bullets = [];

        visibleContainers = window.innerWidth <= 768 ? 1 : 3;
        const totalBullets = Math.ceil(containers.length / visibleContainers);

        for (let i = 0; i < totalBullets; i++) {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet-adopt');
            bullet.dataset.index = i;
            bullet.addEventListener('click', () => {
                index = i * visibleContainers;
                slideTo(index);
            });
            bulletContainer.appendChild(bullet);
            bullets.push(bullet);
        }

        updateActiveBullet(index);
    }

    // Función para deslizar hacia un índice específico
    function slideTo(newIndex) {
        const containerWidth = containers[0].offsetWidth + 20;
        slider.style.transition = `transform 0.5s ease`;
        slider.style.transform = `translateX(-${newIndex * containerWidth}px)`;
        updateActiveBullet(newIndex);
    }

    // Función para actualizar el bullet activo
    function updateActiveBullet(newIndex) {
        const activeBulletIndex = Math.floor(newIndex / visibleContainers);
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === activeBulletIndex);
        });
    }

    // Event Listeners para los botones
    rightButton.addEventListener('click', () => {
        if (index < containers.length - visibleContainers) {
            index++;
            slideTo(index);
        }
    });

    leftButton.addEventListener('click', () => {
        if (index > 0) {
            index--;
            slideTo(index);
        }
    });

    window.addEventListener('resize', () => {
        createBullets();
        slideTo(index); 
    });

    createBullets(); 
}






// FUNCION PANEL COLOR SELECTOR
function initializeColorSelectorPanel() {
    const gearTab = document.querySelector('.gearTabContainer');
    const colorSelectorTheme = document.querySelector('.colorSelectorTheme');

    gearTab.addEventListener('click', () => {
        colorSelectorTheme.classList.toggle('open');
    });

    const colorImages = document.querySelectorAll('.colorSelector img');
    colorImages.forEach(img => {
        img.addEventListener('click', () => {
            let newSecondColor;
            let newThirdColor;
            switch (img.getAttribute('src')) {
                case 'img/blue-color.png':
                    newSecondColor = '#3497db';
                    newThirdColor = '#0E4F7C';
                    break;
                case 'img/red-color.png':
                    newSecondColor = '#E26659';
                    newThirdColor = '#AA180F';
                    break;
                case 'img/green-color.png':
                    newSecondColor = '#567E32';
                    newThirdColor = '#31B767';
                    break;
                case 'img/brown-color.png':
                    newSecondColor = '#8e6341';
                    newThirdColor = '#DEB35D';
                    break;
                case 'img/yellow-color.png':
                    newSecondColor = '#d35400';
                    newThirdColor = '#f29c12';
                    break;
                default:
                    newSecondColor = '#d35400';
                    newThirdColor = '#f29c12';
            }
            document.documentElement.style.setProperty('--second-color', newSecondColor);
            document.documentElement.style.setProperty('--third-color', newThirdColor);
        });
    });
}
