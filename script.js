/* Page loaded */


window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

/* Header scroll effect */


const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add("header-scrolled");
    } else {
      siteHeader.classList.remove("header-scrolled");
    }
  });
}


/* Reveal on scroll */


const revealItems = document.querySelectorAll(
  ".hero-content, .hero-image, .benefits-strip, .section-title, .therapy-card, .home-video-content, .video-preview, .motivation-section, .video-hero-content, .therapy-category, .therapy-video, .closing-section"
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});


/* Back to top */


const backToTopButton = document.createElement("button");
backToTopButton.classList.add("back-to-top");
backToTopButton.innerHTML = "↑";
backToTopButton.setAttribute("aria-label", "Volver arriba");
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* Show more videos */


const moreVideoButtons = document.querySelectorAll(".btn-more-videos");

moreVideoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetClass = button.getAttribute("data-target");
    const extraVideos = document.querySelectorAll("." + targetClass);

    extraVideos.forEach((video) => {
      video.classList.toggle("show");
    });

    if (button.textContent.trim() === "Ver más videos") {
      button.textContent = "Ver menos videos";
    } else {
      button.textContent = "Ver más videos";
    }
  });
});


/* Video modal */


const openVideoButtons = document.querySelectorAll(".btn-open-video");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideoButton = document.getElementById("closeVideoBtn");

if (videoModal && modalVideo && closeVideoButton) {
  const modalSource = modalVideo.querySelector("source");

  const closeVideoModal = () => {
    videoModal.classList.remove("show");
    document.body.classList.remove("no-scroll");

    modalVideo.pause();
    modalSource.src = "";
    modalVideo.load();
  };

  openVideoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const videoSource = button.getAttribute("data-video");

      modalSource.src = videoSource;
      modalVideo.load();

      videoModal.classList.add("show");
      document.body.classList.add("no-scroll");
    });
  });

  closeVideoButton.addEventListener("click", closeVideoModal);

  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeVideoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoModal.classList.contains("show")) {
      closeVideoModal();
    }
  });
}


/* Open category from index */


window.addEventListener("load", () => {
  if (window.location.hash) {
    const targetCategory = document.querySelector(window.location.hash);

    if (targetCategory) {
      setTimeout(() => {
        targetCategory.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        targetCategory.classList.add("category-highlight");

        setTimeout(() => {
          targetCategory.classList.remove("category-highlight");
        }, 1800);
      }, 200);
    }
  }
});