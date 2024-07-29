// Click On Toggle Settings Gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin For Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

// If There's Color Item In Local Storage
if (mainColors !== null) {
  // console.log('Local Storage Is Not Empty You Can Set It On Root Now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    //Take Care type of backgroundLocalItem is String not a Bollean
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active Class From All Span
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomaizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");

let tLinks = document.querySelector(".links");

let headerSpan = document.querySelectorAll(".header-option span");

let headerLocalItem = localStorage.getItem("header_option");

if (headerLocalItem !== null) {
  headerSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (headerLocalItem === "fixed") {
    tLinks.classList.add("fi");
    tLinks.style.position = "fixed";
    document.querySelector(".header-option .yes").classList.add("active");
  } else {
    tLinks.classList.remove("fi");
    tLinks.style.position = "inherit";
    document.querySelector(".header-option .no").classList.add("active");
  }
}

toggleBtn.onclick = function (e) {
  // Stop Propagation();
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", function (e) {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");

      tLinks.classList.toggle("open");
    } else {
      // Scroll Header
      let scrollSpan = document.querySelectorAll(".header-option span");

      scrollSpan.forEach((span) => {
        span.addEventListener("click", (e) => {
          if (span.dataset.position === "move") {
            tLinks.classList.add("fi");
            tLinks.style.position = "fixed";
            localStorage.setItem("header_option", "fixed");
          } else {
            tLinks.classList.remove("fi");
            tLinks.style.position = "inherit";
            localStorage.setItem("header_option", "inherit");
          }
          handleActive(e);
        });
      });
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const alllinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(alllinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContiner = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalItem === "block") {
    bulletsContiner.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContiner.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContiner.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContiner.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  //We Use It When We Need Delete All Information In LocalStorge
  localStorage.clear();
  //That We Use It When Have Anther Information In LocalStorge We Dosen't Delete It
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();
};

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomaizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 3000);
  }
}

randomaizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Creat Popup Box
    let popupBox = document.createElement("div");

    // Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Creat Heading
      let imgHeading = document.createElement("h3");

      // Craet Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Creat The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Change Footer Color
let footerSpan = document.querySelectorAll(".footer-option span");

let footerColor = document.querySelector(".footer");

let footerLocalItem = localStorage.getItem("footer_option");

if (footerLocalItem !== null) {
  footerSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (footerLocalItem === "black") {
    footerColor.style.background = "black";
    document.querySelector(".footer-option .no").classList.add("active");
  } else {
    footerColor.style.backgroundImage =
      "linear-gradient(to right , black , var(--main-color) , black)";
    document.querySelector(".footer-option .yes").classList.add("active");
  }
}

footerSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.background === "color") {
      footerColor.style.backgroundImage =
        "linear-gradient(to right , black , var(--main-color) , black)";

      localStorage.setItem(
        "footer_option",
        "linear-gradient(to right , black , var(--main-color) , black)"
      );
    } else {
      footerColor.style.background = "black";
      localStorage.setItem("footer_option", "black");
    }
    handleActive(e);
  });
});
