// Cloth simulation parameters
const clothWidth = 20;
const clothHeight = 20;
const clothSpacing = 25;
const clothStartX = 100;
const clothStartY = 50;
const gravity = 0.1;
const friction = 0.98;

// Get canvas element
const canvas = document.getElementById('clothCanvas');
const ctx = canvas.getContext('2d');

// Create cloth
const cloth = [];
for (let y = 0; y < clothHeight; y++) {
  for (let x = 0; x < clothWidth; x++) {
    const posX = clothStartX + x * clothSpacing;
    const posY = clothStartY + y * clothSpacing;
    const point = {
      x: posX,
      y: posY,
      prevX: posX,
      prevY: posY,
      pinned: y === 0
    };
    cloth.push(point);
  }
}

// Animate cloth
function animateCloth() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Apply forces to cloth points
  for (let i = 0; i < cloth.length; i++) {
    const point = cloth[i];
    if (!point.pinned) {
      const velX = point.x - point.prevX;
      const velY = point.y - point.prevY;
      point.prevX = point.x;
      point.prevY = point.y;
      point.x += velX * friction;
      point.y += velY * friction;
      point.y += gravity;
    }
  }
  
  // Draw cloth
  ctx.beginPath();
  for (let i = 0; i < cloth.length; i++) {
    const point = cloth[i];
    if (i % clothWidth !== clothWidth - 1) {
      const nextPoint = cloth[i + 1];
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
    }
    if (i < cloth.length - clothWidth) {
      const downPoint = cloth[i + clothWidth];
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(downPoint.x, downPoint.y);
    }
  }
  ctx.strokeStyle = 'black';
  ctx.stroke();
  
  requestAnimationFrame(animateCloth);
}

// Start animation
animateCloth();
