/* ============================================================
   Controla os carrosséis de fotos de cada ficha de animal
   (.foto-carrossel). Funciona automaticamente para quantas
   fichas existirem na página do catálogo.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var carrosseis = document.querySelectorAll('.foto-carrossel');

  carrosseis.forEach(function (carrossel) {

    var track = carrossel.querySelector('.foto-track');
    var slides = carrossel.querySelectorAll('.foto-track img');
    var botaoPrev = carrossel.querySelector('.seta-prev');
    var botaoNext = carrossel.querySelector('.seta-next');
    var indicadores = carrossel.querySelectorAll('.indicador');
    var total = slides.length;
    var atual = 0;

    if (total <= 1) return;

    function irPara(indice) {
      atual = (indice + total) % total;
      track.style.transform = 'translateX(-' + (atual * 100) + '%)';

      indicadores.forEach(function (dot, i) {
        dot.classList.toggle('ativo', i === atual);
      });
    }

    if (botaoPrev) {
      botaoPrev.addEventListener('click', function () {
        irPara(atual - 1);
      });
    }

    if (botaoNext) {
      botaoNext.addEventListener('click', function () {
        irPara(atual + 1);
      });
    }

    indicadores.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        irPara(i);
      });
    });

    /* Permite deslizar a foto com o dedo no celular */
    var startX = 0;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      var endX = e.changedTouches[0].clientX;
      var diferenca = startX - endX;

      if (Math.abs(diferenca) > 40) {
        if (diferenca > 0) {
          irPara(atual + 1);
        } else {
          irPara(atual - 1);
        }
      }
    });

  });

});
