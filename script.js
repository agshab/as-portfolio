document.addEventListener('DOMContentLoaded', () => {
  // Animate square outline and code fragments
  const codeFragments = document.querySelectorAll('.code-fragment');
  const squareOutline = document.querySelector('.square-outline');
  const perimeter = 800;

  function animate() {
    if (squareOutline) {
      squareOutline.style.strokeDashoffset = perimeter;
      squareOutline.animate(
        [{ strokeDashoffset: perimeter }, { strokeDashoffset: 0 }],
        { duration: 3000, fill: 'forwards' }
      );
    }

    codeFragments.forEach((frag, i) => {
      setTimeout(() => {
        frag.animate(
          [
            { opacity: 0, transform: 'translateX(0)' },
            { opacity: 1, transform: 'translateX(20px)' },
            { opacity: 0, transform: 'translateX(40px)' }
          ],
          { duration: 2000, fill: 'forwards' }
        );
      }, 2500 + i * 500);
    });
  }

  animate();
  setInterval(animate, 6000);

  // Smooth scrolling ONLY for internal anchor links on this page (href starting with '#')
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dropdown toggle functionality for all pages (consistent, clean)
  const navToggle = document.getElementById('nav-toggle');
  const dropdownMenu = document.getElementById('dropdown-menu');

  if (navToggle && dropdownMenu) {
    const toggleMenu = () => {
      const isHidden = dropdownMenu.classList.toggle('hidden');
      navToggle.setAttribute('aria-expanded', (!isHidden).toString());
    };

    navToggle.addEventListener('click', e => {
      e.stopPropagation(); // Prevent event bubbling to document
      toggleMenu();
    });

    navToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', e => {
      if (
        !navToggle.contains(e.target) &&
        !dropdownMenu.contains(e.target) &&
        !dropdownMenu.classList.contains('hidden')
      ) {
        dropdownMenu.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close dropdown when clicking any link inside menu
    dropdownMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        dropdownMenu.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Popup functions to show/hide contact info modal (email or phone)
  function showPopup(type) {
    const popup = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    if (!popup || !content) return;

    let message = '';
    if (type === 'email')
      message = 'Email: <a href="mailto:arshiags@gmail.com">arshiags@gmail.com</a>';
    else if (type === 'phone')
      message = 'Phone: <a href="tel:+15044956757">504-495-6757</a>';

    content.innerHTML = `
      <div>
        ${message}<br />
        <span class="popup-close" onclick="hidePopup()" style="cursor:pointer; color:#007BFF;">Close</span>
      </div>
    `;
    popup.style.display = 'flex';
  }

  function hidePopup() {
    const popup = document.getElementById('popup');
    if (popup) popup.style.display = 'none';
  }

  // Expose popup functions globally
  window.showPopup = showPopup;
  window.hidePopup = hidePopup;
});
