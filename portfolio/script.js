/* Portfolio interactions: word-by-word heading, 3D tilt, magnetic buttons, hero spotlight,
   theme toggle, mobile menu, scroll reveal, contact form.
   No dependencies. Every storage or browser-API call is guarded so the page still works without it. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var canAnimate = !reduceMotion && finePointer;

  /* ---- Footer year ---- */
  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---- Split the hero heading into words for the 3D entrance ---- */
  function splitWords(el) {
    var index = 0;

    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var fragment = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              fragment.appendChild(document.createTextNode(' '));
            } else {
              var word = document.createElement('span');
              word.className = 'w';
              word.style.setProperty('--i', index++);
              word.setAttribute('aria-hidden', 'true');
              word.textContent = part;
              fragment.appendChild(word);
            }
          });
          child.parentNode.replaceChild(fragment, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    }

    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
  }

  var splitHeading = document.querySelector('.split-words');
  if (splitHeading && !reduceMotion) {
    splitWords(splitHeading);
  }

  /* ---- Hero: spotlight and parallax follow the cursor ---- */
  var hero = document.querySelector('.hero');
  var heroVisual = document.querySelector('.hero-visual');

  if (hero && canAnimate) {
    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width;
      var py = (event.clientY - rect.top) / rect.height;
      hero.style.setProperty('--glow-x', (px * 100).toFixed(1) + '%');
      hero.style.setProperty('--glow-y', (py * 100).toFixed(1) + '%');
      if (heroVisual) {
        heroVisual.style.setProperty('--px', (px * 2 - 1).toFixed(3));
        heroVisual.style.setProperty('--py', (py * 2 - 1).toFixed(3));
      }
    });

    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--glow-x', '70%');
      hero.style.setProperty('--glow-y', '35%');
      if (heroVisual) {
        heroVisual.style.setProperty('--px', '0');
        heroVisual.style.setProperty('--py', '0');
      }
    });
  }

  /* ---- 3D tilt cards with a light glare ---- */
  if (canAnimate) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        var px = (event.clientX - rect.left) / rect.width;
        var py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--ry', ((px - 0.5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
        card.classList.add('is-tilting');
      });

      card.addEventListener('pointerleave', function () {
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---- Magnetic buttons ---- */
  if (canAnimate) {
    document.querySelectorAll('.magnetic').forEach(function (button) {
      button.addEventListener('pointermove', function (event) {
        var rect = button.getBoundingClientRect();
        var x = event.clientX - (rect.left + rect.width / 2);
        var y = event.clientY - (rect.top + rect.height / 2);
        button.style.setProperty('--magnet-x', (x * 0.22).toFixed(1) + 'px');
        button.style.setProperty('--magnet-y', (y * 0.32).toFixed(1) + 'px');
      });

      button.addEventListener('pointerleave', function () {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
    });
  }

  /* ---- Theme toggle ---- */
  var themeBtn = document.getElementById('theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    var explicit = root.getAttribute('data-theme');
    return explicit ? explicit === 'dark' : systemDark.matches;
  }

  function paintThemeButton() {
    if (!themeBtn) return;
    var dark = isDark();
    themeBtn.setAttribute('data-dark', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) { /* storage blocked: the choice lasts for this page view only */ }
      paintThemeButton();
    });
  }

  if (systemDark.addEventListener) {
    systemDark.addEventListener('change', paintThemeButton);
  }
  paintThemeButton();

  /* ---- Mobile navigation ---- */
  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNavOpen(open) {
    header.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setNavOpen(!header.classList.contains('open'));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') setNavOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setNavOpen(false);
    });
  }

  /* ---- Header shadow once the page scrolls ---- */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Highlight the nav link for the section in view ---- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---- Scroll reveal ---- */
  var revealItems = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Contact form: opens the visitor's email app with the message filled in ----
     No backend needed. To receive messages without an email app, point the form
     at a service such as Formspree and remove this handler (see README.md). */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var subject = 'Project enquiry from ' + name;
      var body = [
        'Name: ' + name,
        'Email: ' + (data.get('email') || ''),
        'Project type: ' + (data.get('type') || ''),
        'Budget: ' + (data.get('budget') || 'Not specified'),
        '',
        (data.get('message') || '').toString().trim()
      ].join('\n');

      var to = form.getAttribute('data-to') || '';
      window.location.href = 'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) {
        status.textContent = 'Opening your email app. Thanks for reaching out!';
      }
    });
  }
})();
