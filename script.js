// Tab switching with slide+fade transitions
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function showTab(tabId) {
    tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    tabContents.forEach(tc => {
      if (tc.id === tabId) {
        tc.style.display = "block";
        setTimeout(() => tc.classList.add('active'), 10);
      } else {
        tc.classList.remove('active');
        setTimeout(() => { if(!tc.classList.contains('active')) tc.style.display = "none"; }, 450);
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      showTab(btn.dataset.tab);
    });
  });

  // On load, only active tab is visible
  tabContents.forEach(tc => {
    if (!tc.classList.contains('active')) tc.style.display = "none";
  });

  // --- Lists Modal Logic ---
  const lists = {
    why: {
      title: "Why I Love You",
      emoji: "💜",
      items: [
        "You always make me laugh, even on tough days.",
        "You support me, cheer me up, and believe in my dreams.",
        "You get my weird jokes and quirks.",
        "You make even ordinary moments magical.",
        "You love me for who I am."
      ]
    },
    dates: {
      title: "Date Ideas",
      emoji: "🍰",
      items: [
        "Picnic under the stars.",
        "Binge-watch our favorite series.",
        "Cook something new together.",
        "Midnight stroll, hand in hand.",
        "Visit a cute coffee shop."
      ]
    },
    travel: {
      title: "Places to Visit",
      emoji: "✈️",
      items: [
        "Tokyo during cherry blossom season.",
        "A cozy cabin in the mountains.",
        "A rainy day in Paris.",
        "A beach in Greece.",
        "Your city, my city—anywhere together."
      ]
    },
    names: {
      title: "Future Children Names",
      emoji: "🍼",
      items: [
        "Lila (if a girl!)",
        "Arin (gender neutral)",
        "Finn, Sage, Rhea, or Milo",
        "Our special pick together"
      ]
    },
    freaky: {
      title: "Freaky Places",
      emoji: "😈",
      items: [
        "In a tent under the stars 🏕️",
        "In the shower 🚿",
        "On a balcony at night 🌃",
        "In an elevator (if we're quick)",
        "Anywhere with you 😘"
      ]
    }
  };

  // Modal functions
  const modal = document.getElementById('lists-modal');
  const modalContent = document.getElementById('lists-modal-content');
  let lastFocusedCard = null;

  function openListsModal(key) {
    const listData = lists[key];
    if (!listData) return;
    modalContent.innerHTML = `
      <button class="close-modal" aria-label="Close" onclick="closeListsModal()">&times;</button>
      <h2>${listData.emoji} ${listData.title}</h2>
      <ul>${listData.items.map(item => `<li>${item}</li>`).join('')}</ul>
    `;
    modal.classList.add('active');
    // For accessibility: focus close button
    setTimeout(() => {
      const closeBtn = modalContent.querySelector('.close-modal');
      if (closeBtn) closeBtn.focus();
    }, 50);
  }

  window.closeListsModal = function() {
    modal.classList.remove('active');
    if (lastFocusedCard) lastFocusedCard.focus();
  };

  // Card click handlers
  document.querySelectorAll('.list-card').forEach(card => {
    card.addEventListener('click', () => {
      lastFocusedCard = card;
      openListsModal(card.dataset.list);
    });
    // Keyboard support (Enter/Space)
    card.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        lastFocusedCard = card;
        openListsModal(card.dataset.list);
      }
    });
  });

  // Modal close (background click)
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('lists-modal')) window.closeListsModal();
  });
  // Modal close (ESC key)
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active') && e.key === "Escape") {
      window.closeListsModal();
    }
  });
});
