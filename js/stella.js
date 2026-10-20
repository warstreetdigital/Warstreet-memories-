/**
 * WarStreet Memories — Stella Aaliyah Dinar Personal Keepsake Controller
 * Pure Vanilla JavaScript (Zero frameworks, zero dependencies)
 * 
 * AUDIO ARCHITECTURE:
 * Exact single continuous audio file combining voice greeting and favourite song:
 * https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/stella-Aaliyah-Dinar/stellablackbirthday.mp3
 * 
 * Rules:
 * - Playback initiates immediately upon visitor tap of "Tap Here, Stella ♛".
 * - Exactly one Audio instance created and managed.
 * - Loop disabled (plays once to completion).
 * - Never restarts or interrupts during 7-second transition, scrolling, or gallery browsing.
 * - Discreet audio controls allow manual Pause/Resume without restarting.
 */

(function () {
  'use strict';

  const AUDIO_URL = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/stella-Aaliyah-Dinar/stellablackbirthday.mp3";
  const CANONICAL_URL = "https://warstreetmemories.enterharare.online/birthdays/stella-aaliyah-dinar/";
  const OFFICIAL_PORTRAIT_URL = "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/warstreetmemories/2026%20Memories/Birthdays/stella-Aaliyah-Dinar/aaliyah_selfie_lip_tint_fixed.webp";

  // Confirmed Photo Slots Registry (Section 1 and Cover)
  const STELLA_PHOTOS = {
    cover: OFFICIAL_PORTRAIT_URL, // Opening Cover Portrait on landing page only (retains external URL per Rule 2)
    hero: "/images/stella-portrait.webp"   // Section 1 Portrait Intro inside memory page
  };

  /**
   * Section 2: Dynamic Local Asset Gallery Registry
   * Dynamically loads only verified local assets from repository root in numerical order:
   * ./stella-1.webp, ./stella-2.webp, ./stella-3.webp, etc.
   * Completely static-compatible; skips missing numbers, no broken icons, no empty tiles.
   */
  const AALIYAH_BIRTHDAY_MEDIA = [];

  async function probeImage(src) {
    try {
      if (typeof fetch === 'function') {
        const res = await fetch(src, { method: 'HEAD', cache: 'default' });
        if (res.ok) {
          const type = res.headers.get('content-type') || '';
          if (type.includes('image')) {
            return { src, exists: true };
          }
        }
        return { src, exists: false };
      }
    } catch (_) {
      // Offline/CORS fallback to Image loader
    }

    return new Promise((resolve) => {
      const img = new Image();
      let settled = false;
      img.onload = () => {
        if (settled) return;
        settled = true;
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          resolve({ src, exists: true });
        } else {
          resolve({ src, exists: false });
        }
      };
      img.onerror = () => {
        if (settled) return;
        settled = true;
        resolve({ src, exists: false });
      };
      img.src = src;
    });
  }

  async function discoverLocalGalleryMedia() {
    AALIYAH_BIRTHDAY_MEDIA.length = 0;
    const TOTAL_ITEMS = 21;
    const probePromises = [];

    for (let i = 1; i <= TOTAL_ITEMS; i++) {
      const numStr = String(i).padStart(2, '0');
      const imagePath = `/images/stella-memory-${numStr}.webp`;
      probePromises.push((async () => {
        const res = await probeImage(imagePath);
        if (res.exists) {
          return {
            num: i,
            id: `stella-memory-${numStr}`,
            type: 'photo',
            title: `stella-memory-${numStr}`,
            thumbUrl: imagePath,
            fullUrl: imagePath,
            alt: `Aaliyah's 22nd birthday photo ${i}`,
            status: 'ready'
          };
        }
        return null;
      })());
    }

    const results = await Promise.all(probePromises);
    const valid = results.filter(Boolean);
    valid.sort((a, b) => a.num - b.num);
    valid.forEach(item => AALIYAH_BIRTHDAY_MEDIA.push(item));

    return AALIYAH_BIRTHDAY_MEDIA;
  }

  let singleAudioInstance = null;
  let experienceInitiated = false;
  let audioHasEnded = false;

  document.addEventListener('DOMContentLoaded', () => {
    initExperienceFlow();
    initPhotoSlots();
    initBirthdayGallery();
  });

  /**
   * Sets up Opening Cover -> 7-Second Cinematic Sequence -> Full Memory Experience
   */
  function initExperienceFlow() {
    const btnBegin = document.getElementById('btn-begin-memory');
    const openingCover = document.getElementById('stella-opening-cover');
    const memoryBody = document.getElementById('stella-memory-body');
    const audioPill = document.getElementById('audio-pill');
    const audioStatusLabel = document.getElementById('audio-status-label');

    if (!btnBegin || !openingCover || !memoryBody) return;

    // Temporary Preview Shortcut: Direct memory preview
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

      // 1. Immediately start the single combined audio recording at tap moment
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

      // ====================================================================
      // 20-SECOND COORDINATED CINEMATIC OPENING MASTER TIMELINE
      // ====================================================================

      // Phase 1 — Awakening (0–3s)
      // Stop idle animation, illuminate portrait with travelling LED, intensify glow, begin slow zoom
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

      // 3. “The Queen of My Calm” fades away (at 5.4s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-heading');
      }, 5400);

      // 4. “Stella Aaliyah Dinar” disappears from photograph (at 6.4s)
      setTimeout(() => {
        openingCover.classList.add('stage-dissolve-name');
      }, 6400);

      // Phase 3 — The universe emerges (7–11s)
      // Portrait dissolves into near-black, starry universe emerges with drifting layers & nebula
      const coverUniverse = document.getElementById('cover-universe');
      setTimeout(() => {
        openingCover.classList.add('stage-universe-emerges');
        if (coverUniverse) {
          coverUniverse.classList.add('is-active');
        }
      }, 7200);

      // Phase 4 — Personal dedication (11–16s)
      // “A memory from Rayblack to Aaliyah Black” emerges with thin animated line of light
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
      // Dedication dissolves, memory experience begins gradual silky reveal
      setTimeout(() => {
        openingCover.classList.add('stage-enter-memories');
        memoryBody.classList.add('is-revealed');
      }, 16000);

      // Final Transition Complete (at ~20s)
      // Cover is dismissed, audio continues without interruption
      setTimeout(() => {
        openingCover.classList.add('is-dismissed');
        if (audioPill) {
          audioPill.classList.add('is-active');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        openingCover.setAttribute('aria-hidden', 'true');
      }, 20000);
    });

    // Discreet Audio Pill Toggle (Play / Pause without loop or restart; safe retry)
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
   * Instantiates and starts the single combined audio recording
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

    // Direct invocation inside user tap event handler
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
   * Section 1: Manages confirmed portrait image loading in Cover and Section 1
   */
  function initPhotoSlots() {
    Object.keys(STELLA_PHOTOS).forEach(slotKey => {
      const url = STELLA_PHOTOS[slotKey];
      const container = document.querySelector(`[data-photo-slot="${slotKey}"]`);
      if (!container) return;

      const existingImg = container.querySelector('img');
      const fallback = container.querySelector('.cover-fallback-portrait, .frame-placeholder-inner');

      if (existingImg) {
        existingImg.addEventListener('error', () => {
          existingImg.classList.add('is-hidden');
          if (fallback && slotKey === 'cover') fallback.classList.add('is-visible');
        });
        return;
      }

      if (!url) return;

      const altText = container.getAttribute('data-caption') || "Stella Aaliyah Dinar";
      const img = document.createElement('img');
      img.src = url;
      img.alt = altText;
      img.className = slotKey === 'cover' ? 'cover-portrait-img' : 'portrait-intro-img';
      img.loading = slotKey === 'cover' ? 'eager' : 'lazy';
      img.decoding = 'async';
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

  /* ==========================================================================
     SECTION TWO: AALIYAH'S 22ND BIRTHDAY GALLERY & FULL-SCREEN VIEWER
     Native Mobile-First 3-Column Phone Photo/Video Album with Swipe Gestures
     ========================================================================== */

  let activeViewerIndex = 0;
  let savedScrollY = 0;

  async function initBirthdayGallery() {
    const gridEl = document.getElementById('birthday-gallery-grid');
    if (!gridEl) return;

    initLightboxViewer();
    await discoverLocalGalleryMedia();
    renderGalleryGrid(gridEl);
  }

  function renderGalleryGrid(gridEl) {
    gridEl.innerHTML = '';
    const section = gridEl.closest('.memory-gallery-section');

    if (AALIYAH_BIRTHDAY_MEDIA.length === 0) {
      if (section) section.style.display = 'none';
      return;
    }

    if (section) section.style.display = '';

    AALIYAH_BIRTHDAY_MEDIA.forEach((item, index) => {
      const cell = document.createElement('div');
      const isVideo = item.type === 'video';

      cell.className = 'gallery-item' + (isVideo ? ' gallery-item-video' : '');
      cell.setAttribute('role', 'button');
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('aria-label', item.alt || (isVideo ? 'Birthday video memory' : `Birthday photo ${index + 1}`));
      cell.dataset.index = index;

      if (isVideo) {
        const img = document.createElement('img');
        img.src = item.thumbUrl || item.fullUrl;
        img.alt = item.alt || "Aaliyah's 22nd birthday video thumbnail";
        img.className = 'gallery-item-media';
        img.loading = 'lazy';
        img.decoding = 'async';
        cell.appendChild(img);

        // Discreet native-style video badge
        const badge = document.createElement('span');
        badge.className = 'gallery-video-badge';
        badge.setAttribute('aria-hidden', 'true');
        badge.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 4 19 12 6 20 6 4"/>
          </svg>
          <span>Video</span>
        `;
        cell.appendChild(badge);
      } else {
        const img = document.createElement('img');
        const primarySrc = item.thumbUrl || item.fullUrl;
        img.src = primarySrc;
        img.alt = item.alt || `Aaliyah's 22nd birthday photo ${index + 1}`;
        img.className = 'gallery-item-media';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = function () {
          this.classList.add('is-hidden');
        };
        cell.appendChild(img);
      }

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

        // If predominantly horizontal, prevent background bounce
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

        // Horizontal swipe thresholds
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

    // Focus stage for keyboard navigation accessibility
    const stage = document.getElementById('lightbox-stage');
    if (stage) stage.focus();
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox || lightbox.hasAttribute('hidden')) return;

    // Stop and unmount any active video
    const mediaContainer = document.getElementById('lightbox-media-container');
    if (mediaContainer) {
      const activeVideo = mediaContainer.querySelector('video');
      if (activeVideo) {
        activeVideo.pause();
        activeVideo.removeAttribute('src');
        activeVideo.load();
      }
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
    const total = AALIYAH_BIRTHDAY_MEDIA.length;
    if (total === 0) return;

    let nextIndex = activeViewerIndex + direction;
    if (nextIndex < 0) nextIndex = total - 1;
    if (nextIndex >= total) nextIndex = 0;

    activeViewerIndex = nextIndex;
    renderLightboxItem(activeViewerIndex);
  }

  function renderLightboxItem(index) {
    const item = AALIYAH_BIRTHDAY_MEDIA[index];
    const mediaContainer = document.getElementById('lightbox-media-container');
    const counter = document.getElementById('lightbox-counter');
    if (!item || !mediaContainer) return;

    if (counter) {
      counter.textContent = `${index + 1} / ${AALIYAH_BIRTHDAY_MEDIA.length}`;
    }

    // Stop and release previous video if any
    const prevVideo = mediaContainer.querySelector('video');
    if (prevVideo) {
      prevVideo.pause();
      prevVideo.removeAttribute('src');
      prevVideo.load();
    }

    mediaContainer.innerHTML = '';

    if (item.type === 'video') {
      const video = document.createElement('video');
      video.className = 'lightbox-active-video';
      video.src = item.videoUrl || item.fullUrl;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.setAttribute('webkit-playsinline', 'true');
      video.preload = 'auto';
      mediaContainer.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.className = 'lightbox-active-img';
      const displaySrc = item.fullUrl || item.thumbUrl;
      img.src = displaySrc;
      img.alt = item.alt || "Aaliyah's 22nd birthday memory";
      img.decoding = 'async';
      img.onerror = function () {
        this.classList.add('is-hidden');
      };
      mediaContainer.appendChild(img);
    }
  }

  // Window registry for future updates and dynamic media population
  window.StellaKeepsake = {
    photos: STELLA_PHOTOS,
    galleryMedia: AALIYAH_BIRTHDAY_MEDIA,
    updatePhoto: function (slot, url) {
      if (STELLA_PHOTOS[slot] !== undefined) {
        STELLA_PHOTOS[slot] = url;
        initPhotoSlots();
      }
    },
    updateMediaItem: function (index, updates) {
      if (AALIYAH_BIRTHDAY_MEDIA[index]) {
        Object.assign(AALIYAH_BIRTHDAY_MEDIA[index], updates);
        const gridEl = document.getElementById('birthday-gallery-grid');
        if (gridEl) renderGalleryGrid(gridEl);
      }
    },
    setMediaList: function (newList) {
      if (Array.isArray(newList)) {
        AALIYAH_BIRTHDAY_MEDIA.length = 0;
        AALIYAH_BIRTHDAY_MEDIA.push(...newList);
        const gridEl = document.getElementById('birthday-gallery-grid');
        if (gridEl) renderGalleryGrid(gridEl);
      }
    }
  };
})();
