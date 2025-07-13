const navLinks = document.querySelectorAll('.nav-link');

// Toggle active class on links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(el => el.classList.remove('active'));
    link.classList.add('active');
  });
});

const navbarCollapse = document.getElementById('navbarNav');

// Add blur when menu is shown
navbarCollapse.addEventListener('show.bs.collapse', () => {
  document.body.classList.add('nav-open');
});

// Remove blur when menu is hidden
navbarCollapse.addEventListener('hidden.bs.collapse', () => {
  document.body.classList.remove('nav-open');
});

// Theme
  const toggleThemeBtn = document.querySelector(".toggle-theme");
  const body = document.body;

  function updateIconTheme(theme) {
    // When light, show crescent moon. When dark, show sun.
    toggleThemeBtn.classList.toggle("moon-mode", theme === "light");
  }

  toggleThemeBtn.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIconTheme(newTheme);
  });

  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", savedTheme);
    updateIconTheme(savedTheme);
  });

  const texts = ["Hello, there! I am, Briant Polvorosa"];
  const typewriterElement = document.getElementById("typewriter");

  let textIndex = 0;

  function typeWriterEffect(text, i = 0) {
    if (i <= text.length) {
      typewriterElement.textContent = text.substring(0, i);
      setTimeout(() => typeWriterEffect(text, i + 1), 100); 
    } else {
      // Wait 5 seconds before clearing and restarting
      setTimeout(() => {
        typewriterElement.textContent = "";
        setTimeout(() => typeWriterEffect(texts[textIndex]), 1000); 
      }, 10000); 
    }
  }

  // Start typing
  typeWriterEffect(texts[textIndex]);

  let currentIndex = -1;

  const audios = [
    document.getElementById("audio0"),
    document.getElementById("audio1"),
    document.getElementById("audio2"),
    document.getElementById("audio3"),
    document.getElementById("audio4"),
  ];

  const animations = [
    document.getElementById("loaderAnim0"),
    document.getElementById("loaderAnim1"),
    document.getElementById("loaderAnim2"),
    document.getElementById("loaderAnim3"),
    document.getElementById("loaderAnim4"),
  ];

  const seekBar = document.getElementById("seekBar");
  const volumeBar = document.getElementById("volumeBar");
  const miniPlayer = document.getElementById("miniPlayer");
  const miniTitle = document.getElementById("miniTitle");
  const miniArtist = document.getElementById("miniArtist");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  function playSong(index) {
    // Stop previous if different
    if (currentIndex !== -1 && currentIndex !== index) {
      audios[currentIndex].pause();
      audios[currentIndex].currentTime = 0;
    }

    // Hide all animations
    animations.forEach(anim => anim.style.display = "none");

    currentIndex = index;
    const currentAudio = audios[index];

    // Set volume to 50%
    currentAudio.volume = 0.5;
    volumeBar.value = 0.5;

    currentAudio.play();
    animations[index].style.display = "flex";
    showMiniPlayer();

    // Update mini player info
    miniTitle.textContent = document.querySelectorAll(".name")[index].textContent;
    miniArtist.textContent = document.querySelectorAll(".artist")[index].textContent;

    seekBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";

    currentAudio.ontimeupdate = () => {
      const currentTime = currentAudio.currentTime;
      const duration = currentAudio.duration;
      seekBar.value = (currentTime / duration) * 100 || 0;
      currentTimeEl.textContent = formatTime(currentTime);
      durationEl.textContent = isNaN(duration) ? "0:00" : formatTime(duration);
    };

    seekBar.oninput = () => {
      currentAudio.currentTime = (seekBar.value / 100) * currentAudio.duration;
    };

    volumeBar.oninput = () => {
      currentAudio.volume = volumeBar.value;
    };

    currentAudio.onended = () => {
      playNext();
    };
  }

  const continueIcon = document.getElementById("musicPause");

  function togglePlayPause() {
    const currentAudio = audios[currentIndex];
    if (!currentAudio) return;

    if (currentAudio.paused) {
      currentAudio.play();
      animations[currentIndex].style.display = "flex";
      continueIcon.innerHTML = '<i class="bi bi-pause"></i>';
    } else {
      currentAudio.pause();
      animations[currentIndex].style.display = "none";
      continueIcon.innerHTML = '<i class="bi bi-play"></i>'
    }
  }

  function playNext() {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % audios.length;
    playSong(nextIndex);
  }

  function closeMiniPlayer() {
    if (currentIndex !== -1) {
      audios[currentIndex].pause();
      animations[currentIndex].style.display = "none";
    }
    miniPlayer.classList.add("d-none");
    seekBar.value = 0;
    currentTimeEl.textContent = "0:00";
    durationEl.textContent = "0:00";
  }

  function showMiniPlayer() {
    miniPlayer.classList.remove("d-none");
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  }
  
  const projects = [
    {
      title: "E-Commerce Website",
      description: "A responsive e-commerce website built with PHP and MySQL.",
      image: "projects/fortiktok.mp4",
      link: "https://github.com/yourusername/project-one"
    },
    {
      title: "CRUD Operation",
      description: "Basic CRUD system for managing user data using PHP and MySQL.",
      image: "projects/bsit.mp4",
      link: "https://yourwebsite.com/project-two"
    },
    {
      title: "Online Shop",
      description: "A product browsing app using HTML, CSS, and JavaScript.",
      image: "projects/Market - Google Chrome 2023-09-10 18-19-53.mp4",
      link: "https://github.com/yourusername/project-three"
    },
    {
      title: "Quiz Game",
      description: "An interactive quiz game made with JavaScript and Bootstrap.",
      image: "projects/donkey.mp4",
      link: "https://github.com/yourusername/project-four"
    },
    {
      title: "Online Grading System",
      description: "A grading management tool developed using PHP and Bootstrap.",
      image: "projects/System.mp4",
      link: "https://github.com/yourusername/project-five"
    },
    {
      title: "QR Code Generator",
      description: "Generates QR codes dynamically using JavaScript.",
      image: "projects/contentnew.mp4",
      link: "https://github.com/yourusername/project-six"
    },
    {
      title: "Virgo Hotel Reservation",
      description: "Created using PHP, Javascript, Bootstrap, and Mysql",
      image: "projects/virgo.mp4",
      link: "https://github.com/yourusername/project-seven"
    }
  ];

  const container = document.getElementById("projectCards");
  const paginationControls = document.getElementById("paginationControls");
  const sliderItems = document.getElementById("sliderItems");

  const itemsPerPage = 6;
  let currentPage = 1;

  function renderProjects(page) {
    const isMobile = window.innerWidth < 768;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = isMobile ? projects : projects.slice(start, end);

    container.innerHTML = "";
    sliderItems.innerHTML = "";

    if (isMobile) {
      currentItems.forEach((project) => {
        sliderItems.innerHTML += `
          <li>
            <div class="card h-100 shadow-sm overflow-hidden rounded-4 text-light">
              <video class="card-img-top project-video" autoplay muted loop playsinline>
                <source src="${project.image}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn project-btn text-light float-end">Visit Project</a>
              </div>
            </div>
          </li>
        `;
      });
    } else {
      currentItems.forEach((project) => {
        container.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm overflow-hidden rounded-4 text-light">
              <video class="card-img-top project-video" autoplay muted loop playsinline>
                <source src="${project.image}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.link}" target="_blank" class="btn project-btn text-light float-end">Visit Project</a>
              </div>
            </div>
          </div>
        `;
      });
      renderPagination();
    }

    paginationControls.classList.toggle("d-none", isMobile);
  }

  function renderPagination() {
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    paginationControls.innerHTML = "";

    // Previous button
    paginationControls.innerHTML += `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="changePage(event, ${currentPage - 1})">Previous</a>
      </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      paginationControls.innerHTML += `
        <li class="page-item ${currentPage === i ? "active" : ""}">
          <a class="page-link" href="#" onclick="changePage(event, ${i})">${i}</a>
        </li>
      `;
    }

    // Next button
    paginationControls.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="changePage(event, ${currentPage + 1})">Next</a>
      </li>
    `;
  }

  function changePage(event, page) {
    event.preventDefault();
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderProjects(currentPage);
    }
  }

  // Re-render on screen resize
  window.addEventListener("resize", () => {
    renderProjects(currentPage);
  });

  // Initial render
  renderProjects(currentPage);

// Event listener for opening modal
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("project-btn")) {
    const index = e.target.getAttribute("data-index");
    const project = projects[index];

    // Set modal content
    document.getElementById("projectModalLabel").innerText = project.title;
    document.getElementById("modalDescription").innerText = project.description;
    document.getElementById("modalLink").href = project.link;

    // Update video source and reload
    const modalVideo = document.getElementById("modalVideo");
    modalVideo.querySelector("source").src = project.image;
    modalVideo.load();

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("projectModal"));
    modal.show();
  }
});

const certificates = [
  "certificates/cer1.jpeg",
  "certificates/cer2.jpeg",
  "certificates/cer3.jpeg",
  "certificates/cer4.jpeg",
  "certificates/cer5.jpeg"
];

  const certificateContainer = document.getElementById("certificatesContainer");
  const sliderCertificates = document.getElementById("sliderCertificates");

  function renderCertificates() {
    const isMobile = window.innerWidth < 768;

    certificateContainer.innerHTML = "";
    sliderCertificates.innerHTML = "";

    if (isMobile) {
      certificates.forEach((certificate) => {
        sliderCertificates.innerHTML += `
          <li>
            <div class="card h-100 shadow-sm overflow-hidden rounded-4 text-light">
              <img src="${certificate}" class="card-img-top" alt="Certificate Image"
                   style="height: 200px; object-fit: cover; width: 100%;">
            </div>
          </li>
        `;
      });
    } else {
      certificates.forEach((certificate) => {
        certificateContainer.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm overflow-hidden rounded-4 text-light">
              <img src="${certificate}" class="card-img-top" alt="Certificate Image"
                   style="height: 200px; object-fit: cover; width: 100%;">
            </div>
          </div>
        `;
      });
    }
  }

  // Initial render
  renderCertificates();

  // Re-render on window resize
  window.addEventListener("resize", renderCertificates);