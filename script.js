/**
 * Oyinkansola Odunsi — Developer Portfolio
 * Interactive Functionality & Utilities
 */

// -----------------------------------------------------------------------------
// Tab Switching (Education & Certifications)
// -----------------------------------------------------------------------------
function opentab(event, tabname) {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabPanes.forEach((pane) => pane.classList.remove("active"));

  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }

  const activePane = document.getElementById(tabname);
  if (activePane) {
    activePane.classList.add("active");
  }
}

// -----------------------------------------------------------------------------
// Mobile Drawer & Navigation
// -----------------------------------------------------------------------------
const sidemenu = document.getElementById("sidemenu");
const menuBackdrop = document.getElementById("menu-backdrop");

function openmenu() {
  if (sidemenu && menuBackdrop) {
    sidemenu.classList.add("open");
    menuBackdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }
}

function closemenu() {
  if (sidemenu && menuBackdrop) {
    sidemenu.classList.remove("open");
    menuBackdrop.classList.remove("open");
    document.body.style.overflow = ""; // Restore scroll
  }
}

// Close drawer when any nav-link is clicked (on mobile)
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link, .nav-resume-item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closemenu();
    });
  });

  // ---------------------------------------------------------------------------
  // Smooth "Back to Top" & Brand Scroll
  // ---------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    });
  }

  const navBrand = document.querySelector(".nav-brand");
  if (navBrand) {
    navBrand.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Projects Visibility Toggle ("Show More / Show Less")
  // ---------------------------------------------------------------------------
  const projectCards = document.querySelectorAll(".work-list .project-card");
  const seeMoreBtn = document.getElementById("see-more-btn");
  const seeMoreIcon = document.getElementById("see-more-icon");

  // Keep first 3 projects visible by default, hide subsequent ones
  const INITIAL_VISIBLE_COUNT = 3;
  if (projectCards.length > INITIAL_VISIBLE_COUNT) {
    projectCards.forEach((card, index) => {
      if (index >= INITIAL_VISIBLE_COUNT) {
        card.classList.add("hidden");
      }
    });

    let isExpanded = false;

    if (seeMoreBtn) {
      seeMoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        isExpanded = !isExpanded;

        projectCards.forEach((card, index) => {
          if (index >= INITIAL_VISIBLE_COUNT) {
            card.classList.toggle("hidden", !isExpanded);
          }
        });

        const btnSpan = seeMoreBtn.querySelector("span");
        if (btnSpan) {
          btnSpan.textContent = isExpanded ? "Show Fewer Projects" : "Show More Projects";
        }

        if (seeMoreIcon) {
          seeMoreIcon.className = isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down";
        }
      });
    }
  } else if (seeMoreBtn) {
    // If 3 or fewer projects, hide the button entirely
    seeMoreBtn.parentElement.style.display = "none";
  }

  // ---------------------------------------------------------------------------
  // Google Sheets Contact Form Submission
  // ---------------------------------------------------------------------------
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyOugxYnFAghg2bvJJqsRV2h3i0YGOAtnD2xcKemfQtuc8S9Rqd51UcJJf_Q2tABIk2/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnIcon = document.getElementById("btn-icon");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnText) btnText.textContent = "Sending...";
        if (btnIcon) btnIcon.className = "fa-solid fa-spinner fa-spin";
      }

      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          if (msg) {
            msg.className = "form-feedback success";
            msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message was sent successfully.';
          }
          form.reset();

          setTimeout(function () {
            if (msg) {
              msg.innerHTML = "";
              msg.className = "form-feedback";
            }
          }, 5000);
        })
        .catch((error) => {
          console.error("Form submission error!", error.message);
          if (msg) {
            msg.className = "form-feedback error";
            msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Something went wrong. Please email me directly.';
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.textContent = "Send Message";
            if (btnIcon) btnIcon.className = "fa-solid fa-paper-plane";
          }
        });
    });
  }
});
