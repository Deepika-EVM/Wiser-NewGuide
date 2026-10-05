document.addEventListener("DOMContentLoaded", function () {
  // === NAVIGATION FUNCTIONALITY ===
  const mainNavItems = document.querySelectorAll(".main-nav .nav-item");
  const sectionContents = document.querySelectorAll(".section-content");

  mainNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      mainNavItems.forEach((navItem) => navItem.classList.remove("active"));
      sectionContents.forEach((content) => content.classList.remove("active"));
      item.classList.add("active");

      const sectionId = item.getAttribute("data-section");
      document.getElementById(sectionId)?.classList.add("active");
    });
  });

  // === TAB FUNCTIONALITY (ALL SECTIONS) ===
  document.querySelectorAll(".tab-nav").forEach((tabNav) => {
    const sectionPrefix = tabNav.closest("[id]")?.id;

    tabNav.querySelectorAll(".tab-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Toggle active button
        tabNav
          .querySelectorAll(".tab-btn")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Toggle tab content
        document
          .querySelectorAll(`.tab-content-${sectionPrefix}`)
          .forEach((content) => content.classList.remove("active"));

        const targetContent = document.getElementById(tabId);
        targetContent?.classList.add("active");
      });
    });
  });

  // === LINK FUNCTIONALITY (Jump to tab & highlight) ===
  document.querySelectorAll("a[data-tab]").forEach((link) => {
    link.addEventListener("click", (e) => {
  e.preventDefault();
  const targetId = link.getAttribute("data-tab");
  const target = document.getElementById(targetId);
  if (target) {
    document
      .querySelectorAll(".highlight")
      .forEach((el) => el.classList.remove("highlight"));
    target.classList.add("highlight");
    const headerOffset = 80; 
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
});
  });

  // === LINK FUNCTIONALITY slider (Jump to tab & highlight) ===

 document.querySelectorAll(".slider-horizontal-tab .tab-btn").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll(".slider-horizontal-tab .tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");

    document.querySelectorAll(".evm_ws_outer").forEach((section) => {
      section.classList.remove("active");
    });

    const tabId = this.getAttribute("data-tab");
    const target = document.getElementById(`evm-${tabId}`);

    if (target) {
      target.classList.add("active");

      const headerOffset = 80; // same offset as your other snippet
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});


  // === "CLICK HERE AND CHECK EXAMPLE" FUNCTIONALITY ===
  document.querySelectorAll(".example-container a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.getAttribute("data-target");
      const tabButton = document.querySelector(
        `.tab-btn[data-tab="examples-${section}"]`
      );
      tabButton?.click();
    });
  });

  // === COPY TO CLIPBOARD FUNCTIONALITY =
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".code-block");
      if (!container) return;

      const codeText = container.querySelector("pre")?.textContent;
      if (!codeText) return;

      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          btn.style.backgroundColor = "#4CAF50"; // optional styling

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = ""; // reset
          }, 2000);
        })
        .catch((err) => {
          alert("Copy failed: " + err);
        });
    });
  });

  document.querySelectorAll(".test-case").forEach((testCase) => {
    testCase.addEventListener("mouseenter", () => {
      testCase.style.transform = "translateY(-2px)";
      testCase.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });
    testCase.addEventListener("mouseleave", () => {
      testCase.style.transform = "translateY(0)";
      testCase.style.boxShadow = "none";
    });
  });
});
 const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", function () {
    // Show button when scrolled down 300px
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

