/**
 * ============================================================================
 * LUNA MODE — CREATIVE INTERACTION & MOTION ARCHITECTURE
 * TypeScript Controller for Hero Portal, Card Deck Gestures & Editorial Scroll
 * ============================================================================
 */

interface CardDeckState {
  currentIndex: number;
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  cards: HTMLElement[];
}

class LunaModeExperience {
  private heroScrollContainer: HTMLElement | null = null;
  private portalLeft: HTMLElement | null = null;
  private portalRight: HTMLElement | null = null;
  private splitLuna: HTMLElement | null = null;
  private splitMode: HTMLElement | null = null;
  private particle1: HTMLElement | null = null;
  private particle2: HTMLElement | null = null;
  private heroLaptop: HTMLElement | null = null;
  private scrollIndicator: HTMLElement | null = null;
  
  // Lookbook
  private lookbookContainer: HTMLElement | null = null;
  private lookbookTrack: HTMLElement | null = null;
  
  // Campaign
  private campaignImg: HTMLElement | null = null;
  private campaignSection: HTMLElement | null = null;
  
  // Statement
  private statementSection: HTMLElement | null = null;
  private floatingCircle: HTMLElement | null = null;
  
  // Deck
  private deckContainer: HTMLElement | null = null;
  private progressFill: HTMLElement | null = null;
  private progressCurrentText: HTMLElement | null = null;
  private deckState: CardDeckState = {
    currentIndex: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    cards: []
  };

  // Mobile Menu
  private mobileMenuBtn: HTMLElement | null = null;
  private mobileMenuClose: HTMLElement | null = null;
  private mobileDrawer: HTMLElement | null = null;

  private isTicking: boolean = false;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initElements();
      this.initHeroScroll();
      this.initInteractiveCardDeck();
      this.initLookbookScroll();
      this.initMobileMenu();
      this.initImageFallbacks();
      
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      window.addEventListener('resize', () => this.onResize(), { passive: true });
      
