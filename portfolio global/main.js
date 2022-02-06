
(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", closeNavMenu);
    
    function showNavMenu(){
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }
    
    function closeNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },500)
    }

    function bodyScrollingToggle() {
        document.body.classList.toggle("hidden-scrolling")
    }

    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                
                if(navMenu.classList.contains("open")){
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    closeNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })

})();


(() =>{
    const filtreContainer = document.querySelector(".filtre-projet"),
    projetItemsContainer = document.querySelector(".portfolio-items"),
    projetItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".projet-popup"),
    closeBtn = popup.querySelector(".pp-close"),
    projetDetailsContainer = popup.querySelector(".pp-details"),
    projetDetailsBtn = popup.querySelector(".pp-projet-details-btn");

    let itemIndex, slideIndex, screenshots;

    filtreContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filtre-item") &&
         !event.target.classList.contains("active")){
            filtreContainer.querySelector(".active").classList.remove("outer-shadow","active");
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-target");
            projetItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    projetItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = projetItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("src");
            screenshots = screenshots.split(",");
            slideIndex = 0;
            popupToggle();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projetDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }     
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function bodyScrollingToggle() {
        document.body.classList.toggle("hidden-scrolling")
    }

    function popupDetails(){
        if(!projetItems[itemIndex].querySelector(".portfolio-item-details")){
            projetDetailsBtn.style.dysplay="none";
            return;
        }
        projetDetailsBtn.style.dysplay="block";
        const details = projetItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-projet-details").innerHTML = details;
        const title = projetItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = projetItems[itemIndex].getAttribute("data-category");
        console.log(category);
        popup.querySelector(".pp-projet-categorie").innerHTML = category.split("-").join(" ");
    }
    
    projetDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projetDetailsContainer.classList.contains("active")){
            projetDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projetDetailsBtn.querySelector("i").classList.add("fa-plus");
            projetDetailsContainer.classList.remove("active");
            projetDetailsContainer.style.maxHeight = 0 + "px";
        }else{
            projetDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projetDetailsBtn.querySelector("i").classList.add("fa-minus");
            projetDetailsContainer.classList.add("active");
            projetDetailsContainer.style.maxHeight = projetDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projetDetailsContainer.offsetTop);
        }
    }
})();

(() =>{

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})();


const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () =>{
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})

window.addEventListener("load", () =>{
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.add("fa-sun");
    }else{
        dayNight.querySelector("i").classList.add("fa-moon");
    }
})