window.addEventListener('click', function(e){
	if(!this.document.getElementById("navButton").contains(e.target) && navOpen) {
		menuIconAnim(document.getElementById("navButton"));
	}
});

function menuIconAnim(x) {
	x.classList.toggle("change");
	openNav();
}

let navOpen = false;
let coll = document.getElementsByClassName("collapsible");
for(let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
		let content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}

let sidenav = document.getElementById("sidenav");
for (const navBtn of sidenav.children) {
	navBtn.onclick = function() {
		for (const visibleDiv of document.getElementsByClassName("visible")){
			console.log(`Visible dev${visibleDiv}`);
			visibleDiv.classList.toggle("visible");
			visibleDiv.classList.toggle("invisible");
		}
		let newVis = document.getElementById(navBtn.innerHTML.toLowerCase());
		newVis.classList.remove("invisible");
		newVis.classList.add("visible");
	}
}

function openNav() {
	if (navOpen) {
		document.getElementById("sidenav").style.width = "0";
		navOpen = false;
	} else {
		document.getElementById("sidenav").style.width = "250px";
		navOpen = true;
	}
}

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

const minOpacity = 0.5;

let header = document.querySelector(".taskbar"); // Select the .taskbar element

// Function to handle scrolling and opacity change
function handleScroll() {
  if (!navOpen) {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let opacity = 1 - scrollTop / 500;

    // Ensure opacity stays within the range [0, 1]
    opacity = Math.min(1, Math.max(minOpacity, opacity));

    // Set the opacity of the taskbar
    header.style.opacity = opacity;
  }
}

// Add a scroll event listener to handle scrolling
window.addEventListener("scroll", handleScroll);

// Add a hover event listener to restore full opacity on hover
header.addEventListener("mouseenter", function () {
  if (!navOpen) {
    header.style.opacity = 1;
  }
});

// Add a mouseleave event listener to reset opacity after hover
header.addEventListener("mouseleave", function () {
  if (!navOpen) {
    handleScroll(); // Call handleScroll to restore fading effect
  }
});