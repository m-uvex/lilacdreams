(() => {
  // --- List Data ---
  const listsData = {
    why: [
      "You always make me smile, even on my worst days.",
      "Your laugh is the cutest sound in the world.",
      "You support my nerdy ideas (like this website!).",
      "You care so deeply for the people you love.",
      "You never fail to surprise me.",
      "You make every moment feel special.",
      "You're the best part of my every day.",
      "You make distance feel less distant.",
      "You remember the little things that matter.",
      "You let me be my weird self and love me for it."
    ],
    dates: [
      "Late-night drive with music.",
      "Stargazing picnic.",
      "Cooking together (and making a mess).",
      "Movie marathon in pajamas.",
      "Building a pillow fort.",
      "Visiting a cute café.",
      "Dancing in the rain.",
      "Trying a new hobby together.",
      "Going to an amusement park.",
      "Reading each other our favorite books."
    ],
    travel: [
      "See cherry blossoms in Japan.",
      "Visit Paris and see the Eiffel Tower.",
      "Go to an aquarium together.",
      "Walk on a beach at sunset.",
      "Explore a new city hand-in-hand.",
      "Go to a hot springs resort.",
      "Take a train trip along a scenic route.",
      "Visit a cat café (or dog café!).",
      "See the northern lights.",
      "Roadtrip with just the two of us."
    ],
    Names: [
      "Aster",
      "Eli",
      "Lila",
      "Sora",
      "Noah",
      "Nova",
      "Mira",
      "Eren",
      "Rhea",
      "Juno"
    ],
    freaky: [
      "In a tent while camping.",
      "In the shower.",
      "On a rooftop under the stars.",
      "In a photo booth.",
      "On the beach at night.",
      "In the backseat of a car.",
      "In a cozy blanket fort.",
      "On a balcony overlooking the city.",
      "In a fancy hotel room.",
      "On a rainy day by the window."
    ]
  };

  // --- Modal Markup Injection ---
  function injectModal() {
    if (document.getElementById('list-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'list-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" aria-label="Close">&times;</button>
        <h2 id="modal-title"></h2>
        <ul id="modal-list"></ul>
      </div>
    `;
    document.body.appendChild(modal);
  }
  injectModal();

  // --- Modal Logic ---
  const modal = document.getElementById('list-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalList = document.getElementById('modal-list');
  const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;

  function openListModal(listType) {
    const key = listType;
    if (!listsData[key]) return;
    // Pretty titles
    const titles = {
      why: "Why I Love You",
      dates: "Date Ideas",
      travel: "Places We Should Go To",
      Names: "Possible Future Children Names",
      freaky: "Places We Should Get Freaky In"
    };
    if (modalTitle) modalTitle.textContent = titles[key] || "List";
    const items = listsData[key];
    if (modalList) modalList.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeListModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach events to buttons (modal + tab navigation)
  document.addEventListener('DOMContentLoaded', function() {
    // Modal list buttons
    document.querySelectorAll('.list-title-btn').forEach(btn => {
      btn.addEventListener('click', () => openListModal(btn.dataset.list));
    });

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        // Remove active from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => {
          tc.classList.remove('active');
          setTimeout(() => {
            if (!tc.classList.contains('active')) tc.style.display = "none";
          }, 450);
        });
        // Add active to clicked
        btn.classList.add('active');
        const nextTab = document.getElementById(btn.dataset.tab);
        if (nextTab) {
          nextTab.style.display = "block";
          setTimeout(() => { nextTab.classList.add('active'); }, 10);
        }
      });
    });

    // Ensure only the active tab is visible on load
    tabContents.forEach(tc => {
      if (!tc.classList.contains('active')) tc.style.display = "none";
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeListModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeListModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (modal && modal.classList.contains('active') && e.key === 'Escape') closeListModal();
  });
})();