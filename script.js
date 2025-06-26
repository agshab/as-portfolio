document.addEventListener('DOMContentLoaded', () => {
  const codeFragments = document.querySelectorAll('.code-fragment');
  const squareOutline = document.querySelector('.square-outline');
  const perimeter = 800; // 4 sides * 200 width

  function animate() {
    // Animate square outline
    if (squareOutline) {
      squareOutline.style.strokeDashoffset = perimeter;
      squareOutline.animate(
        [{ strokeDashoffset: perimeter }, { strokeDashoffset: 0 }],
        {
          duration: 3000,
          fill: 'forwards'
        }
      );
    }

    // Animate code fragments fading in/out
    codeFragments.forEach((frag, i) => {
      setTimeout(() => {
        frag.animate(
          [
            { opacity: 0, transform: 'translateX(0)' },
            { opacity: 1, transform: 'translateX(20px)' },
            { opacity: 0, transform: 'translateX(40px)' }
          ],
          {
            duration: 2000,
            fill: 'forwards'
          }
        );
      }, 2500 + i * 500);
    });
  }

  animate();
  setInterval(animate, 6000);

  // Enforce navigation order
  function enforceNavOrder() {
    const desiredOrder = ['Home', 'Resume', 'Portfolio', 'Pinterest', 'Contact'];
    const nav = document.querySelector('nav.right');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a'));
    const linkMap = new Map();

    links.forEach(link => {
      const text = link.textContent.trim().toLowerCase();
      linkMap.set(text, link);
    });

    nav.innerHTML = '';
    desiredOrder.forEach(name => {
      const link = linkMap.get(name.toLowerCase());
      if (link) {
        nav.appendChild(link);
      }
    });
  }

  enforceNavOrder();
});

// Popup functionality for Email and Phone icons
function showPopup(type) {
  const popup = document.getElementById('popup');
  const content = document.getElementById('popup-content');

  if (!popup || !content) return;

  let message = '';
  if (type === 'email') {
    message = 'Email: <a href="mailto:arshiags@gmail.com">arshiags@gmail.com</a>';
  } else if (type === 'phone') {
    message = 'Phone: <a href="tel:+15044956757">504-495-6757</a>';
  }

  content.innerHTML = `
    <div>
      ${message}
      <br />
      <span class="popup-close" onclick="hidePopup()">Close</span>
    </div>
  `;

  popup.style.display = 'flex';
}

function hidePopup() {
  const popup = document.getElementById('popup');
  if (!popup) return;
  popup.style.display = 'none';
}
