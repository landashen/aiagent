(function() {
  // Toggle sidebar on mobile
  var hamburger = document.querySelector('.hamburger');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Expand / collapse nav items
  document.querySelectorAll('.nav-link[data-toggle]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var item = this.closest('.nav-item');
      item.classList.toggle('expanded');
    });
  });

  // Auto-expand current chapter in sidebar
  var current = document.querySelector('.nav-link.active');
  if (current) {
    var item = current.closest('.nav-item');
    if (item) item.classList.add('expanded');
  }

  // Scroll-spy: highlight current section in sidebar
  var headings = [];
  document.querySelectorAll('.content h2[id]').forEach(function(h) {
    headings.push(h);
  });

  if (headings.length > 0) {
    var subLinks = document.querySelectorAll('.sub-nav a');
    function onScroll() {
      var scrollY = window.scrollY + 100;
      var currentId = '';
      for (var i = headings.length - 1; i >= 0; i--) {
        if (headings[i].offsetTop <= scrollY) {
          currentId = headings[i].id;
          break;
        }
      }
      subLinks.forEach(function(a) {
        if (a.getAttribute('href') === '#' + currentId) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();