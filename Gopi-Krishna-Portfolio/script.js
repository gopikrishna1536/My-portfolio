document.addEventListener("DOMContentLoaded", () => {
  // Circle progress bars
  document.querySelectorAll(".circle").forEach((circle) => {
    const percent = circle.dataset.percent;
    const canvas = circle.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const radius = canvas.width / 2 - 10;
    const lineWidth = 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background track
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#172a45";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // Progress arc
    ctx.strokeStyle = "#00ff7f";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      radius,
      -0.5 * Math.PI,
      (percent / 100) * 2 * Math.PI - 0.5 * Math.PI
    );
    ctx.stroke();
  });

  // Contact form dispatch
  const form = document.getElementById("contactForm");
  if (form) {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const messageInput = document.getElementById("contactMessage");
    const sendEmailBtn = document.getElementById("sendEmailBtn");

    function sendWhatsApp() {
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        alert("Please fill in all fields before sending.");
        return;
      }

      const text = `Hi Gopi Krishna,\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
      const waUrl = `https://api.whatsapp.com/send?phone=917799423939&text=${encodeURIComponent(text)}`;
      window.open(waUrl, "_blank");
    }

    function sendEmail() {
      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !email || !message) {
        alert("Please fill in all fields before sending.");
        return;
      }

      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:gopikrishna7223@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      sendWhatsApp();
    });

    if (sendEmailBtn) {
      sendEmailBtn.addEventListener("click", function () {
        if (form.checkValidity()) {
          sendEmail();
        } else {
          form.reportValidity();
        }
      });
    }
  }

  // Dynamic Projects (from resume)
  const projects = [
    {
      title: "AI Education And Career Advisor",
      icon: "bi-mortarboard-fill",
      tech: "React.js · FastAPI · MongoDB · Firebase · OpenAI GPT-4o",
      date: "March 2026",
      points: [
        "Engineered a full-stack AI career guidance platform using a Scikit-Learn Decision Tree Classifier with Pandas preprocessing and Joblib serialization for real-time degree recommendations.",
        "Architected a scalable three-tier system, reducing API latency by 40% with MongoDB Atlas and Firebase Authentication.",
        "Implemented an OpenAI GPT-4o powered career chatbot via FastAPI for real-time student guidance.",
        "Built an admin analytics dashboard with visualizations and CSV export; achieved 85% accuracy on degree recommendations.",
      ],
    },
    {
      title: "Medical Delivery & Prescription Management",
      icon: "bi-capsule",
      tech: "HTML · CSS · Node.js · MySQL · REST APIs",
      date: "November 2025",
      points: [
        "Pioneered a React.js-based medicine purchasing platform with real-time search, availability tracking, and order placement.",
        "Implemented prescription upload and automated document analysis to generate medicine recommendations, cutting manual search effort by 40%.",
        "Orchestrated medicine categorization and intelligent recommendations, reducing average search time by 2 minutes.",
      ],
    },
    {
      title: "AI-Driven Cybersecurity Threat Prediction Platform",
      icon: "bi-shield-lock-fill",
      tech: "Python · Machine Learning · MySQL",
      date: "September 2025",
      points: [
        "Developed a real-time cybersecurity threat prediction system, reducing false positive rates via optimized feature selection and hyperparameter tuning.",
        "Designed visualization dashboards for threat severity and anomaly patterns, identifying the three biggest causes of threats.",
        "Optimized backend API endpoints with efficient caching, improving throughput and scalability during peak traffic.",
      ],
    },
  ];

  const projectContainer = document.querySelector("#projects .row");
  if (projectContainer) {
    projectContainer.innerHTML = "";
    projects.forEach((project, index) => {
      const delay =
        index === 1
          ? " animate__delay-1s"
          : index === 2
          ? " animate__delay-2s"
          : "";
      const col = document.createElement("div");
      col.className = `col-md-4 mb-4 animate__animated animate__fadeInUp${delay}`;
      col.innerHTML = `
        <div class="project-card">
          <i class="bi ${project.icon} project-icon"></i>
          <h5>${project.title}</h5>
          <span class="tech-stack">${project.tech} &bull; ${project.date}</span>
          <ul>
            ${project.points.map((p) => `<li>${p}</li>`).join("")}
          </ul>
        </div>
      `;
      projectContainer.appendChild(col);
    });
  }

  // Auto close mobile navbar menu on link click
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navLinks && navbarCollapse) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });
  }
});