      // Initial render
      this.updateScrollPositions();
    });
  }

  private initElements(): void {
    this.heroScrollContainer = document.querySelector('.hero-scroll-container');
    this.portalLeft = document.querySelector('.portal-panel-left');
    this.portalRight = document.querySelector('.portal-panel-right');
    this.splitLuna = document.querySelector('.split-luna');
    this.splitMode = document.querySelector('.split-mode');
    this.particle1 = document.querySelector('.particle-1');
    this.particle2 = document.querySelector('.particle-2');
    this.heroLaptop = document.querySelector('.hero-laptop-container');
    this.scrollIndicator = document.querySelector('.scroll-indicator');

    this.lookbookContainer = document.querySelector('.lookbook-section');
    this.lookbookTrack = document.querySelector('.lookbook-sticky-track');

    this.campaignSection = document.querySelector('.campaign-section');
    this.campaignImg = document.querySelector('.campaign-bg-img');

    this.statementSection = document.querySelector('.editorial-statement-section');
    this.floatingCircle = document.querySelector('.floating-circle-frame');

    this.deckContainer = document.querySelector('.deck-container');
    this.progressFill = document.querySelector('.deck-progress-fill');
    this.progressCurrentText = document.querySelector('.deck-progress-current');

    this.mobileMenuBtn = document.querySelector('.btn-mobile-menu');
    this.mobileMenuClose = document.querySelector('.btn-mobile-close');
    this.mobileDrawer = document.querySelector('.mobile-menu-drawer');
  }

  /* --------------------------------------------------------------------------
     1. HERO PORTAL OPENING ON SCROLL
     -------------------------------------------------------------------------- */
  private initHeroScroll(): void {
    if (!this.heroScrollContainer) return;
    this.updateHeroProgress(0);
  }

  private onScroll(): void {
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.updateScrollPositions();
        this.isTicking = false;
      });
      this.isTicking = true;
    }
  }

  private onResize(): void {
    this.updateScrollPositions();
  }

  private updateScrollPositions(): void {
    const scrollY = window.scrollY;

    // 1. Hero Portal Scroll Progress
    if (this.heroScrollContainer) {
      const rect = this.heroScrollContainer.getBoundingClientRect();
      const containerHeight = this.heroScrollContainer.offsetHeight - window.innerHeight;
      if (containerHeight > 0) {
        const rawProgress = -rect.top / containerHeight;
        const progress = Math.max(0, Math.min(1, rawProgress));
        this.updateHeroProgress(progress);
      }
    }

    // 2. Editorial Statement Floating Parallax
    if (this.statementSection && this.floatingCircle) {
      const rect = this.statementSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const factor = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const rotateDeg = (factor - 0.5) * 16;
        const translateY = (factor - 0.5) * -60;
        this.floatingCircle.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotateDeg}deg)`;
      }
    }

    // 3. Lookbook Horizontal Track Scroll
    if (this.lookbookContainer && this.lookbookTrack) {
      const rect = this.lookbookContainer.getBoundingClientRect();
      const totalScroll = this.lookbookContainer.offsetHeight - window.innerHeight;
      if (totalScroll > 0) {
        const rawProgress = -rect.top / totalScroll;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const maxTranslate = this.lookbookTrack.scrollWidth - window.innerWidth + 80;
        if (maxTranslate > 0) {
          const moveX = progress * -maxTranslate;
          this.lookbookTrack.style.transform = `translate3d(${moveX}px, 0, 0)`;
        }
      }
    }

    // 4. Campaign Full-Width Image Reveal
    if (this.campaignSection && this.campaignImg) {
      const rect = this.campaignSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height * 0.8)));
        const scaleVal = 1.15 - (0.15 * progress);
        const grayscaleVal = Math.max(0, 100 - (100 * progress * 1.2));
        this.campaignImg.style.transform = `scale(${scaleVal})`;
        this.campaignImg.style.filter = `grayscale(${grayscaleVal}%)`;
      }
    }
  }

  private updateHeroProgress(p: number): void {
    // Stage 1 to 5 seamless choreography
    const panelMove = p * 105; // 0% to 105%
    const panelOpacity = Math.max(0, 1 - p * 1.3);
    const panelScale = 1 + p * 0.06;
    const panelBlur = p * 8; // subtle transition blur

    if (this.portalLeft) {
      this.portalLeft.style.transform = `translate3d(-${panelMove}%, 0, 0) scale(${panelScale})`;
      this.portalLeft.style.opacity = `${panelOpacity}`;
      this.portalLeft.style.filter = `blur(${panelBlur}px)`;
    }

    if (this.portalRight) {
      this.portalRight.style.transform = `translate3d(${panelMove}%, 0, 0) scale(${panelScale})`;
      this.portalRight.style.opacity = `${panelOpacity}`;
      this.portalRight.style.filter = `blur(${panelBlur}px)`;
    }

    // Headline typography split: LUNA left, MODE right, letter-spacing -0.03em -> -0.18em
    const textSpread = p * 180; // px displacement
    const textScale = 1 + p * 0.35;
    const textOpacity = Math.max(0, 1 - p * 1.6);
    const letterSpacing = -0.03 - (p * 0.15); // -0.03em to -0.18em

    if (this.splitLuna) {
      this.splitLuna.style.transform = `translate3d(-${textSpread}px, 0, 0) scale(${textScale})`;
      this.splitLuna.style.opacity = `${textOpacity}`;
      this.splitLuna.style.letterSpacing = `${letterSpacing}em`;
    }

    if (this.splitMode) {
      this.splitMode.style.transform = `translate3d(${textSpread}px, 0, 0) scale(${textScale})`;
      this.splitMode.style.opacity = `${textOpacity}`;
      this.splitMode.style.letterSpacing = `${letterSpacing}em`;
    }

    // Accent Particles diagonal flight
    const particleX = p * 42; // vw
    const particleY = p * 38; // vh
    if (this.particle1) {
      this.particle1.style.transform = `translate3d(-${particleX}vw, -${particleY}vh, 0)`;
      this.particle1.style.opacity = `${Math.max(0, 1 - p * 1.2)}`;
    }
    if (this.particle2) {
      this.particle2.style.transform = `translate3d(${particleX}vw, ${particleY}vh, 0)`;
      this.particle2.style.opacity = `${Math.max(0, 1 - p * 1.2)}`;
    }

    // Laptop reveal: translateY 80px -> 0, scale 1.15 -> 1.0, opacity 0 -> 1, rotateX 8deg -> 0, blur 10px -> 0
    const laptopY = Math.max(0, (1 - p) * 80);
    const laptopScale = Math.max(1, 1.15 - (p * 0.15));
    const laptopOpacity = Math.min(1, p * 1.4);
    const laptopRotateX = Math.max(0, (1 - p) * 8);
    const laptopBlur = Math.max(0, (1 - p) * 10);

    if (this.heroLaptop) {
      this.heroLaptop.style.transform = `translateY(${laptopY}px) scale(${laptopScale}) perspective(1200px) rotateX(${laptopRotateX}deg)`;
      this.heroLaptop.style.opacity = `${laptopOpacity}`;
      this.heroLaptop.style.filter = `blur(${laptopBlur}px)`;
    }

    // Indicator fade out
    if (this.scrollIndicator) {
      this.scrollIndicator.style.opacity = `${Math.max(0, 1 - p * 3)}`;
    }
  }

  /* --------------------------------------------------------------------------
     2. LOOKBOOK HORIZONTAL SCROLL
     -------------------------------------------------------------------------- */
  private initLookbookScroll(): void {
    // Handled in onScroll with responsive bounds
  }

  /* --------------------------------------------------------------------------
     3. INTERACTIVE CARD DECK (Gesture / Drag / Throw)
     -------------------------------------------------------------------------- */
  private initInteractiveCardDeck(): void {
    if (!this.deckContainer) return;
    const cards = Array.from(this.deckContainer.querySelectorAll<HTMLElement>('.deck-card'));
    if (!cards.length) return;

    this.deckState.cards = cards;
    this.updateCardPositions();

    cards.forEach((card) => {
      this.attachDeckEvents(card);
    });

    const resetBtn = document.querySelector('.btn-deck-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetDeck());
    }
  }

  private attachDeckEvents(card: HTMLElement): void {
    const onPointerDown = (e: PointerEvent) => {
      const topIndex = this.deckState.currentIndex % this.deckState.cards.length;
      if (card !== this.deckState.cards[topIndex]) return;

      this.deckState.isDragging = true;
      this.deckState.startX = e.clientX;
      this.deckState.startY = e.clientY;
      this.deckState.currentX = e.clientX;
      this.deckState.currentY = e.clientY;

      card.classList.remove('is-returning');
      card.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!this.deckState.isDragging) return;
      const topIndex = this.deckState.currentIndex % this.deckState.cards.length;
      if (card !== this.deckState.cards[topIndex]) return;

      this.deckState.currentX = e.clientX;
      this.deckState.currentY = e.clientY;

      const deltaX = this.deckState.currentX - this.deckState.startX;
      const deltaY = this.deckState.currentY - this.deckState.startY;
      const rotation = deltaX * 0.1; // rotation = displacement * 0.1

      card.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotation}deg)`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!this.deckState.isDragging) return;
      this.deckState.isDragging = false;

      const deltaX = this.deckState.currentX - this.deckState.startX;
      const containerWidth = this.deckContainer ? this.deckContainer.offsetWidth : 380;
      const threshold = containerWidth * 0.20; // 20% threshold

      if (Math.abs(deltaX) > threshold) {
        // Throw out card!
        const direction = deltaX > 0 ? 1 : -1;
        this.throwCard(card, direction);
      } else {
        // Return smoothly to stack center with cubic-bezier(0.2, 0.8, 0.2, 1)
        this.returnCard(card);
      }

      try {
        card.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignored
      }
    };

    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerup', onPointerUp);
    card.addEventListener('pointercancel', onPointerUp);
  }

  private throwCard(card: HTMLElement, direction: number): void {
    if (direction > 0) {
      card.classList.add('is-thrown');
    } else {
      card.classList.add('is-thrown-left');
    }

    setTimeout(() => {
      this.deckState.currentIndex++;
      this.updateCardPositions();
      this.updateProgressIndicator();
    }, 320);
  }

  private returnCard(card: HTMLElement): void {
    card.classList.add('is-returning');
    const initialRotations = [-4, 2, -1, 3];
    const baseRotation = initialRotations[0];
    card.style.transform = `translate3d(0, 0, 0) rotate(${baseRotation}deg)`;
  }

  private updateCardPositions(): void {
    const total = this.deckState.cards.length;
    const initialRotations = [-4, 2, -1, 3];
    const initialScales = [1, 0.96, 0.92, 0.88];
    const initialY = [0, 14, 28, 42];

    this.deckState.cards.forEach((card, index) => {
      const order = (index - (this.deckState.currentIndex % total) + total) % total;

      card.classList.remove('is-thrown', 'is-thrown-left', 'is-returning');
      card.style.zIndex = `${total - order}`;
      card.style.opacity = '1';
      card.style.pointerEvents = order === 0 ? 'auto' : 'none';

      const rot = initialRotations[order] !== undefined ? initialRotations[order] : 0;
      const sc = initialScales[order] !== undefined ? initialScales[order] : 0.88;
      const ty = initialY[order] !== undefined ? initialY[order] : 36;

      card.style.transform = `translate3d(0, ${ty}px, -${order * 15}px) scale(${sc}) rotate(${rot}deg)`;
    });
  }

  private updateProgressIndicator(): void {
    const total = this.deckState.cards.length || 4;
    const current = (this.deckState.currentIndex % total) + 1;
    if (this.progressCurrentText) {
      this.progressCurrentText.textContent = `0${current} / 0${total}`;
    }
    if (this.progressFill) {
      const pct = (current / total) * 100;
      this.progressFill.style.width = `${pct}%`;
    }
  }

  private resetDeck(): void {
    this.deckState.currentIndex = 0;
    this.updateCardPositions();
    this.updateProgressIndicator();
  }

  /* --------------------------------------------------------------------------
     4. MOBILE NAVIGATION
     -------------------------------------------------------------------------- */
  private initMobileMenu(): void {
    if (!this.mobileMenuBtn || !this.mobileDrawer) return;

    this.mobileMenuBtn.addEventListener('click', () => {
      this.mobileDrawer?.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      this.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    });

    const closeDrawer = () => {
      this.mobileDrawer?.classList.remove('is-active');
      document.body.style.overflow = '';
      this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    };

    if (this.mobileMenuClose) {
      this.mobileMenuClose.addEventListener('click', closeDrawer);
    }

    const drawerLinks = this.mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileDrawer?.classList.contains('is-active')) {
        closeDrawer();
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. IMAGE RESILIENCE & FALLBACKS
     -------------------------------------------------------------------------- */
  private initImageFallbacks(): void {
    const images = document.querySelectorAll<HTMLImageElement>('img');
    images.forEach((img) => {
      let attempts = 0;
      const originalSrc = img.getAttribute('src') || '';
      const fallbackSrc = img.getAttribute('data-fallback') || '';

      const filename = originalSrc.split('/').pop() || '';
      const fallbackFilename = fallbackSrc.split('/').pop() || '';

      const candidates = [
        originalSrc,
        fallbackSrc,
        'assets/' + filename,
        filename,
        'assets/' + fallbackFilename,
        fallbackFilename,
        'assets/' + filename.replace(/ /g, '_'),
        'assets/' + filename.replace(/_/g, ' '),
        filename.replace(/ /g, '_'),
        filename.replace(/_/g, ' ')
      ].filter((val, idx, self) => val && self.indexOf(val) === idx);

      const handleError = () => {
        attempts++;
        if (attempts < candidates.length) {
          img.src = candidates[attempts];
        } else {
          img.removeEventListener('error', handleError);
          img.style.backgroundColor = '#15191E';
          img.style.display = 'block';
        }
      };

      img.addEventListener('error', handleError);
    });
  }
}

// Instantiate
new LunaModeExperience();
