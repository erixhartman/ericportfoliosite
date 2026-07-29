const content = window.PORTFOLIO_CONTENT;

const $ = (selector) => document.querySelector(selector);

const el = (tag, className, html = "") => {
  const node = document.createElement(tag);

  if (className) {
    node.className = className;
  }

  node.innerHTML = html;
  return node;
};

function renderProfile() {
  $("#hero-eyebrow").textContent = content.intro.eyebrow;
  $("#hero-name").textContent = content.profile.name;
  $("#hero-title").textContent = content.profile.title;
  $("#hero-tagline").textContent = content.profile.tagline;
  $("#hero-summary").textContent = content.intro.summary;
  $("#availability").textContent = content.profile.availability;
  $("#location").textContent = content.profile.location;

  const linkedIn = $("#linkedin-button");
  linkedIn.href = content.profile.linkedin;

  if (content.profile.resumeUrl) {
    const resume = $("#resume-button");
    resume.href = content.profile.resumeUrl;
    resume.classList.remove("hidden");
  }

  const email = $("#email-link");
  email.textContent = content.profile.email;
  email.href = `mailto:${content.profile.email}`;

  if (content.profile.showPhone && content.profile.phone) {
    const phone = $("#phone-link");
    phone.textContent = content.profile.phone;
    phone.href = `tel:${content.profile.phone.replace(/[^+\d]/g, "")}`;
    phone.classList.remove("hidden");
  }
}

function renderMetrics() {
  const target = $("#metrics");

  content.metrics.forEach((item) => {
    target.appendChild(
      el(
        "div",
        "metric reveal",
        `<strong>${item.value}</strong><span>${item.label}</span>`
      )
    );
  });
}

function renderCaseStudies() {
  const target = $("#case-studies");

  content.caseStudies.forEach((item) => {
    const card = el("article", "case-card reveal");

    card.innerHTML = `
      <div class="case-top">
        <span>${item.index}</span>
        <span>${item.category}</span>
      </div>

      <h3>${item.title}</h3>

      <div class="case-section">
        <strong>Challenge</strong>
        <p>${item.challenge}</p>
      </div>

      <div class="case-section">
        <strong>Approach</strong>
        <p>${item.approach}</p>
      </div>

      <div class="case-section">
        <strong>Outcome</strong>
        <p>${item.outcome}</p>
      </div>

      ${item.note ? `<p class="case-note">${item.note}</p>` : ""}
    `;

    target.appendChild(card);
  });
}

function renderExperience() {
  const target = $("#experience-list");

  content.experience.forEach((item) => {
    const achievements = item.achievements.length
      ? `
        <ul>
          ${item.achievements
            .map((achievement) => `<li>${achievement}</li>`)
            .join("")}
        </ul>
      `
      : "";

    const productImage = item.image
      ? `
        <figure class="job-visual">
          <img
            src="${item.image}"
            alt="${item.imageAlt || `${item.company} product interface`}"
            loading="lazy"
          >
          <figcaption>${item.period}</figcaption>
        </figure>
      `
      : `<div class="job-period">${item.period}</div>`;

    const job = el("article", "job reveal");

    job.innerHTML = `
      ${productImage}

      <div class="job-identity">
        <h3 class="job-company">${item.company}</h3>
        <div class="job-role">${item.role}</div>
      </div>

      <div class="job-details">
        <p class="job-theme">${item.theme}</p>
        <p class="job-summary">${item.summary}</p>
        ${achievements}
      </div>
    `;

    target.appendChild(job);
  });
}

function renderCapabilities() {
  const target = $("#capabilities");

  content.capabilities.forEach((item) => {
    target.appendChild(el("span", "chip", item));
  });
}

function renderEducation() {
  const target = $("#education");

  content.education.forEach((item) => {
    target.appendChild(
      el(
        "article",
        "education-item",
        `<h3>${item.degree}</h3><p>${item.school}</p>`
      )
    );
  });
}

function enableReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((node) => {
    observer.observe(node);
  });
}

renderProfile();
renderMetrics();
renderCaseStudies();
renderExperience();
renderCapabilities();
renderEducation();

$("#year").textContent = new Date().getFullYear();

enableReveal();