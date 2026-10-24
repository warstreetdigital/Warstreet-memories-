/**
 * WarStreet Memories — Bryan Mabani 27th Birthday & 1st Anniversary Keepsake Controller
 * Template reference: Stella Aaliyah Dinar Keepsake
 * Pure Vanilla JavaScript (Zero frameworks, zero dependencies)
 */

(function () {
  'use strict';

  const AUDIO_URL = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/May%20to%20Bryan/Nyasha_David_-_Ndagonyera__Official_Video_(48k).mp3";
  const CANONICAL_URL = "https://warstreetmemories.enterharare.online/birthdays/bryan-mabani/";
  const COVER_PORTRAIT_URL = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/May%20to%20Bryan/bryan_01.webp";
  const HERO_PORTRAIT_URL = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/May%20to%20Bryan/may_11.webp";

  const R2_BASE = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/May%20to%20Bryan/";

  // Confirmed Photo Slots Registry (Cover)
  const BRYAN_PHOTOS = {
    cover: COVER_PORTRAIT_URL // Opening Cover Portrait on landing page (bryan_01.webp)
  };

  /**
   * Section 2: Bryan Mabani 27th Birthday Keepsake Gallery Registry
   * Exact 14 gallery entries in authoritative order:
   * 1. bryan_02.webp
   * 2. bryan_03.webp
   * 3. bryan_04.webp
   * 4. bryan_05.webp
   * 5. bryan_06.webp
   * 6. bryan_07.webp
   * 7. bryan_08.webp
   * 8. bryan_09.webp
   * 9. bryan_10.webp
   * 10. may_11.webp
   * 11. may_12.webp
   * 12. may_13.webp
   * 13. may_14.webp
   * 14. may_15.webp
   */
  const BRYAN_GALLERY_FILENAMES = [
    'bryan_02.webp',
    'bryan_03.webp',
    'bryan_04.webp',
    'bryan_05.webp',
    'bryan_06.webp',
    'bryan_07.webp',
    'bryan_08.webp',
    'bryan_09.webp',
    'bryan_10.webp',
    'may_11.webp',
    'may_12.webp',
    'may_13.webp',
    'may_14.webp',
    'may_15.webp'
  ];

  const BRYAN_BIRTHDAY_MEDIA = BRYAN_GALLERY_FILENAMES.map((filename, i) => {
    const num = i + 1;
    const url = `${R2_BASE}${filename}`;
    return {
      num,
      id: `bryan-memory-${String(num).padStart(2, '0')}`,
      type: 'photo',
      title: filename,
      thumbUrl: url,
      fullUrl: url,
      alt: `Bryan Mabani birthday memory ${num}`,
      status: 'ready'
    };
  });

  let singleAudioInstance = null;
  let experienceInitiated = false;
  let audioHasEnded = false;

  document.addEventListener('DOMContentLoaded', () => {
    initExperienceFlow();
    initPhotoSlots();
    initPortraitSlideshow();
    initLetterModal();
    initBirthdayGallery();
  });

  /**
   * Sets up Opening Cover -> Cinematic Sequence -> Full Memory Experience
   */
  function initExperienceFlow() {
    const btnBegin = document.getElementById('btn-begin-memory');
    const openingCover = document.getElementById('bryan-opening-cover');
    const memoryBody = document.getElementById('bryan-memory-body');
    const audioPill = document.getElementById('audio-pill');
    const audioStatusLabel = document.getElementById('audio-status-label');

    if (!btnBegin || !openingCover || !memoryBody) return;

    // Direct memory preview shortcut support
    if (document.documentElement.classList.contains('preview-direct-memory')) {
      openingCover.classList.add('is-dismissed');
      openingCover.setAttribute('aria-hidden', 'true');
      memoryBody.classList.add('is-revealed');
      if (audioPill) {
        audioPill.classList.add('is-active');
      }
    }

    // Single-tap initiation handler
    btnBegin.addEventListener('click', () => {
      if (experienceInitiated) return;
      experienceInitiated = true;
      btnBegin.disabled = true;

      // 1. Immediately start the assigned song at tap moment
      startCombinedAudio(audioPill, audioStatusLabel);

      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        openingCover.classList.add('is-experience-started', 'stage-awakening');
        setTimeout(() => {
          openingCover.classList.add('stage-enter-memories');
          memoryBody.classList.add('is-revealed');
        }, 1200);
        setTimeout(() => {
          openingCover.classList.add('is-dismissed');
          if (audioPill) audioPill.classList.add('is-active');
          window.scrollTo({ top: 0, behavior: 'instant' });
          openingCover.setAttribute('aria-hidden', 'true');
        }, 2600);
        return;
      }

      // Phase 1 — Awakening (0–3s)
      openingCover.classList.add('is-experience-started', 'stage-awakening');

      // Phase 2 — Sequential Dissolution (3–7s in exact specified order)
      // 1. The button dissolves first (at 3.0s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-button');
      }, 3000);

      // 2. The dedication fades away (at 4.2s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-dedication');
      }, 4200);

      // 3. Heading fades away (at 5.4s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-heading');
      }, 5400);

      // 4. Name disappears from photograph (at 6.4s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-name');
      }, 6400);

      // Phase 3 — The universe emerges (7–11s)
      const coverUniverse = document.getElementById('cover-universe');
      setTimeout(() => {
        openingCover.classList.add('stage-universe-emerges');
        if (coverUniverse) {
          coverUniverse.classList.add('is-active');
        }
      }, 7200);

      // Phase 4 — Personal dedication (11–16s)
      const coverInterstitial = document.getElementById('cover-interstitial');
      setTimeout(() => {
        openingCover.classList.add('stage-dedication-emerges');
        if (coverInterstitial) {
          coverInterstitial.classList.add('is-active');
        }
      }, 11000);

      setTimeout(() => {
        openingCover.classList.add('stage-progress-animating');
      }, 11800);

      // Phase 5 — Enter the memories (16–20s)
      setTimeout(() => {
        openingCover.classList.add('stage-enter-memories');
        memoryBody.classList.add('is-revealed');
      }, 16000);

      // Final Transition Complete (at ~20s)
      setTimeout(() => {
        openingCover.classList.add('is-dismissed');
        if (audioPill) {
          audioPill.classList.add('is-active');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        openingCover.setAttribute('aria-hidden', 'true');
      }, 20000);
    });

    // Discreet Audio Pill Toggle (Play / Pause without loop or restart)
    if (audioPill) {
      audioPill.addEventListener('click', () => {
        if (!singleAudioInstance) {
          startCombinedAudio(audioPill, audioStatusLabel);
          return;
        }

        if (singleAudioInstance.paused && !audioHasEnded) {
          singleAudioInstance.play().catch(err => {
            console.warn("Audio resume prevented:", err);
          });
        } else if (!singleAudioInstance.paused) {
          singleAudioInstance.pause();
        }
      });
    }
  }

  /**
   * Instantiates and starts the single audio recording
   */
  function startCombinedAudio(pillEl, labelEl) {
    if (!singleAudioInstance) {
      singleAudioInstance = new Audio(AUDIO_URL);
      singleAudioInstance.loop = false; // Strictly play once
      singleAudioInstance.preload = 'auto';

      singleAudioInstance.addEventListener('play', () => {
        if (pillEl) pillEl.classList.add('is-playing');
        if (labelEl) labelEl.textContent = 'Audio';
      });

      singleAudioInstance.addEventListener('pause', () => {
        if (pillEl) pillEl.classList.remove('is-playing');
        if (labelEl) labelEl.textContent = 'Paused';
      });

      singleAudioInstance.addEventListener('ended', () => {
        audioHasEnded = true;
        if (pillEl) pillEl.classList.remove('is-playing');
        if (labelEl) labelEl.textContent = 'Finished';
      });

      singleAudioInstance.addEventListener('error', (e) => {
        console.warn("Audio resource error or network restriction:", e);
        if (pillEl) pillEl.classList.remove('is-playing');
        if (labelEl) labelEl.textContent = 'Audio';
      });
    }

    const playPromise = singleAudioInstance.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Audio playback gesture rejection:", error);
        if (pillEl) pillEl.classList.remove('is-playing');
        if (labelEl) labelEl.textContent = 'Audio';
      });
    }
  }

  /**
   * Manages confirmed portrait image loading in Cover and Section 1
   */
  function initPhotoSlots() {
    Object.keys(BRYAN_PHOTOS).forEach(slotKey => {
      const url = BRYAN_PHOTOS[slotKey];
      const container = document.querySelector(`[data-photo-slot="${slotKey}"]`);
      if (!container) return;

      const existingImg = container.querySelector('img');
      if (existingImg && existingImg.src === url) return;

      if (existingImg) existingImg.remove();

      const img = document.createElement('img');
      img.src = url;
      img.alt = container.getAttribute('data-caption') || 'Bryan Mabani';
      img.className = slotKey === 'cover' ? 'cover-portrait-img' : 'portrait-intro-img';
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.decoding = 'async';

      const fallback = container.querySelector('.cover-fallback-portrait');
      img.onload = () => {
        if (fallback) fallback.style.display = 'none';
      };
      img.onerror = () => {
        img.classList.add('is-hidden');
        if (fallback && slotKey === 'cover') fallback.classList.add('is-visible');
      };

      if (fallback) {
        fallback.style.display = 'none';
      }
      container.prepend(img);
    });
  }

  /**
   * ==========================================================================
   * SECTION 1: FIVE-PHOTO PORTRAIT SLIDESHOW CONTROLLER
   * Photos: may_11.webp (first/initial), may_12.webp, may_13.webp, may_14.webp, may_15.webp
   * Advance interval: 4 seconds
   * Interaction: Play/Pause button, 5 position dots, swipe navigation, tap-to-pause
   * ==========================================================================
   */
  let currentSlideIndex = 0;
  let isSlideshowPlaying = false;
  let slideshowTimer = null;
  const SLIDESHOW_INTERVAL_MS = 4000;

  function initPortraitSlideshow() {
    const viewport = document.getElementById('portrait-slideshow-viewport');
    const slides = document.querySelectorAll('.portrait-slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    const btnToggle = document.getElementById('slideshow-btn-toggle');
    const btnPrev = document.getElementById('slideshow-btn-prev');
    const btnNext = document.getElementById('slideshow-btn-next');
    const iconPlay = btnToggle ? btnToggle.querySelector('.slideshow-icon-play') : null;
    const iconPause = btnToggle ? btnToggle.querySelector('.slideshow-icon-pause') : null;
    const labelPlay = document.getElementById('slideshow-label');
    const badgeIndex = document.getElementById('slideshow-badge-index');

    if (!viewport || slides.length === 0) return;

    // Gracefully handle image load errors on all slides
    slides.forEach((slide) => {
      const img = slide.querySelector('img');
      if (img) {
        img.addEventListener('error', () => {
          console.warn('Slideshow image load notice:', img.src);
        });
      }
    });

    function setSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      currentSlideIndex = index;

      slides.forEach((slide, i) => {
        if (i === currentSlideIndex) {
          slide.classList.add('is-active');
        } else {
          slide.classList.remove('is-active');
        }
      });

      dots.forEach((dot, i) => {
        if (i === currentSlideIndex) {
          dot.classList.add('is-active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('is-active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      if (badgeIndex) {
        badgeIndex.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
      }
    }

    function startPlayback() {
      if (isSlideshowPlaying) return;
      isSlideshowPlaying = true;
      if (btnToggle) {
        btnToggle.classList.add('is-playing');
        btnToggle.setAttribute('aria-pressed', 'true');
        btnToggle.setAttribute('aria-label', 'Pause slideshow');
      }
      if (iconPlay) iconPlay.classList.add('is-visually-hidden');
      if (iconPause) iconPause.classList.remove('is-visually-hidden');
      if (labelPlay) labelPlay.textContent = 'Pause';

      clearInterval(slideshowTimer);
      slideshowTimer = setInterval(() => {
        setSlide(currentSlideIndex + 1);
      }, SLIDESHOW_INTERVAL_MS);
    }

    function pausePlayback() {
      if (!isSlideshowPlaying) return;
      isSlideshowPlaying = false;
      if (btnToggle) {
        btnToggle.classList.remove('is-playing');
        btnToggle.setAttribute('aria-pressed', 'false');
        btnToggle.setAttribute('aria-label', 'Play slideshow');
      }
      if (iconPlay) iconPlay.classList.remove('is-visually-hidden');
      if (iconPause) iconPause.classList.add('is-visually-hidden');
      if (labelPlay) labelPlay.textContent = 'Play';

      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }

    function togglePlayback() {
      if (isSlideshowPlaying) {
        pausePlayback();
      } else {
        startPlayback();
      }
    }

    // Play/Pause button handler
    if (btnToggle) {
      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayback();
      });
    }

    // Previous and Next buttons (manual navigation resets interval if currently playing)
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlide(currentSlideIndex - 1);
        if (isSlideshowPlaying) {
          clearInterval(slideshowTimer);
          slideshowTimer = setInterval(() => setSlide(currentSlideIndex + 1), SLIDESHOW_INTERVAL_MS);
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlide(currentSlideIndex + 1);
        if (isSlideshowPlaying) {
          clearInterval(slideshowTimer);
          slideshowTimer = setInterval(() => setSlide(currentSlideIndex + 1), SLIDESHOW_INTERVAL_MS);
        }
      });
    }

    // Dot indicators click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlide(index);
        if (isSlideshowPlaying) {
          clearInterval(slideshowTimer);
          slideshowTimer = setInterval(() => setSlide(currentSlideIndex + 1), SLIDESHOW_INTERVAL_MS);
        }
      });
    });

    // Touch swipe support and tap toggle on viewport
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchHandled = false;

    viewport.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      touchHandled = false;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const elapsed = Date.now() - touchStartTime;

      // Check horizontal swipe
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        touchHandled = true;
        if (deltaX < 0) {
          // Swipe left -> next
          setSlide(currentSlideIndex + 1);
        } else {
          // Swipe right -> prev
          setSlide(currentSlideIndex - 1);
        }
        if (isSlideshowPlaying) {
          clearInterval(slideshowTimer);
          slideshowTimer = setInterval(() => setSlide(currentSlideIndex + 1), SLIDESHOW_INTERVAL_MS);
        }
        return;
      }

      // Check gentle tap
      if (Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12 && elapsed < 400) {
        touchHandled = true;
        togglePlayback();
      }
    }, { passive: true });

    // Desktop click handler (only when not already handled by touch)
    viewport.addEventListener('click', () => {
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      togglePlayback();
    });

    // Keyboard accessibility for viewport
    viewport.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlayback();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSlide(currentSlideIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSlide(currentSlideIndex - 1);
      }
    });
  }

  /**
   * SECTION 1.5: MAY'S LETTER MODAL OVERLAY CONTROLLER
   */
  let savedLetterScrollY = 0;

  function initLetterModal() {
    const btnOpen = document.getElementById('btn-open-letter');
    const modal = document.getElementById('letter-modal');
    const btnClose = document.getElementById('btn-close-letter');
    const modalBackdrop = modal ? modal.querySelector('.letter-modal-backdrop-click') : null;

    if (!btnOpen || !modal) return;

    btnOpen.addEventListener('click', () => {
      openLetterModal();
    });

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        closeLetterModal();
      });
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', () => {
        closeLetterModal();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (modal.hasAttribute('hidden')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLetterModal();
      }
    });

    function openLetterModal() {
      savedLetterScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.top = `-${savedLetterScrollY}px`;
      document.body.classList.add('letter-modal-open');

      modal.removeAttribute('hidden');
      btnOpen.setAttribute('aria-expanded', 'true');

      if (btnClose) {
        btnClose.focus();
      }
    }

    function closeLetterModal() {
      if (modal.hasAttribute('hidden')) return;

      modal.setAttribute('hidden', '');
      btnOpen.setAttribute('aria-expanded', 'false');

      document.body.classList.remove('letter-modal-open');
      document.body.style.top = '';
      window.scrollTo(0, savedLetterScrollY);

      btnOpen.focus();
    }
  }

  /* ==========================================================================
     SECTION TWO: BRYAN'S BIRTHDAY GALLERY & FULL-SCREEN LIGHTBOX VIEWER
     ========================================================================== */

  let activeViewerIndex = 0;
  let savedScrollY = 0;

  function initBirthdayGallery() {
    const gridEl = document.getElementById('birthday-gallery-grid');
    if (!gridEl) return;

    initLightboxViewer();
    renderGalleryGrid(gridEl);
  }

  function renderGalleryGrid(gridEl) {
    gridEl.innerHTML = '';
    const section = gridEl.closest('.memory-gallery-section');

    if (BRYAN_BIRTHDAY_MEDIA.length === 0) {
      if (section) section.style.display = 'none';
      return;
    }

    if (section) section.style.display = '';

    BRYAN_BIRTHDAY_MEDIA.forEach((item, index) => {
      const cell = document.createElement('div');
      cell.className = 'gallery-item';
      cell.setAttribute('role', 'button');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-label', item.alt || `Birthday photo ${index + 1}`);
      cell.dataset.index = index;

      const img = document.createElement('img');
      img.src = item.thumbUrl || item.fullUrl;
      img.alt = item.alt || `Bryan Mabani birthday photo ${index + 1}`;
      img.className = 'gallery-item-media';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function () {
        this.classList.add('is-hidden');
        const parent = this.closest('.gallery-item');
        if (parent) parent.style.display = 'none';
      };
      cell.appendChild(img);

      // Tap / Click to open full-screen viewer
      cell.addEventListener('click', () => openLightbox(index));
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      gridEl.appendChild(cell);
    });
  }

  function initLightboxViewer() {
    const lightbox = document.getElementById('gallery-lightbox');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');
    const stage = document.getElementById('lightbox-stage');
    const backdrop = document.getElementById('lightbox-backdrop');

    if (!lightbox) return;

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
    window.addEventListener('keydown', (e) => {
      if (lightbox.hasAttribute('hidden')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateLightbox(1);
      }
    });

    // Touch Swipe Navigation on Mobile Viewports
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isSwiping = false;

    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isSwiping = true;
      }, { passive: true });

      stage.addEventListener('touchmove', (e) => {
        if (!isSwiping || e.touches.length !== 1) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - touchStartX;
        const diffY = currentY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 12) {
          if (e.cancelable) e.preventDefault();
        }
      }, { passive: false });

      stage.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        const elapsed = Date.now() - touchStartTime;

        if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            navigateLightbox(1); // Swipe left -> Next item
          } else {
            navigateLightbox(-1); // Swipe right -> Previous item
          }
        } else if (diffY > 80 && Math.abs(diffX) < 45 && elapsed < 450) {
          // Swipe down to dismiss
          closeLightbox();
        }
      }, { passive: true });
    }
  }

  function openLightbox(index) {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) return;

    activeViewerIndex = index;

    // Lock background scroll and preserve exact page scroll offset
    savedScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.top = `-${savedScrollY}px`;
    document.body.classList.add('gallery-viewer-open');

    lightbox.removeAttribute('hidden');
    renderLightboxItem(activeViewerIndex);

    const stage = document.getElementById('lightbox-stage');
    if (stage) stage.focus();
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    const mediaContainer = document.getElementById('lightbox-media-container');
    if (mediaContainer) {
      mediaContainer.innerHTML = '';
    }

    lightbox.setAttribute('hidden', '');

    // Restore background scrolling and exact scroll position
    document.body.classList.remove('gallery-viewer-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScrollY);

    // Return focus to thumbnail
    const thumb = document.querySelector(`.gallery-item[data-index="${activeViewerIndex}"]`);
    if (thumb) thumb.focus();
  }

  function navigateLightbox(direction) {
    const total = BRYAN_BIRTHDAY_MEDIA.length;
    if (total === 0) return;

    let nextIndex = activeViewerIndex + direction;
    if (nextIndex < 0) nextIndex = total - 1;
    if (nextIndex >= total) nextIndex = 0;

    activeViewerIndex = nextIndex;
    renderLightboxItem(activeViewerIndex);
  }

  function renderLightboxItem(index) {
    const item = BRYAN_BIRTHDAY_MEDIA[index];
    const mediaContainer = document.getElementById('lightbox-media-container');
    const counter = document.getElementById('lightbox-counter');
    if (!item || !mediaContainer) return;

    if (counter) {
      counter.textContent = `${index + 1} / ${BRYAN_BIRTHDAY_MEDIA.length}`;
    }

    mediaContainer.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'lightbox-active-img';
    const displaySrc = item.fullUrl || item.thumbUrl;
    img.src = displaySrc;
    img.alt = item.alt || "Bryan Mabani birthday memory";
    img.decoding = 'async';
    img.onerror = function () {
      this.classList.add('is-hidden');
    };
    mediaContainer.appendChild(img);
  }

  // Window registry for future updates and dynamic media population
  window.BryanKeepsake = {
    photos: BRYAN_PHOTOS,
    galleryMedia: BRYAN_BIRTHDAY_MEDIA,
    updatePhoto: function (slot, url) {
      if (BRYAN_PHOTOS[slot] !== undefined) {
        BRYAN_PHOTOS[slot] = url;
        initPhotoSlots();
      }
    }
  };
})();