//onlick image show 
document.addEventListener("click", e => {
  const id = e.target.id;
  if (id && id.startsWith("directshow-")) {
    e.preventDefault();
    const target = document.getElementById("directcontainer-" + id.replace("directshow-", ""));
    document.querySelectorAll('[id^="directcontainer-"]').forEach(d => d.style.display = "none");
    if (target) target.style.display = "block";
  } else if (!e.target.closest('[id^="directcontainer-"]') && !id?.startsWith("directshow-")) {
    document.querySelectorAll('[id^="directcontainer-"]').forEach(d => d.style.display = "none");
  }
});
(function () {
  const demo = document.getElementById("swatchDemo");
  if (!demo) return;
 
  const typeSel = demo.querySelector("#swDemoType");
  const widthIn = demo.querySelector("#swDemoWidth");
  const heightIn = demo.querySelector("#swDemoHeight");
  const radiusIn = demo.querySelector("#swDemoRadius");
  const plusSel = demo.querySelector("#swDemoPlus");
  const row = demo.querySelector("#swDemoRow");
  const note = demo.querySelector("#swDemoNote");
 
  const COLORS = [
    ["Red", "#e53935"], ["Blue", "#1e88e5"], ["Green", "#43a047"],
    ["Black", "#212121"], ["Yellow", "#fdd835"], ["Pink", "#ec407a"],
    ["Purple", "#8e24aa"], ["Orange", "#fb8c00"],
  ];
  const SIZES = ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"];
  const VISIBLE = 5; // swatches shown before "+N"
 
  const NOTES = {
    grid_expand: "Grid: clicking +N expands all remaining swatches on the card.",
    slider: "Slider: clicking +N shows all swatches in a sliding row.",
    quick_view: "Quick View: clicking +N opens the product in a popup.",
    redirect: "Product Page: clicking +N redirects the customer to the product page.",
  };
 
  let expanded = false;
 
  // Same limits as the admin fields (min / max)
  function clamp(value, min, max, fallback) {
    const n = parseInt(value, 10);
    if (isNaN(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }
 
  function applyStyle(el, w, h, r) {
    el.style.width = w + "px";
    el.style.height = h + "px";
    el.style.borderRadius = r + "px";
  }
 
  function buildSwatch(index, type, w, h, r) {
    const el = document.createElement("span");
    el.className = "evm-sw-item";
    applyStyle(el, w, h, r);
 
    if (type === "text") {
      el.textContent = SIZES[index];
      el.title = SIZES[index];
    } else {
      const [name, color] = COLORS[index];
      el.title = name;
      el.style.backgroundColor = color;
      if (type === "image") {
        // fake "image" swatch using a pattern (no external files needed)
        el.style.backgroundImage =
          "repeating-linear-gradient(45deg, rgba(255,255,255,.35) 0 4px, transparent 4px 8px)";
      }
    }
 
    el.addEventListener("click", () => {
      row.querySelectorAll(".evm-sw-item.active").forEach((s) => s.classList.remove("active"));
      el.classList.add("active");
    });
    return el;
  }
 
  function render() {
    const type = typeSel.value;
    const w = clamp(widthIn.value, 10, 100, 32);
    const h = clamp(heightIn.value, 10, 100, 32);
    const r = clamp(radiusIn.value, 0, 50, 4);
    const behaviour = plusSel.value;
    const total = type === "text" ? SIZES.length : COLORS.length;
    const extra = total - VISIBLE;
 
    row.innerHTML = "";
    row.classList.toggle("evm-sw-slider-mode", expanded && behaviour === "slider");
 
    const count = expanded && (behaviour === "grid_expand" || behaviour === "slider")
      ? total
      : VISIBLE;
 
    for (let i = 0; i < count; i++) {
      row.appendChild(buildSwatch(i, type, w, h, r));
    }
 
    // "+N" button (hidden once expanded)
    if (!expanded && extra > 0) {
      const plus = document.createElement("span");
      plus.className = "evm-sw-item evm-sw-plus";
      plus.textContent = "+" + extra;
      applyStyle(plus, w, h, r);
      plus.addEventListener("click", () => handlePlus());
      row.appendChild(plus);
    }
 
    if (!note.dataset.clicked) note.textContent = NOTES[behaviour];
  }
 
  function handlePlus() {
    const behaviour = plusSel.value;
    note.dataset.clicked = "1";
 
    if (behaviour === "grid_expand" || behaviour === "slider") {
      expanded = true;
      note.textContent = NOTES[behaviour] + " (expanded)";
      render();
    } else if (behaviour === "quick_view") {
      note.textContent = "👉 Quick View popup would open now.";
    } else {
      note.textContent = "👉 Customer would be redirected to the product page now.";
    }
  }
 
  function resetAndRender() {
    expanded = false;
    delete note.dataset.clicked;
    render();
  }
 
  [typeSel, widthIn, heightIn, radiusIn, plusSel].forEach((el) => {
    el.addEventListener("input", resetAndRender);
    el.addEventListener("change", resetAndRender);
  });
 
  render();
})();
