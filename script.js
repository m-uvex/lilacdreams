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
      dates: "Date Ideas"
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
      "You treat me like nobody did before.",
      "You make every moment feel special.",
      "You're the best part of my every day.",
      "You make distance feel less distant.",
      "You remember the little things that matter.",
      "You let me be my weird self and love me for it."
    ],
    dates: [
      "Stargazing picnic.",
      "Go on a roadtrip together.",
      "Cooking together (and making a mess).",
      "Movie marathon in pajamas.",
      "Building a pillow fort.",
      "Kid again day.",
      "Dancing in the rain.",
      "Playing a Co-Op game together.",
      "Riding a ferris wheel together",
      "Going Urbex together."
    ]
  };

  function renderModernList(type = "why") {
    const card = document.getElementById("modernListCard");
    if (!card) return;
    const titles = {
      why: "Why I Love You",
      dates: "Date Ideas"
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
    let listLiRafId = null;
    let lastLi = null;
    document.getElementById("modernListCard").addEventListener("mousemove", function(e) {
      if (e.target.tagName === "LI") {
        const li = e.target;
        if (listLiRafId) cancelAnimationFrame(listLiRafId);
        lastLi = li;
        const rect = li.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * 7;
        const rotateY = ((x - rect.width / 2) / rect.width) * 8;
        listLiRafId = requestAnimationFrame(() => {
          li.style.transition = "transform 0.13s cubic-bezier(.55,.08,.44,1.05), box-shadow 0.13s";
          li.style.transform = `scale(1.025) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
          li.style.boxShadow = "0 5px 16px #b070f7aa";
        });
      }
    });
    document.getElementById("modernListCard").addEventListener("mouseleave", function(e) {
      if (listLiRafId) cancelAnimationFrame(listLiRafId);
      if (this.querySelectorAll) {
        this.querySelectorAll("li").forEach(li => {
          li.style.transform = "";
          li.style.boxShadow = "";
          li.style.transition = "transform 0.18s cubic-bezier(.55,.08,.44,1.05), box-shadow 0.18s";
        });
      }
    });
    document.getElementById("modernListCard").addEventListener("mouseout", function(e) {
      if (e.target.tagName === "LI") {
        if (listLiRafId) cancelAnimationFrame(listLiRafId);
        e.target.style.transform = "";
        e.target.style.boxShadow = "";
        e.target.style.transition = "transform 0.18s cubic-bezier(.55,.08,.44,1.05), box-shadow 0.18s";
      }
    });
  });
})();

// --- GALLERY IMAGE POP & TILT ---
(() => {
  let galleryRafId = null;
  function handleGalleryMotion(e) {
    const img = e.currentTarget;
    if (galleryRafId) cancelAnimationFrame(galleryRafId);
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 4.5;
    const rotateY = ((x - centerX) / centerX) * 6;
    galleryRafId = requestAnimationFrame(() => {
      img.style.transition = "transform 0.15s cubic-bezier(.55,.08,.44,1.05), box-shadow 0.15s";
      img.style.transform = `scale(1.04) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      img.classList.add("pop-tilt");
    });
  }
  function resetGalleryMotion(e) {
    const img = e.currentTarget;
    if (galleryRafId) cancelAnimationFrame(galleryRafId);
    img.style.transform = "";
    img.classList.remove("pop-tilt");
    img.style.transition = "transform 0.18s cubic-bezier(.55,.08,.44,1.05), box-shadow 0.18s";
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.addEventListener("mousemove", handleGalleryMotion);
      img.addEventListener("mouseleave", resetGalleryMotion);
      img.addEventListener("mouseenter", handleGalleryMotion);
    });
  });
})();
