(function () {
  'use strict';

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var header = document.getElementById('header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var search = document.getElementById('brand-search');
  var wall = document.getElementById('brand-wall');
  var count = document.getElementById('brand-count');
  if (search && wall) {
    var items = Array.prototype.slice.call(wall.children);
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (li) {
        var hit = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
        li.classList.toggle('is-hidden', !hit);
        if (hit) visible++;
      });
      if (count) count.textContent = visible + (visible === 1 ? ' brand' : ' brands');
    });
  }

  var chips = document.querySelectorAll('.cat-nav .chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
    });
  });

  var mapEl = document.getElementById('map');
  if (mapEl && window.L) {
    var showroom = [25.3247, 55.3882];
    var factory = [25.5031, 55.5537];
    var map = L.map('map', { scrollWheelZoom: false });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var icon = L.divIcon({
      className: 'wk-pin',
      html: '<span></span>',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -16]
    });
    L.marker(showroom, { icon: icon, title: 'Show Room - Sharjah' }).addTo(map)
      .bindPopup('<strong>Show Room &mdash; Sharjah</strong><br>Jamal Abd Naser St, Sharjah<br><a href="tel:+97165350335">+971 6 535 0335</a>');
    L.marker(factory, { icon: icon, title: 'Factory - Umm Al Quwain' }).addTo(map)
      .bindPopup('<strong>Factory &mdash; Umm Al Quwain</strong><br>New Industrial Area, Umm Al Quwain<br><a href="tel:+971507374998">+971 50 737 4998</a>');
    map.fitBounds(L.latLngBounds([showroom, factory]), { padding: [70, 70] });
  }
})();
