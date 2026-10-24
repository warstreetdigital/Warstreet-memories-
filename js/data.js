/**
 * WarStreet Memories — Memory Registry & Data Architecture
 * Brand: WarStreet Experience Model™
 * 
 * DESIGN RATIONALE:
 * This registry acts as the single source of truth for categories and memories.
 * In this foundation stage, it houses the initial verified customer memory
 * (Stella Aaliyah Dinar) and formal schemas for the remaining empty categories.
 * 
 * When the dedicated Admin Panel is built, this module can be swapped or augmented
 * with calls to a Cloudflare Worker API (e.g. `GET /api/memories`), backed by
 * Cloudflare D1 (SQL relational database) and Cloudflare R2 (media asset storage).
 */

const WARSTREET_CONFIG = {
  platformName: "WarStreet Memories",
  brandOwner: "WarStreet Experience Model™",
  plannedDomain: "warstreetmemories.enterharare.online",
  version: "1.1.0-mobile-app"
};

const MEMORY_CATEGORIES = [
  {
    id: "birthdays",
    name: "Birthdays",
    slug: "birthdays",
    tagline: "Cherished milestones & celebrations",
    description: "Milestones, celebrations, and personal chapters preserved forever in bespoke digital form.",
    emptyNotice: "New memories will appear here.",
    icon: "gift",
    path: "/birthdays/",
    status: "active",
    memories: [
      {
        id: "stella-aaliyah-dinar",
        slug: "stella-aaliyah-dinar",
        recipientName: "Stella Aaliyah Dinar",
        category: "birthdays",
        categoryName: "Birthday Memory",
        title: "Stella Aaliyah Dinar",
        subtitle: "Birthday Memory Experience",
        route: "/birthdays/stella-aaliyah-dinar/",
        fullUrl: "https://warstreetmemories.enterharare.online/birthdays/stella-aaliyah-dinar/",
        isLive: true,
        status: "active",
        createdAt: "2026-10-15"
      },
      {
        id: "bryan-mabani",
        slug: "bryan-mabani",
        recipientName: "Bryan Mabani",
        category: "birthdays",
        categoryName: "Birthday Memory",
        title: "Bryan Mabani",
        subtitle: "27th Birthday & Anniversary Keepsake",
        route: "/birthdays/bryan-mabani/",
        fullUrl: "https://warstreetmemories.enterharare.online/birthdays/bryan-mabani/",
        isLive: true,
        status: "active",
        createdAt: "2026-10-25"
      }
    ]
  },
  {
    id: "weddings",
    name: "Weddings",
    slug: "weddings",
    tagline: "Sacred unions & enduring vows",
    description: "Vows, speeches, and eternal moments woven into timeless digital keepsakes.",
    emptyNotice: "New memories will appear here.",
    icon: "rings",
    path: "/weddings/",
    status: "awaiting_entries",
    memories: []
  },
  {
    id: "roora",
    name: "Roora",
    slug: "roora",
    tagline: "Heritage & family unions",
    description: "Honouring heritage, the sacred union of families, and cultural legacy.",
    emptyNotice: "New memories will appear here.",
    icon: "heritage",
    path: "/roora/",
    status: "awaiting_entries",
    memories: []
  },
  {
    id: "love-family",
    name: "Love & Family",
    slug: "love-family",
    tagline: "Generations & unbreakable bonds",
    description: "Generations, anniversaries, and unbreakable bonds held in safe keeping.",
    emptyNotice: "New memories will appear here.",
    icon: "heart",
    path: "/love-family/",
    status: "awaiting_entries",
    memories: []
  }
];

// Helper functions for easy querying
function getAllCategories() {
  return MEMORY_CATEGORIES;
}

function getCategoryById(categoryId) {
  return MEMORY_CATEGORIES.find(c => c.id === categoryId || c.slug === categoryId) || null;
}

function getAllActiveMemories() {
  return MEMORY_CATEGORIES.flatMap(c => c.memories);
}

// Make accessible to window for vanilla JS consumption
window.WarStreetRegistry = {
  config: WARSTREET_CONFIG,
  categories: MEMORY_CATEGORIES,
  getAllCategories,
  getCategoryById,
  getAllActiveMemories
};
