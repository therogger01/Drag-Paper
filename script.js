let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  lastX = 0;
  lastY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // --- Mouse Events ---
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ++;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      // If right-click, enable rotation
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;
      // Calculate the movement delta
      const deltaX = e.clientX - this.lastX;
      const deltaY = e.clientY - this.lastY;
      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      // If rotating, compute the angle relative to the initial touch point
      if (this.rotating) {
        const angle = Math.atan2(e.clientY - this.mouseTouchY, e.clientX - this.mouseTouchX);
        this.rotation = angle * (180 / Math.PI);
      }
      paper.style.transform = translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg);
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Prevent the context menu (right-click) from showing up
    paper.addEventListener('contextmenu', (e) => e.preventDefault());

    // --- Touch Events for Mobile ---
    paper.addEventListener('touchstart', (e) => {
      // Using {passive: false} so that we can call preventDefault
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ++;
      const touch = e.touches[0];
      this.mouseTouchX = touch.clientX;
      this.mouseTouchY = touch.clientY;
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;
    }, { passive: false });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.lastX;
      const deltaY = touch.clientY - this.lastY;
      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;
      this.lastX = touch.clientX;
      this.lastY = touch.clientY;
      // Note: Touch rotation is not implemented here.
      paper.style.transform = translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg);
    }, { passive: false });

    paper.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.holdingPaper = false;
      this.rotating = false;
    }, { passive: false });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
