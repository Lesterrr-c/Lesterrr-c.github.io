
/* =========================
   THEME
========================= */

function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    document.body.classList.toggle("dark", savedTheme === "dark");
}

function updateProfileImage() {
    const profileImg = document.getElementById("profileImg");

    if (!profileImg) {
        return;
    }

    profileImg.src = document.body.classList.contains("dark")
        ? "images/profilewithsunglasses.png"
        : "images/profile.png";
}

function updateThemeButton(button) {
    const isDark = document.body.classList.contains("dark");

    button.textContent = isDark ? "☀️" : "🌙";
    button.title = isDark ? "Switch to light theme" : "Switch to dark theme";
    button.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
}

function initHeader() {
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn && themeBtn.dataset.ready !== "true") {
        themeBtn.dataset.ready = "true";

        updateThemeButton(themeBtn);

        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark");

            const theme = document.body.classList.contains("dark")
                ? "dark"
                : "light";

            localStorage.setItem("theme", theme);

            updateThemeButton(themeBtn);
            updateProfileImage();
        });
    }

    /* MOBILE NAVIGATION */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (
        menuBtn &&
        navLinks &&
        menuBtn.dataset.ready !== "true"
    ) {
        menuBtn.dataset.ready = "true";

        menuBtn.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ACTIVE NAVIGATION LINK */

    if (navLinks) {
        const currentPage =
            window.location.pathname.split("/").pop() || "index.html";

        navLinks.querySelectorAll("a").forEach(function (link) {
            const linkPage = link.getAttribute("href");

            link.classList.toggle("active", linkPage === currentPage);
        });
    }
}

/* Apply saved theme before initializing interactions. */

applySavedTheme();
updateProfileImage();
initHeader();

/* Initialize the header when its HTML is loaded. */

document.addEventListener("componentLoaded", function (event) {
    if (event.detail && event.detail.id === "header") {
        initHeader();
    }

    if (event.detail && event.detail.id === "footer") {
        console.log("Footer initialized.");
    }
});


/* =========================
   CODING CURSOR EFFECT
========================= */

const codeItems = ["{ }", "</>", "01", "JS", "PHP", "SQL", "IT", "Idnar"];

document.addEventListener("click", function (event) {
    for (let i = 0; i < 7; i++) {
        const particle = document.createElement("span");

        particle.className = "code-particle";

        particle.textContent =
            codeItems[Math.floor(Math.random() * codeItems.length)];

        particle.style.left = event.clientX + "px";
        particle.style.top = event.clientY + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 35 + Math.random() * 45;

        particle.style.setProperty(
            "--x",
            Math.cos(angle) * distance + "px"
        );

        particle.style.setProperty(
            "--y",
            Math.sin(angle) * distance + "px"
        );

        document.body.appendChild(particle);

        setTimeout(function () {
            particle.remove();
        }, 700);
    }
});


/* =========================
   MOUSE CODING TRAIL
========================= */

let lastTrail = 0;

document.addEventListener("mousemove", function (event) {
    const now = Date.now();

    if (now - lastTrail < 80) {
        return;
    }

    lastTrail = now;

    const particle = document.createElement("span");

    particle.className = "code-trail";

    particle.textContent =
        codeItems[Math.floor(Math.random() * codeItems.length)];

    particle.style.left = event.clientX + "px";
    particle.style.top = event.clientY + "px";

    document.body.appendChild(particle);

    setTimeout(function () {
        particle.remove();
    }, 500);
});


/* =========================
   SCROLL REVEAL
========================= */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("show");
    });
}


/* =========================
   TYPING EFFECT
========================= */

const typeText = document.getElementById("typeText");

if (typeText) {
    const words = [
        "BSIT Student",
        "Web Developer",
        "IT Support Enthusiast",
        "Software Developer",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            typeText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            typeText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 50 : 90);
    }

    typeEffect();
}


/* =========================
   HEADER SCROLL EFFECT
========================= */

function updateHeaderOnScroll() {
    const header = document.querySelector(".site-header, .navbar");

    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
}

window.addEventListener("scroll", updateHeaderOnScroll);

updateHeaderOnScroll();



/* ========================================
   INDEPENDENT HORIZONTAL CASE SLIDERS
======================================== */

