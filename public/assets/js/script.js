$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    //Take the tag section and calculate the scroll with padding at the top of the section

    let tagSection = document.getElementsByTagName("section")[0];
    let paddingSection = parseFloat(getComputedStyle(tagSection).paddingTop);
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - paddingSection,
      },
      500,
      "linear"
    );
  });
});

// We have a pre-loader before mounting the page
document.addEventListener("DOMContentLoaded", async function () {
  dropdownLang();

  // Run the animation
  checkAnimation();

  updateVisitCounter();

  // Get the selected language from localStorage
  var selectedLanguage = localStorage.getItem("selectedLanguage");

  // If the selectedLanguage is null (meaning it's the first time visiting the page),
  // set it to a default value ("it")
  if (!selectedLanguage) {
    selectedLanguage = "it";
  }
  localStorage.setItem("selectedLanguage", selectedLanguage);

  // Request project data and store it in projects
  projects = await fetchData("projects");

  showProjects(selectedLanguage);

  experience = await fetchData("experience");
  showExperience(selectedLanguage);

  filterLang(selectedLanguage);

  skills = await fetchData("skills");
  showSkills(skills);

  // Disable the pre-loader when loading is complete
  document.getElementById("loader-container").style.display = "none";
});

// Dropdown Language
function dropdownLang() {
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("click", function () {
      this.classList.toggle("open");
      var languageDropdown = document.getElementById("language");
      if (this.classList.contains("open")) {
        languageDropdown.style.display = "block";
      } else {
        languageDropdown.style.display = "none";
      }
    });
  });
}

// Set visibilitychange
document.addEventListener("visibilitychange", function () {
  var selectedLanguage = localStorage.getItem("selectedLanguage");
  if (document.visibilityState === "visible") {
    visible(selectedLanguage);
  } else if (document.visibilityState === "hidden") {
    hidden(selectedLanguage);
  }
});

function visible(selectedLanguage) {
  let favElem = document.getElementById("favicon");
  if (selectedLanguage === "it") {
    document.title = "Portfolio | Pasquale Cicinelli";
  } else if (selectedLanguage === "en") {
    document.title = "Pasquale's Cicinelli | Portfolio";
  }
  favElem.href = "./assets/images/favicon.png";
}

function hidden(selectedLanguage) {
  let favElem = document.getElementById("favicon");
  if (selectedLanguage === "it") {
    document.title = "Torna indietro al Portfolio";
  } else if (selectedLanguage === "en") {
    document.title = "Go back to the Portfolio";
  }
  favElem.href = "./assets/images/favhand.png";
}

//Set Visit
function updateVisitCounter() {
  const visitCounters = document.querySelectorAll(".visit-counter");

  let visits = localStorage.getItem("visitCount") || 0;

  // Converte il valore in un intero decimale
  visits = parseInt(visits, 10);

  // Controlla se l'utente ha già visitato il sito
  let isFirstVisit = !localStorage.getItem("visited");

  if (isFirstVisit) {
    localStorage.setItem("visited", true);
    visits++;
    localStorage.setItem("visitCount", visits);
  }
  // Aggiorno il valore del contatore con l'animazione
  visitCounters.forEach((counter) => {
    const counterValue = counter.querySelector(".counter-value");
    animateCounter(counterValue, visits, 2000);
  });
}

// Animate visit counter
function animateCounter(element, finalValue, duration) {
  const stepTime = Math.floor(duration / 100); // Durata per ogni passo da 0 a 100
  let current = 0;

  const timer = setInterval(() => {
    if (current <= 100) {
      element.textContent = current;
      element.style.transform = "scale(1.2)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 50);
      current++;
    } else {
      clearInterval(timer);
      element.textContent = finalValue;
      element.style.transform = "scale(1.2)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 50);
    }
  }, stepTime);
}

// <!-- typed js effect starts for It and En-->
var typed = new Typed(".typing-text", {
  strings: ["Frontend development", "Backend development", "Web development"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 25,
  backDelay: 500,
});

// <!-- typed js effect ends -->

// Function to check if an element is visible and activate animation
function isVisibleScroll(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* Function that takes the animation from "data-animation"
   and adds the class for the animation */
function checkAnimation() {
  var animationElements = document.querySelectorAll("[data-animation]");
  animationElements.forEach(function (element) {
    var attrAnimation = element.getAttribute("data-animation");
    var classAnimation = "animation-" + attrAnimation;
    if (isVisibleScroll(element)) {
      element.classList.add(classAnimation);
    } else {
      element.classList.remove(classAnimation);
    }
  });
}

// Add a listener for the scroll event
window.addEventListener("scroll", checkAnimation);

// Start language IT
// document
//   .querySelectorAll('[data-lang="en"]')
//   .forEach((element) => (element.style.display = "none"));
document.querySelector("#language").addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    const filterValue = event.target.getAttribute("data-filter");
    filterLang(filterValue);
  }
});

