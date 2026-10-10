const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light";  
}

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ Light";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 Dark";
    }
    updateProfileImage();

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

    // Prevent too many particles
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

const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
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


const typeText = document.getElementById("typeText");

if (typeText) {

    const words = [
        "BSIT Student",
        "Web Developer",
        "IT  Support Enthusiast",
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

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }
            }
        }

        setTimeout(
            typeEffect,
            deleting ? 50 : 90
        );
    }

    typeEffect();
}


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   PROFILE THEME IMAGE
   ========================= */

const profileImg = document.getElementById("profileImg");

function updateProfileImage() {

    if (!profileImg) {
        return;
    }

    if (document.body.classList.contains("dark")) {
        profileImg.src = "images/profilewithsunglasses.png";
    } else {
        profileImg.src = "images/profile.png";
    }

}

updateProfileImage();