function initCaseSliders() {
    document.querySelectorAll(".case-study").forEach(function (study) {
        if (study.dataset.sliderReady === "true") {
            return;
        }

        const viewport = study.querySelector(".case-viewport");
        const track = study.querySelector(".case-track");
        const slides = study.querySelectorAll(".case-slide");
        const prev = study.querySelector(".case-prev");
        const next = study.querySelector(".case-next");
        const count = study.querySelector(".case-current");
        const progress = study.querySelector(".case-progress-fill");
        const dots = study.querySelector(".case-dots");

        if (!viewport || !track || !slides.length || !prev || !next) {
            return;
        }

        study.dataset.sliderReady = "true";

        let index = 0;
        let pointerStart = null;

        dots.innerHTML = "";

        /* Create one indicator for every slide. */

        slides.forEach(function (_, i) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "case-dot";
            dot.setAttribute("aria-label", "Go to slide " + (i + 1));

            dot.addEventListener("click", function () {
                showSlide(i);
            });

            dots.appendChild(dot);
        });

        const allDots = dots.querySelectorAll(".case-dot");

        function showSlide(newIndex) {
            index = Math.max(0, Math.min(newIndex, slides.length - 1));

            track.style.transform =
                "translate3d(-" + (index * 100) + "%, 0, 0)";

            slides.forEach(function (slide, i) {
                const active = i === index;

                slide.classList.toggle("is-active", active);
                slide.setAttribute("aria-hidden", String(!active));
            });

            prev.disabled = index === 0;
            next.disabled = index === slides.length - 1;

            if (count) {
                count.textContent =
                    String(index + 1).padStart(2, "0") +
                    " / " +
                    String(slides.length).padStart(2, "0");
            }

            if (progress) {
                progress.style.width =
                    ((index + 1) / slides.length * 100) + "%";
            }

            allDots.forEach(function (dot, i) {
                dot.classList.toggle("is-active", i === index);

                if (i === index) {
                    dot.setAttribute("aria-current", "step");
                } else {
                    dot.removeAttribute("aria-current");
                }
            });
        }

        prev.addEventListener("click", function () {
            showSlide(index - 1);
        });

        next.addEventListener("click", function () {
            showSlide(index + 1);
        });

        /* Keyboard navigation when the slider is focused. */

        viewport.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                showSlide(index + 1);
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showSlide(index - 1);
            }
        });

        /* Swipe or drag horizontally to change slides. */

        viewport.addEventListener("pointerdown", function (event) {
            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }

            pointerStart = event.clientX;
        });

        viewport.addEventListener("pointerup", function (event) {
            if (pointerStart === null) {
                return;
            }

            const distance = event.clientX - pointerStart;

            if (Math.abs(distance) > 55) {
                showSlide(index + (distance < 0 ? 1 : -1));
            }

            pointerStart = null;
        });

        viewport.addEventListener("pointercancel", function () {
            pointerStart = null;
        });

        showSlide(0);
    });
}

/* The case slides exist in the HTML before this script runs. */
initCaseSliders();



/* ========================================
   FUTURISTIC WEBSITE STARTUP SEQUENCE
======================================== */

(function initSiteLoader() {
    
    const nav = performance.getEntriesByType("navigation")[0];

    // Show the startup animation only on a browser refresh.
    if (!nav || nav.type !== "reload") return;

    if (document.querySelector(".site-loader")) return;

    const loader = document.createElement("div");
    loader.className = "site-loader";
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-live", "polite");
    loader.setAttribute("aria-label", "Loading portfolio");

    loader.innerHTML = `
        <div class="site-loader-grid"></div>

        <div class="site-loader-content">
            <div class="site-loader-orbit" aria-hidden="true">
                <span class="site-loader-ring site-loader-ring-one"></span>
                <span class="site-loader-ring site-loader-ring-two"></span>
                <span class="site-loader-ring site-loader-ring-three"></span>
                <div class="site-loader-logo">L<span>.</span></div>
            </div>

            <p class="site-loader-title">LESTER LAGAJINO</p>
            <p class="site-loader-subtitle">
                Initializing portfolio experience...
            </p>

            <div class="site-loader-bar" aria-hidden="true">
                <span></span>
            </div>

            <div class="site-loader-status">
                <span>SYSTEM INITIALIZATION</span>
                <span>● ONLINE</span>
            </div>
        </div>
    `;

    document.body.appendChild(loader);

    const MIN_DURATION = 1500;
    const MAX_DURATION = 10000;

    let pageLoaded = document.readyState === "complete";
    let minTimePassed = false;
    let dismissed = false;

    function tryDismissLoader() {
        if (!pageLoaded || !minTimePassed || dismissed) return;

        dismissed = true;
        loader.classList.add("is-done");

        window.setTimeout(function () {
            loader.remove();
        }, 650);
    }

    if (!pageLoaded) {
        window.addEventListener("load", function () {
            pageLoaded = true;
            tryDismissLoader();
        }, { once: true });
    }

    // Keep the animation visible for at least 4 seconds.
    window.setTimeout(function () {
        minTimePassed = true;
        tryDismissLoader();
    }, MIN_DURATION);

    // Safety fallback in case the page takes too long to load.
    window.setTimeout(function () {
        pageLoaded = true;
        minTimePassed = true;
        tryDismissLoader();
    }, MAX_DURATION);
})();




