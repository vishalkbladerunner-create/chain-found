/**
 * ChainFoundry — Clean JS
 * No React. No hashed classes. Normal DOM.
 */

(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger-btn');

  /* ---- Mega Menu ---- */
  var megaMenu = document.getElementById('mega-menu');
  var megaMenuBackdrop = document.getElementById('mega-menu-backdrop');
  var megaMenuClose = document.getElementById('mega-menu-close');
  var megaMenuItems = document.querySelectorAll('.mega-menu__item[data-panel]');
  var megaPanels = document.querySelectorAll('.mega-panel');

  function openMegaMenu() {
    if (!megaMenu || !megaMenuBackdrop) return;
    megaMenu.classList.add('is-open');
    megaMenu.setAttribute('aria-hidden', 'false');
    megaMenuBackdrop.classList.add('is-open');
    if (hamburger) {
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMegaMenu() {
    if (!megaMenu || !megaMenuBackdrop) return;
    megaMenu.classList.remove('is-open');
    megaMenu.setAttribute('aria-hidden', 'true');
    megaMenuBackdrop.classList.remove('is-open');
    if (hamburger) {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
    document.body.style.overflow = '';
  }

  if (hamburger && megaMenu) hamburger.addEventListener('click', function () {
    megaMenu.classList.contains('is-open') ? closeMegaMenu() : openMegaMenu();
  });
  if (megaMenuClose) megaMenuClose.addEventListener('click', closeMegaMenu);
  if (megaMenuBackdrop) megaMenuBackdrop.addEventListener('click', closeMegaMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMegaMenu();
  });

  /* ---- Mega Menu Panel Switching ---- */
  function activatePanel(panelId) {
    if (!panelId) return;
    megaMenuItems.forEach(function (item) {
      item.classList.remove('is-active');
      if (item.getAttribute('data-panel') === panelId) {
        item.classList.add('is-active');
      }
    });
    megaPanels.forEach(function (panel) {
      panel.classList.remove('is-active');
    });
    var targetPanel = document.getElementById('panel-' + panelId);
    if (targetPanel) targetPanel.classList.add('is-active');
  }

  megaMenuItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      activatePanel(item.getAttribute('data-panel'));
    });
    item.addEventListener('click', function () {
      activatePanel(item.getAttribute('data-panel'));
    });
  });

  /* ---- Mobile Drawer ---- */
  var drawer = document.getElementById('mobile-drawer');
  var drawerBackdrop = document.getElementById('drawer-backdrop');
  var drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.add('is-open');
    if (hamburger) {
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.remove('is-open');
    if (hamburger) {
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }
    document.body.style.overflow = '';
  }

  if (hamburger && drawer) hamburger.addEventListener('click', function () {
    drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ---- Mobile Drawer Accordion ---- */
  var triggers = document.querySelectorAll('.drawer__trigger');
  triggers.forEach(function (trigger) {
    var parent = trigger.parentElement;
    var panel = parent.querySelector('.drawer__panel');
    if (!panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = parent.classList.contains('is-open');
      var siblings = parent.parentElement.querySelectorAll('.drawer__item');
      siblings.forEach(function (sib) {
        if (sib !== parent) {
          sib.classList.remove('is-open');
          var btn = sib.querySelector('.drawer__trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
      parent.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  /* ---- Header Scroll Effect ---- */
  var header = document.getElementById('site-header');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (!header) return;
    if (y > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var targetId = a.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Scroll Reveal ---- */
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

})();