// Filter language
function filterLang(filterValue) {
  var elementsIt = document.querySelectorAll('[data-lang="it"]');
  var elementsEn = document.querySelectorAll('[data-lang="en"]');
  if (filterValue === "it") {
    elementsIt.forEach(function (element) {
      element.style.display = "";
      element.style.opacity = 1;
    });
    elementsEn.forEach(function (element) {
      element.style.display = "none";
      element.style.opacity = 0;
    });
  } else if (filterValue === "en") {
    elementsIt.forEach(function (element) {
      element.style.display = "none";
      element.style.opacity = 0;
    });
    elementsEn.forEach(function (element) {
      element.style.display = "";
      element.style.opacity = 1;
    });
  }
  showProjects(filterValue);
  showExperience(filterValue);

  // Sets the value of filterValue in localStorage
  localStorage.setItem("selectedLanguage", filterValue);

  // see if the value is visible or hidden and pass filterValue
  if (document.visibilityState === "visible") {
    visible(filterValue);
  } else if (document.visibilityState === "hidden") {
    hidden(filterValue);
  }
}

async function fetchData(type = "skills") {
  let response;
  if (type === "skills") {
    response = await fetch("skills.json");
  } else if (type === "projects") {
    response = await fetch("./projects/projects.json");
  } else if (type === "experience") {
    response = await fetch("./experience/experience.json");
  }
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill: ${skill.name}" />
                <span>${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "end",
    distance: "40px",
    duration: 1000,
    reset: true,
  });
  /* SCROLL SKILLS */
  srtop.reveal(".skills .container .bar", {
    interval: 150,
    beforeReveal: (domEl) => {
      domEl.style.opacity = 1;
      domEl.style.transform = "translateY(0)";
    },
  });
}

function showProjects(currentLanguage) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 8)
    .filter((project) => project.category != "android")
    .forEach((project) => {
      projectHTML += `
        <div class="box tilt">
      <img draggable="false"
       src="./assets/images/projects/${project.image}.png" 
       alt="project: ${project.name}" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc[currentLanguage]}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn ${
        project.links.view ? "" : "disabled"
      }"
       target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${
              project.links.code
            }" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { interval: 200 });
  // });
}

function showExperience(currentLanguage) {
  let experienceContainer = document.querySelector("#experience .timeline");
  let experienceHTML = "";
  let isRight = true;

  experience.forEach((experience) => {
    if (experience.show) {
      experienceHTML += `
    <div class="container ${isRight ? "right" : "left"}">
  <div class="content">
    <div class="tag">
    <h2>${experience.company}</h2>
    </div>
    <div class="desc">
      <h3>${
        experience.type
          ? experience.type[currentLanguage] || experience.type
          : ""
      }</h3>
      <p>${experience.desc[currentLanguage]}</p>
       <span> ${experience.place} ${
        experience.data
          ? experience.data[currentLanguage] || experience.data
          : ""
      }</span>
      </div>
  </div>
</div>
`;
      isRight = !isRight; // Change the side for the next iteration
    }
  });
  experienceContainer.innerHTML = experienceHTML;

  /* SCROLL EXPERIENCE */
  srtop.reveal(".experience .timeline", { delay: 400 });
  srtop.reveal(".experience .timeline .container", { interval: 400 });
}

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.key == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.key == "U".charCodeAt(0)) {
    return false;
  }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
// srtop.reveal(".home .twitter", { interval: 1000 });
// srtop.reveal(".home .telegram", { interval: 600 });
// srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL SKILLS */
srtop.reveal(".skills .container", { interval: 200 });
// srtop.reveal(".skills .container .bar", { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL PROJECTS */
// srtop.reveal(".work .box", { interval: 200 });

/* SCROLL EXPERIENCE */
// srtop.reveal(".experience .timeline", { delay: 400 });
// srtop.reveal(".experience .timeline .container", { interval: 400 });
