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

  // === HOVER ANIMATION FOR TEST CASES ===
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
