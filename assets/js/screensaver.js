// CUPS Homepage Screensaver Effect
// Shows full background image when idle, fades out on user interaction
// Smooth letter-by-letter reveal animation for the society title
(function () {
  'use strict';

  var IDLE_TIMEOUT = 7000;
  var FADE_IN_DURATION = 1500;
  var FADE_OUT_DURATION = 800;
  var TITLE_TEXT = 'Cambridge University Photography Society (CUPS)';
  var LETTER_DELAY = 40; // ms between each letter appearing

  var idleTimer = null;
  var screensaver = null;
  var titleEl = null;
  var isActive = true;
  var revealTimer = null;
  var hero = null;

  function isMobileViewport() {
    return window.matchMedia('(max-width: 820px)').matches;
  }

  function getScreensaverImage() {
    if (!hero) return '';

    var desktopImage = hero.getAttribute('data-bg-desktop');
    var mobileImage = hero.getAttribute('data-bg-mobile');

    if (isMobileViewport() && mobileImage) {
      return mobileImage;
    }

    return desktopImage || '';
  }

  function applyScreensaverBackground() {
    var image = getScreensaverImage();
    if (image) {
      screensaver.style.backgroundImage = 'url("' + image + '")';
    }
  }

  function createScreensaver() {
    screensaver = document.createElement('div');
    screensaver.id = 'screensaver';

    hero = document.querySelector('.hero');
    applyScreensaverBackground();

    titleEl = document.createElement('div');
    titleEl.id = 'screensaver-title';
    screensaver.appendChild(titleEl);

    document.body.appendChild(screensaver);
    startReveal();
  }

  function buildLetterSpans() {
    titleEl.innerHTML = '';
    for (var i = 0; i < TITLE_TEXT.length; i++) {
      var span = document.createElement('span');
      span.textContent = TITLE_TEXT[i];
      titleEl.appendChild(span);
    }
  }

  function startReveal() {
    buildLetterSpans();
    var spans = titleEl.querySelectorAll('span');
    var index = 0;

    function revealNext() {
      if (index < spans.length) {
        spans[index].classList.add('visible');
        index++;
        revealTimer = setTimeout(revealNext, LETTER_DELAY);
      }
    }

    revealTimer = setTimeout(revealNext, 400);
  }

  function resetTitle() {
    clearTimeout(revealTimer);
    titleEl.innerHTML = '';
  }

  function showScreensaver() {
    if (isActive) return;
    isActive = true;
    screensaver.style.transition = 'opacity ' + (FADE_IN_DURATION / 1000) + 's ease-in';
    screensaver.classList.remove('dimmed');
    document.body.style.overflow = 'hidden';

    setTimeout(startReveal, FADE_IN_DURATION);
  }

  function hideScreensaver() {
    if (!isActive) return;
    isActive = false;
    screensaver.style.transition = 'opacity ' + (FADE_OUT_DURATION / 1000) + 's ease-out';
    screensaver.classList.add('dimmed');
    document.body.style.overflow = '';
    resetTitle();
  }

  function resetIdleTimer() {
    hideScreensaver();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showScreensaver, IDLE_TIMEOUT);
  }

  function init() {
    createScreensaver();
    document.body.style.overflow = 'hidden';

    var events = ['mousemove', 'mousedown', 'scroll', 'keydown', 'touchstart', 'touchmove', 'wheel'];
    events.forEach(function (evt) {
      document.addEventListener(evt, resetIdleTimer, { passive: true });
    });

    window.addEventListener('resize', applyScreensaverBackground, { passive: true });
    window.addEventListener('orientationchange', applyScreensaverBackground, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
