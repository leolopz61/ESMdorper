/* ============================================================
   ESTÂNCIA SANTA MÔNICA — GALERIA
   Script exclusivo da página galeria.html.
   Três blocos independentes:
     1. Carrossel premium (autoplay, fade, setas, dots, swipe)
     2. Filtros + álbuns (mostram/escondem os .foto-card)
     3. Lightbox (zoom, setas, ESC, clique fora)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. CARROSSEL PREMIUM
     ============================================================ */
  (function iniciarCarrossel() {

    var carrossel = document.querySelector('.galeria-carrossel');
    if (!carrossel) return;

    var slides = carrossel.querySelectorAll('.carrossel-slide');
    var dotsContainer = carrossel.querySelector('.carrossel-indicadores-premium');
    var botaoPrev = carrossel.querySelector('.seta-prev');
    var botaoNext = carrossel.querySelector('.seta-next');
    var barraProgresso = carrossel.querySelector('.carrossel-progresso');
    var total = slides.length;
    var atual = 0;
    var duracaoAutoplay = 5000; /* ms por slide */
    var timerAutoplay = null;
    var pausado = false;

    if (total === 0) return;

    /* cria os indicadores dinamicamente a partir dos slides existentes */
    var dots = [];
    if (dotsContainer) {
      slides.forEach(function (slide, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'indicador' + (i === 0 ? ' ativo' : '');
        dot.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
        dot.addEventListener('click', function () {
          irPara(i);
          reiniciarAutoplay();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    function irPara(indice) {
      slides[atual].classList.remove('ativo');
      if (dots[atual]) dots[atual].classList.remove('ativo');

      atual = (indice + total) % total;

      slides[atual].classList.add('ativo');
      if (dots[atual]) dots[atual].classList.add('ativo');

      reiniciarProgresso();
    }

    function proximo() { irPara(atual + 1); }
    function anterior() { irPara(atual - 1); }

    function reiniciarProgresso() {
      if (!barraProgresso) return;
      barraProgresso.style.transition = 'none';
      barraProgresso.style.width = '0%';
      /* força reflow para reiniciar a transição */
      // eslint-disable-next-line no-unused-expressions
      barraProgresso.offsetWidth;
      barraProgresso.style.transition = 'width ' + duracaoAutoplay + 'ms linear';
      barraProgresso.style.width = '100%';
    }

    function iniciarAutoplay() {
      pararAutoplay();
      reiniciarProgresso();
      timerAutoplay = setInterval(function () {
        if (!pausado) proximo();
      }, duracaoAutoplay);
    }

    function pararAutoplay() {
      if (timerAutoplay) clearInterval(timerAutoplay);
    }

    function reiniciarAutoplay() {
      iniciarAutoplay();
    }

    if (botaoPrev) {
      botaoPrev.addEventListener('click', function () {
        anterior();
        reiniciarAutoplay();
      });
    }

    if (botaoNext) {
      botaoNext.addEventListener('click', function () {
        proximo();
        reiniciarAutoplay();
      });
    }

    /* pausa ao passar o mouse */
    carrossel.addEventListener('mouseenter', function () {
      pausado = true;
      carrossel.classList.add('pausado');
      if (barraProgresso) barraProgresso.style.animationPlayState = 'paused';
    });

    carrossel.addEventListener('mouseleave', function () {
      pausado = false;
      carrossel.classList.remove('pausado');
    });

    /* swipe no celular */
    var startX = 0;
    carrossel.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      pausado = true;
    }, { passive: true });

    carrossel.addEventListener('touchend', function (e) {
      var endX = e.changedTouches[0].clientX;
      var diferenca = startX - endX;

      if (Math.abs(diferenca) > 40) {
        if (diferenca > 0) proximo(); else anterior();
        reiniciarAutoplay();
      }
      pausado = false;
    });

    /* abrir a foto do slide atual no lightbox pelo botão "Ver Foto" */
    carrossel.querySelectorAll('[data-lightbox-abrir]').forEach(function (botao) {
      botao.addEventListener('click', function (e) {
        e.preventDefault();
        var slide = botao.closest('.carrossel-slide');
        if (window.abrirLightboxCarrossel) {
          window.abrirLightboxCarrossel(slide);
        }
      });
    });

    slides[0].classList.add('ativo');
    if (dots[0]) dots[0].classList.add('ativo');
    iniciarAutoplay();

  })();


  /* ============================================================
     2. FILTROS + ÁLBUNS
     ============================================================ */
  (function iniciarFiltros() {

    var botoesFiltro = document.querySelectorAll('.filtro-btn');
    var albuns = document.querySelectorAll('.album-card');
    var cards = document.querySelectorAll('.foto-card');
    var grid = document.querySelector('.galeria-grid');

    if (!cards.length) return;

    function aplicarFiltro(categoria) {

      cards.forEach(function (card) {
        var pertence = categoria === 'todos' || card.getAttribute('data-categoria') === categoria;

        if (pertence) {
          card.classList.remove('is-hidden');
          card.classList.remove('is-entering');
          /* força reflow para reiniciar a animação de entrada */
          // eslint-disable-next-line no-unused-expressions
          card.offsetWidth;
          card.classList.add('is-entering');
        } else {
          card.classList.add('is-hidden');
        }
      });

      botoesFiltro.forEach(function (botao) {
        botao.classList.toggle('ativo', botao.getAttribute('data-filter') === categoria);
      });

      albuns.forEach(function (album) {
        album.classList.toggle('ativo', album.getAttribute('data-filter') === categoria);
      });
    }

    botoesFiltro.forEach(function (botao) {
      botao.addEventListener('click', function () {
        aplicarFiltro(botao.getAttribute('data-filter'));
      });
    });

    albuns.forEach(function (album) {
      album.addEventListener('click', function () {
        var categoria = album.getAttribute('data-filter');
        aplicarFiltro(categoria);
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

  })();


  /* ============================================================
     3. LIGHTBOX
     ============================================================ */
  (function iniciarLightbox() {

    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var imgEl = lightbox.querySelector('.lightbox-conteudo img');
    var tituloEl = lightbox.querySelector('.lightbox-legenda h3');
    var categoriaEl = lightbox.querySelector('.lightbox-legenda span');
    var contadorEl = lightbox.querySelector('.lightbox-contador');
    var botaoFechar = lightbox.querySelector('.lightbox-fechar');
    var botaoPrev = lightbox.querySelector('.lightbox-prev');
    var botaoNext = lightbox.querySelector('.lightbox-next');

    var itens = [];       /* lista atual de itens navegáveis */
    var indiceAtual = 0;
    var ultimoFoco = null;

    function montarItensDaGrade() {
      var visiveis = document.querySelectorAll('.foto-card:not(.is-hidden)');
      return Array.prototype.map.call(visiveis, function (card) {
        var img = card.querySelector('img');
        return {
          src: img.getAttribute('src'),
          titulo: card.querySelector('.info h3') ? card.querySelector('.info h3').textContent : '',
          categoria: card.querySelector('.info span') ? card.querySelector('.info span').textContent : ''
        };
      });
    }

    function montarItensDoCarrossel() {
      var slides = document.querySelectorAll('.carrossel-slide');
      return Array.prototype.map.call(slides, function (slide) {
        var img = slide.querySelector('img');
        var titulo = slide.querySelector('.carrossel-slide-info h3');
        return {
          src: img.getAttribute('src'),
          titulo: titulo ? titulo.textContent : '',
          categoria: 'Carrossel em destaque'
        };
      });
    }

    function renderizar() {
      var item = itens[indiceAtual];
      if (!item) return;

      imgEl.classList.remove('zoom');
      imgEl.setAttribute('src', item.src);
      imgEl.setAttribute('alt', item.titulo);
      tituloEl.textContent = item.titulo;
      categoriaEl.textContent = item.categoria;
      contadorEl.textContent = (indiceAtual + 1) + ' / ' + itens.length;
    }

    function abrir(lista, indiceInicial, elementoOrigem) {
      itens = lista;
      indiceAtual = indiceInicial || 0;
      if (!itens.length) return;

      ultimoFoco = elementoOrigem || document.activeElement;
      renderizar();

      lightbox.classList.add('aberto');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      botaoFechar.focus();
    }

    function fechar() {
      lightbox.classList.remove('aberto');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      imgEl.classList.remove('zoom');
      if (ultimoFoco && typeof ultimoFoco.focus === 'function') {
        ultimoFoco.focus();
      }
    }

    function proximo() {
      indiceAtual = (indiceAtual + 1) % itens.length;
      renderizar();
    }

    function anterior() {
      indiceAtual = (indiceAtual - 1 + itens.length) % itens.length;
      renderizar();
    }

    /* clique em qualquer foto da grade abre o lightbox nessa posição */
    document.querySelectorAll('.foto-card').forEach(function (card, indiceGlobal) {
      card.addEventListener('click', function () {
        var lista = montarItensDaGrade();
        var visiveis = document.querySelectorAll('.foto-card:not(.is-hidden)');
        var indice = Array.prototype.indexOf.call(visiveis, card);
        abrir(lista, indice === -1 ? 0 : indice, card);
      });

      /* acessibilidade: também abre com Enter/Espaço */
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    /* botão "Ver Foto" do carrossel premium */
    window.abrirLightboxCarrossel = function (slideEl) {
      var slides = document.querySelectorAll('.carrossel-slide');
      var indice = Array.prototype.indexOf.call(slides, slideEl);
      abrir(montarItensDoCarrossel(), indice === -1 ? 0 : indice, slideEl.querySelector('[data-lightbox-abrir]'));
    };

    /* zoom ao clicar na imagem */
    imgEl.addEventListener('click', function () {
      imgEl.classList.toggle('zoom');
    });

    botaoFechar.addEventListener('click', fechar);
    botaoNext.addEventListener('click', proximo);
    botaoPrev.addEventListener('click', anterior);

    /* fecha clicando fora do conteúdo (no fundo escurecido) */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) fechar();
    });

    /* teclado: ESC fecha, setas navegam */
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('aberto')) return;

      if (e.key === 'Escape') fechar();
      if (e.key === 'ArrowRight') proximo();
      if (e.key === 'ArrowLeft') anterior();
    });

    /* swipe no celular dentro do lightbox */
    var startX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var endX = e.changedTouches[0].clientX;
      var diferenca = startX - endX;
      if (Math.abs(diferenca) > 40) {
        if (diferenca > 0) proximo(); else anterior();
      }
    });

  })();

});
