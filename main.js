/* ============================================================
   ESTÂNCIA SANTA MÔNICA — SCRIPT PRINCIPAL
   - Header dinâmico ao rolar a página
   - Menu mobile (hambúrguer)
   - Botão voltar ao topo
   - Contadores animados (faixa de estatísticas)
   - Inicialização do AOS (animações ao rolar)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header dinâmico ---------- */
  var header = document.querySelector('.site-header');

  function atualizarHeader() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  atualizarHeader();
  window.addEventListener('scroll', atualizarHeader, { passive: true });


  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }


  /* ---------- Botão voltar ao topo ---------- */
  var topoBtn = document.querySelector('.back-to-top');

  if (topoBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        topoBtn.classList.add('mostrar');
      } else {
        topoBtn.classList.remove('mostrar');
      }
    }, { passive: true });

    topoBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ---------- Contadores animados ---------- */
  var contadores = document.querySelectorAll('[data-count]');

  if (contadores.length) {

    var animarContador = function (el) {
      var alvo = parseFloat(el.getAttribute('data-count'));
      var duracao = 1600;
      var inicio = null;

      function passo(timestamp) {
        if (!inicio) inicio = timestamp;
        var progresso = Math.min((timestamp - inicio) / duracao, 1);
        var valorAtual = Math.floor(progresso * alvo);
        el.textContent = valorAtual;

        if (progresso < 1) {
          window.requestAnimationFrame(passo);
        } else {
          el.textContent = alvo;
        }
      }

      window.requestAnimationFrame(passo);
    };

    var observerContadores = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          observerContadores.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.5 });

    contadores.forEach(function (contador) {
      observerContadores.observe(contador);
    });
  }


  /* ---------- AOS (animações ao rolar) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

});
