//(navigation section)
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = document.querySelector(".close-nav-menu");
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", closeNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");

    }


    function closeNavMenu() {
        navMenu.classList.remove("open");
        fadeOut();

    }

    function fadeOut() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");

        }, 300)
    }
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("link-item")) {
            if (event.target.hash !== "") {
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("outershactivedow", "hover-in-shadow");
                closeNavMenu();
            }
        }
    })
})();
// (about Section-Tab)
(() => {
    const aboutsection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");
    tabsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");
            aboutsection.querySelector(".tab-content.active").classList.remove("active");
            aboutsection.querySelector(target).classList.add("active");

        }
    })
})();

function bodyscrollToggle() {
    document.body.classList.toggle("stop-scrolling");
}
// portfolios filter and Popup
(() => {
    const filterContainer = document.querySelector(".portfolios-filter"),
        portfolioItemsContainer = document.querySelector(".portfolios-items"),
        portfolioItems = document.querySelectorAll(".portfolios-item"),
        popup = document.querySelector(".portfolios-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailContainer = popup.querySelector(".pp-details"),
        ProjectDetailBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow");

            const data_target = event.target.getAttribute("data-target");
            // console.log(data_target);

            portfolioItems.forEach((item) => {
                // console.log(item.getAttribute("data-category"));
                if (data_target === item.getAttribute("data-category") || data_target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");

                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    })
    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest('.portfolios-item-inner')) {
            const portfolioItem = event.target.closest(".portfolios-item-inner").parentElement;
            //get porfolio index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolios-item-img img").getAttribute("data-screenshots");
            // console.log(screenshots);
            //convert screenshot into array
            screenshots = screenshots.split(',');
            // console.log(screenshots);

            if (screenshots.length === 1) {
                prevBtn.style.dispaly = "none";
                nextBtn.style.dispaly = "none";
            } else {
                prevBtn.style.dispaly = "block";
                nextBtn.style.dispaly = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetail();
        }

    })
    closeBtn.addEventListener("click", function() {
        popupToggle();
        if (projectDetailContainer.classList.contains("active")) {
            popupDetailToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyscrollToggle();
    }

    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // console.log(imgSrc);
        popup.querySelector(".pp-loader").classList.add("active")
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideShow();
    })
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideShow();
    })

    function popupDetail() {
        const details = portfolioItems[itemIndex].querySelector(".portfoilo-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolios-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category;
        console.log(category);
    }
    ProjectDetailBtn.addEventListener("click", () => {
        popupDetailToggle();
    })


    function popupDetailToggle() {
        if (projectDetailContainer.classList.contains("active")) {
            ProjectDetailBtn.querySelector("i").classList.remove("fa-minus");
            ProjectDetailBtn.querySelector("i").classList.add("fa-plus");
            projectDetailContainer.classList.remove("active");
            projectDetailContainer.style.maxHeight = 0 + "px";
        } else {
            ProjectDetailBtn.querySelector("i").classList.remove("fa-plus");
            ProjectDetailBtn.querySelector("i").classList.add("fa-minus");
            projectDetailContainer.classList.add("active");
            projectDetailContainer.style.maxHeight = projectDetailContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailContainer.offsetTop);
        }
    }
})();


// (() => {
//     const sections = document.querySelectorAll(".section");
//     sections.forEach((section) => {
//         if (!section.classList.contains("active")) {
//             section.classList.add("hide");
//         }
//     });
//     console.log(sections);
// })();