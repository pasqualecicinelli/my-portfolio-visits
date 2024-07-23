$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  dropdownLang();

  // Get the selected language from localStorage
  var selectedLanguage = localStorage.getItem("selectedLanguage");

  // If the selectedLanguage is null (meaning it's the first time visiting the page),
  // set it to a default value ("it")
  if (!selectedLanguage) {
    selectedLanguage = "it";
  }
  localStorage.setItem("selectedLanguage", selectedLanguage);
  filterLang(selectedLanguage);
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
  if (selectedLanguage === "it") {
    document.title = "Ti sei perso! Pagina non trovata";
  } else if (selectedLanguage === "en") {
    document.title = "You are lost! Page not found";
  }
});

// Start language IT
document
  .querySelectorAll('[data-lang="en"]')
  .forEach((element) => (element.style.display = "none"));
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
  localStorage.setItem("selectedLanguage", filterValue);
  document.dispatchEvent(new Event("visibilitychange"));
}

// disable developer mode
document.onkeydown = function (e) {
  if (e.Code == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.Code == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.Code == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.Code == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.Code == "U".charCodeAt(0)) {
    return false;
  }
};
