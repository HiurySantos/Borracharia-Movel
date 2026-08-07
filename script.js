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
    const fecharMenu = (devolverFoco = false) => {
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");

        if (devolverFoco) {
            menuToggle.focus();
        }
    };

    menuToggle.addEventListener("click", () => {
        const menuAberto = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(menuAberto));
        menuToggle.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
    });

    // Fecha menu ao clicar em link
    document.querySelectorAll(".nav a").forEach((link) => {
        link.addEventListener("click", () => {
            fecharMenu();
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener("click", (e) => {
        const clicouNoMenu = nav.contains(e.target);
        const clicouNoBotao = menuToggle.contains(e.target);

        if (!clicouNoMenu && !clicouNoBotao) {
            fecharMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("active")) {
            fecharMenu(true);
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


const slides = document.querySelectorAll('.slide');
const bolinhas = document.querySelectorAll('.bolinha');
const slider = document.querySelector('.slider');
const botaoAnterior = document.querySelector('.slider-prev');
const botaoProximo = document.querySelector('.slider-next');
const botaoPausa = document.querySelector('.slider-pause');
const preferenciaMovimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
const TEMPO_ROTACAO_AUTOMATICA = 3000;

let indiceSlideAtual = 0;
let idRotacaoAutomatica = null;
let pausaSolicitada = false;
let paginaOculta = document.hidden;

const carrosselValido = slides.length > 0 && slides.length === bolinhas.length;

function exibirSlide(indice) {
  if (!carrosselValido) return;

  const indiceNormalizado = (indice + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const ativo = slideIndex === indiceNormalizado;
    slide.classList.toggle('active', ativo);
    slide.setAttribute('aria-hidden', String(!ativo));
  });

  bolinhas.forEach((bolinha, bolinhaIndex) => {
    const ativo = bolinhaIndex === indiceNormalizado;
    bolinha.classList.toggle('active', ativo);

    if (ativo) {
      bolinha.setAttribute('aria-current', 'true');
    } else {
      bolinha.removeAttribute('aria-current');
    }
  });

  indiceSlideAtual = indiceNormalizado;
}

function devePausarCarrossel() {
  return pausaSolicitada || paginaOculta || preferenciaMovimentoReduzido.matches;
}

function pararRotacaoAutomatica() {
  if (idRotacaoAutomatica !== null) {
    window.clearInterval(idRotacaoAutomatica);
    idRotacaoAutomatica = null;
  }
}

function reiniciarRotacaoAutomatica() {
  pararRotacaoAutomatica();

  if (!carrosselValido || devePausarCarrossel()) return;

  idRotacaoAutomatica = window.setInterval(() => {
    exibirSlide(indiceSlideAtual + 1);
  }, TEMPO_ROTACAO_AUTOMATICA);
}

function atualizarControlePausa() {
  if (!botaoPausa) return;

  const movimentoReduzido = preferenciaMovimentoReduzido.matches;
  const carrosselPausado = pausaSolicitada || movimentoReduzido;

  botaoPausa.disabled = movimentoReduzido;
  botaoPausa.setAttribute('aria-pressed', String(carrosselPausado));
  botaoPausa.setAttribute('aria-label', carrosselPausado ? 'Continuar carrossel' : 'Pausar carrossel');
  botaoPausa.textContent = carrosselPausado ? '▶' : '❚❚';
}

function atualizarRotacaoAutomatica() {
  atualizarControlePausa();
  reiniciarRotacaoAutomatica();
}

function navegarParaSlide(indice) {
  exibirSlide(indice);
  reiniciarRotacaoAutomatica();
}

if (carrosselValido && slider) {
  exibirSlide(indiceSlideAtual);

  botaoAnterior?.addEventListener('click', () => navegarParaSlide(indiceSlideAtual - 1));
  botaoProximo?.addEventListener('click', () => navegarParaSlide(indiceSlideAtual + 1));

  bolinhas.forEach((bolinha, indice) => {
    bolinha.addEventListener('click', () => navegarParaSlide(indice));
  });

  botaoPausa?.addEventListener('click', () => {
    pausaSolicitada = !pausaSolicitada;
    atualizarRotacaoAutomatica();
  });

  slider.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      navegarParaSlide(indiceSlideAtual - 1);
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      navegarParaSlide(indiceSlideAtual + 1);
    }
  });

  document.addEventListener('visibilitychange', () => {
    paginaOculta = document.hidden;
    atualizarRotacaoAutomatica();
  });

  preferenciaMovimentoReduzido.addEventListener('change', atualizarRotacaoAutomatica);
  atualizarRotacaoAutomatica();
} else {
  pararRotacaoAutomatica();
}
