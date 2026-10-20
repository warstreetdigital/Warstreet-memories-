/**
 * WarStreet Memories — App Navigation & Category Screen Controller
 * Pure Vanilla JavaScript (Zero dependencies, low-bandwidth optimized)
 */

(function () {
  'use strict';

  // Category Icon SVGs
  const CATEGORY_ICONS = {
    birthdays: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
    weddings: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>`,
    roora: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    'love-family': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
  };

  const HOME_VIEW_ID = 'view-home';
  const CATEGORY_VIEW_ID = 'view-category';

  let homeViewEl = null;
  let categoryViewEl = null;
  let categoryHeaderEl = null;
  let categoryContentEl = null;

  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    homeViewEl = document.getElementById(HOME_VIEW_ID);
    categoryViewEl = document.getElementById(CATEGORY_VIEW_ID);
    categoryHeaderEl = document.getElementById('category-header-mount');
    categoryContentEl = document.getElementById('category-content-mount');

    if (!homeViewEl || !categoryViewEl) return;

    // Attach click listeners to 2x2 category buttons
    const categoryButtons = document.querySelectorAll('[data-category-select]');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // If normal left click without modifiers
        if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          const catId = btn.getAttribute('data-category-select');
          openCategoryScreen(catId, true);
        }
      });
    });

    // Attach back button listener
    const backBtn = document.getElementById('btn-back-to-home');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        returnToHomeScreen(true);
      });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.category) {
        openCategoryScreen(e.state.category, false);
      } else {
        returnToHomeScreen(false);
      }
    });

    // Check initial URL to restore view if visited with path/hash
    checkInitialRoute();
  }

  function checkInitialRoute() {
    const path = window.location.pathname.replace(/\/$/, '');
    const hash = window.location.hash.replace('#', '');

    const validCategories = ['birthdays', 'weddings', 'roora', 'love-family'];

    let targetCat = null;
    if (validCategories.includes(hash)) {
      targetCat = hash;
    } else {
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 1 && validCategories.includes(parts[0])) {
        targetCat = parts[0];
      }
    }

    if (targetCat) {
      openCategoryScreen(targetCat, false);
    }
  }

  function openCategoryScreen(categoryId, updateHistory) {
    const category = window.WarStreetRegistry ? window.WarStreetRegistry.getCategoryById(categoryId) : null;
    if (!category) return;

    renderCategoryView(category);

    // Switch views
    homeViewEl.setAttribute('hidden', '');
    categoryViewEl.removeAttribute('hidden');

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (updateHistory) {
      const newUrl = `/${category.slug}/`;
      history.pushState({ category: category.id }, `${category.name} — WarStreet Memories`, newUrl);
    }

    document.title = `${category.name} — WarStreet Memories`;
  }

  function returnToHomeScreen(updateHistory) {
    categoryViewEl.setAttribute('hidden', '');
    homeViewEl.removeAttribute('hidden');

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (updateHistory) {
      history.pushState(null, 'WarStreet Memories — Digital Memory Platform', '/');
    }

    document.title = 'WarStreet Memories — Digital Memory Platform by WarStreet Experience Model™';
  }

  function renderCategoryView(category) {
    const iconSvg = CATEGORY_ICONS[category.id] || CATEGORY_ICONS.birthdays;

    // Render category header
    if (categoryHeaderEl) {
      categoryHeaderEl.innerHTML = `
        <div class="category-hero-summary">
          <div class="category-hero-icon" aria-hidden="true">
            ${iconSvg}
          </div>
          <div class="category-hero-text">
            <h1>${escapeHtml(category.name)}</h1>
            <p>${escapeHtml(category.tagline || category.description)}</p>
          </div>
        </div>
      `;
    }

    // Render memory entries or minimal empty state
    if (!categoryContentEl) return;

    const memories = category.memories || [];

    if (memories.length > 0) {
      // Render active memory entries
      const entriesHtml = memories.map(memory => `
        <a href="${escapeHtml(memory.route)}" class="memory-item-card" aria-label="Open ${escapeHtml(memory.recipientName)} birthday memory experience">
          <div class="memory-left-info">
            <div class="memory-avatar-badge" aria-hidden="true">SD</div>
            <div class="memory-text-group">
              <span class="memory-person-name">${escapeHtml(memory.recipientName)}</span>
              <span class="memory-person-role">${escapeHtml(memory.subtitle || memory.categoryName)}</span>
              <span class="memory-path-pill">${escapeHtml(memory.route)}</span>
            </div>
          </div>
          <svg class="memory-action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </a>
      `).join('');

      categoryContentEl.innerHTML = `
        <div class="memory-list-container">
          ${entriesHtml}
        </div>
      `;
    } else {
      // Empty category: minimal elegant empty state per directive:
      // “New memories will appear here.”
      categoryContentEl.innerHTML = `
        <div class="empty-category-card">
          <div class="empty-icon-wrap" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <h2 class="empty-state-headline">New memories will appear here.</h2>
          <p class="empty-state-caption">This collection will display curated experiences once commissioned.</p>
        </div>
      `;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose methods for direct static page integration
  window.WarStreetApp = {
    openCategoryScreen,
    returnToHomeScreen
  };
})();
