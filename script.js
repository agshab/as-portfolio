// script.js

// Animate code fragments fading in/out on loop
const codeFragments = document.querySelectorAll('.code-fragment');
const circleOutline = document.querySelector('.circle-outline');

function animate() {
  // Reset stroke dashoffset for circle animation
  circleOutline.style.strokeDashoffset = '565.48';

  // Animate circle drawing
  circleOutline.animate(
    [{ strokeDashoffset: 565.48 }, { strokeDashoffset: 0 }],
    {
      duration: 3000,
      fill: 'forwards',
    }
  );

  // Animate code fragments appearing and moving
  codeFragments.forEach((frag, i) => {
    setTimeout(() => {
      frag.animate(
        [
          { opacity: 0, transform: 'translateX(0)' },
          { opacity: 1, transform: 'translateX(20px)' },
          { opacity: 0, transform: 'translateX(40px)' },
        ],
        { duration: 2000, fill: 'forwards' }
      );
    }, 2500 + i * 500);
  });
}

// Run animation in loop every 6 seconds
animate();
setInterval(animate, 6000);
