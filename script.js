// --- Tab Navigation and Modal (unchanged from your previous smooth version) ---
(() => {
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

  const modal = document.getElementById('list-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalList = document.getElementById('modal-list');
  const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;

  // If you use the modal for other lists, you can keep your listsData here if needed

  function openListModal(listType) {
    const key = listType;
    if (!listsData[key]) return;
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
      setTimeout(() => {
        const items = modalList.querySelectorAll("li");
        items.forEach(li => {
          li.style.opacity = 0;
          li.style.transform = "translateY(24px)";
          li.style.transition = "opacity 0.45s cubic-bezier(.55,.08,.44,1.05), transform 0.45s cubic-bezier(.55,.08,.44,1.05)";
        });
        items.forEach((li, i) => {
          setTimeout(() => {
            li.style.opacity = 1;
            li.style.transform = "translateY(0)";
          }, 80 + i * 55);
        });
      }, 130);
    }
  }

  function closeListModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modalList) {
      modalList.querySelectorAll("li").forEach(li => {
        li.style.opacity = "";
        li.style.transform = "";
        li.style.transition = "";
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Modal list buttons (if you use them elsewhere)
    document.querySelectorAll('.list-title-btn').forEach(btn => {
      btn.addEventListener('click', () => openListModal(btn.dataset.list));
    });

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => {
          tc.classList.remove('active');
          setTimeout(() => {
            if (!tc.classList.contains('active')) tc.style.display = "none";
          }, 450);
        });
        btn.classList.add('active');
        const nextTab = document.getElementById(btn.dataset.tab);
        if (nextTab) {
          nextTab.style.display = "block";
          setTimeout(() => { nextTab.classList.add('active'); }, 10);
        }
      });
    });

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

// --- MODERN LISTS TAB LOGIC ---
(() => {
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

  function renderModernList(type = "why") {
    const card = document.getElementById("modernListCard");
    if (!card) return;
    const titles = {
      why: "Why I Love You",
      dates: "Date Ideas",
      travel: "Places We Should Go To",
      Names: "Possible Future Children Names",
      freaky: "Places We Should Get Freaky In"
    };
    const items = listsData[type] || [];
    card.innerHTML = `
      <div class="list-title-modern">${titles[type] || "List"}</div>
      <ul class="list-modern">
        ${items.map((item, i) => `<li style="transition-delay:${i*65}ms">${item}</li>`).join("")}
      </ul>
    `;
    setTimeout(() => {
      const lis = card.querySelectorAll('.list-modern li');
      lis.forEach((li, i) => {
        setTimeout(() => li.classList.add("revealed"), 60 + i * 55);
      });
    }, 80);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderModernList("why");
    document.querySelectorAll(".list-cat-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        document.querySelectorAll(".list-cat-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        renderModernList(this.dataset.list);
      });
    });

    // List item hover effect (adds extra pop/tilt)
    document.getElementById("modernListCard").addEventListener("mousemove", function(e) {
      if (e.target.tagName === "LI") {
        const li = e.target;
        const rect = li.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * 12;
        const rotateY = ((x - rect.width / 2) / rect.width) * 14;
        li.style.transform = `scale(1.13) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        li.style.boxShadow = "0 10px 30px #b070f7aa";
      }
    });
    document.getElementById("modernListCard").addEventListener("mouseleave", function(e) {
      if (e.target.tagName === "UL" || e.target.tagName === "DIV") {
        this.querySelectorAll("li").forEach(li => {
          li.style.transform = "";
          li.style.boxShadow = "";
        });
      }
    });
    document.getElementById("modernListCard").addEventListener("mouseout", function(e) {
      if (e.target.tagName === "LI") {
        e.target.style.transform = "";
        e.target.style.boxShadow = "";
      }
    });
  });
})();

// --- GALLERY IMAGE POP & TILT ---
(() => {
  function handleGalleryMotion(e) {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 9;
    img.style.transform = `scale(1.10) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    img.classList.add("pop-tilt");
  }
  function resetGalleryMotion(e) {
    const img = e.currentTarget;
    img.style.transform = "";
    img.classList.remove("pop-tilt");
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.addEventListener("mousemove", handleGalleryMotion);
      img.addEventListener("mouseleave", resetGalleryMotion);
      img.addEventListener("mouseenter", handleGalleryMotion);
    });
  });
})();