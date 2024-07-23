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

  allExperience = await getExperience("experience");
  showExperience(selectedLanguage);

  filterLang(selectedLanguage);
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
    document.title = "Esperienze | Pasquale Cicinelli";
  } else {
    document.title = "Pasquale's Cicinelli | Experience";
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

//fetch experience start
async function getExperience() {
  const response = await fetch("experience.json");
  const data = await response.json();
  return data;
}

// Create the document in html
function showExperience(currentLanguage) {
  let experienceContainer = document.querySelector("#experience .timeline");
  let experienceHTML = "";
  let isRight = true;

  allExperience.forEach((experience) => {
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
      <p>${
        experience.desc
          ? experience.desc[currentLanguage] || experience.desc
          : ""
      }</p>
       <span> ${experience.place} ${
      experience.data ? experience.data[currentLanguage] || experience.data : ""
    }</span>
      </div>
  </div>
</div>
`;
    isRight = !isRight; // Change the side for the next iteration
  });
  experienceContainer.innerHTML = experienceHTML;

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL EXPERIENCE */
  srtop.reveal(".experience .timeline", { delay: 400 });
  srtop.reveal(".experience .timeline .container", { interval: 400 });
}

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
