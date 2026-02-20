document.addEventListener('DOMContentLoaded', function () {
  var toggles = document.querySelectorAll('[data-mobile-nav-toggle]');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var target = document.querySelector(toggle.getAttribute('data-target'));
      if (!target) return;

      var isOpen = target.getAttribute('data-open') === 'true';
      target.setAttribute('data-open', String(!isOpen));
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });
});
