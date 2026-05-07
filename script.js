// =========================
// CONFIG WHATSAPP
// =========================
const WHATSAPP_NUMBER = "5527999099258";
const WHATSAPP_MESSAGE = "Olá! Preciso de um socorro com pneu.";

function abrirWhatsApp() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
}

// Botões que chamam WhatsApp
document.querySelectorAll('[id^="btnWhatsApp"]').forEach((btn) => {
    btn.addEventListener("click", abrirWhatsApp);
});


// =========================
// MENU MOBILE
// =========================
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Fecha menu ao clicar em link
    document.querySelectorAll(".nav a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener("click", (e) => {
        const clicouNoMenu = nav.contains(e.target);
        const clicouNoBotao = menuToggle.contains(e.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            nav.classList.remove("active");
        }
    });
}


// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            const header = document.querySelector(".header");
            const offset = header ? header.offsetHeight : 0;

            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: "smooth"
            });
        }
    });
});


// =========================
// ANIMAÇÃO AO APARECER
// =========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("apareceu");
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll(".servico-card, .destaque-card").forEach((el) => {
    observer.observe(el);
});


// =========================
// EFEITO HEADER AO SCROLL
// =========================
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.35)";
    } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.18)";
    }
});


// =========================
// DEBUG
// =========================
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚗 Site Borracharia carregado com sucesso!");
});