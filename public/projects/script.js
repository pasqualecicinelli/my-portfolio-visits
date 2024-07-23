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
  });
});

// We have a pre-loader before mounting the page
document.addEventListener("DOMContentLoaded", async function () {
  dropdownLang();

  // Get the selected language from localStorage
  var selectedLanguage = localStorage.getItem("selectedLanguage");
  localStorage.setItem("selectedLanguage", selectedLanguage);

  projects = await getProjects("projects");
  showProjects(selectedLanguage);

  filterLang(selectedLanguage);
  // Disable the pre-loader when loading is complete
  document.getElementById("loader-container").style.display = "none";
});

//Opens the language drop-down menu by clicking
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
    document.title = "Progetti | Pasquale Cicinelli";
  } else {
    document.title = "Pasquale's Cicinelli | Projects";
  }
  favElem.href = "../assets/images/favicon.png";
}

function hidden(selectedLanguage) {
  let favElem = document.getElementById("favicon");
  if (selectedLanguage === "it") {
    document.title = "Torna indietro al Portfolio";
  } else {
    document.title = "Go back to the Portfolio";
  }
  favElem.href = "../assets/images/favhand.png";
}

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

  // Sets the value of filterValue in localStorage
  localStorage.setItem("selectedLanguage", filterValue);

  // see if the value is visible or hidden and pass filterValue
  if (document.visibilityState === "visible") {
    visible(filterValue);
  } else if (document.visibilityState === "hidden") {
    hidden(filterValue);
  }
}

// fetch projects start
async function getProjects() {
  const response = await fetch("projects.json");
  const data = await response.json();
  return data;
}

// Create the document in html
function showProjects(currentLanguage) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectsHTML = "";
  projects.forEach((project) => {
    projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 320px; margin: 1rem">
      <img draggable="false"
      src="../assets/images/projects/${project.image}.png" alt="project: ${
      project.name
    }" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc[currentLanguage]}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn ${
      project.links.view ? "" : "disabled"
    }" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${
              project.links.code
            }" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>
    </div>`;
  });
  projectsContainer.innerHTML = projectsHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // vanilla tilt.js

  // <!-- tilt js effect ends -->

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "bottom",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL PROJECTS */
  srtop.reveal(".work .box", { delay: 400 });
  srtop.reveal(".work .box", { interval: 200 });
}

// We have a pre-loader before mounting the page
document.addEventListener("DOMContentLoaded", async function () {});

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
// Filter projects
document.querySelector("#filters").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const filterValue = event.target.getAttribute("data-filter");
    filterProjects(filterValue);
  }
});

function filterProjects(filterValue) {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    if (
      filterValue === "*" ||
      item.classList.contains(filterValue.replace(".", ""))
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
