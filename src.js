gsap.registerPlugin(ScrollTrigger);

var tl = gsap.timeline();

window.addEventListener("scroll", () => {
    let scrollAmount = window.scrollY / 10 - 120; // Get how much user has scrolled
    console.log("User scrolled:", scrollAmount);
});

let splash = document.querySelector("#splash");
let outone = document.querySelector("#outone");
let techskill = document.querySelector("#skills_tech");
let otherskill = document.querySelector("#skills_other");
let tskill = document.querySelector("#tskill");
let oskill = document.querySelector("#oskill");
let forscroll = document.querySelector(".forscroll")

setTimeout(() => {
    outone.style.display = "block";
    splash.style.display = "none";
}, 5000);

setTimeout(() => {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        let currentScrollY = window.scrollY;
        
        if (currentScrollY < lastScrollY) {
            // Scrolling up - Rotate the image upwards
            gsap.to("#forbanner img", {
                rotate: "-180deg", // Adjust the angle as needed
                duration: 0.5,
                ease: "power2.out",
               
            })
            forscroll.innerHTML = "YOU SCROLLED UP";
            console.log(forscroll.innerHTML);

        } else {
            // Scrolling down - Reset rotation
            gsap.to("#forbanner img", {
                rotate: "0deg",
                duration: 0.5,
                ease: "power2.out"
              
            });
              forscroll.innerHTML = "YOU SCROLLED DOWN";
              console.log(forscroll.innerHTML);

        }
        
        lastScrollY = currentScrollY;
    });
    

        gsap.from("#pageanimate .hihead", {
            width:"0%",
            stagger: 3,
            duration:10,
            scrollTrigger: {
                trigger: "#pageanimate",
                scroller: "body",
                start: "top 5%",
                end: "50%",
                scrub:1,
                pin : true,
                markers:true
            }
        });

        // tl.from("#pageanimate #hope", {
        //     transform : `translateX(-100vw)`,
        //     duration: 2,
        //     scrollTrigger: {
        //           trigger: "#pageanimate",
        //         scroller: "body",
        //         start: "top 5%",
        //         end: "top 100%",
        //         scrub:2,
        //         pin: true,
        //         markers:true
        //     }
        // });
    
}, 10500);

setTimeout(() => {
    if (window.getComputedStyle(document.querySelector("#skills_tech")).display === "flex") {
        gsap.to("#skills_tech", {
            transform : `translateX(-60vw)`,
            duration: 5,
            scrollTrigger: {
                trigger: "#skills",
                scroller: "body",
                start: "top 0%",
                end: "top -120%",
                pin: true,
                scrub: 2,
                markers: true
            }
        });
    }
}, 10500);

// Function to apply GSAP animation
function applyGSAPAnimation() {
    // Kill previous ScrollTriggers to avoid duplicate animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (techskill.style.display === "flex") {
        gsap.to("#skills_tech", {
            transform : `translateX(-60vw)`,
            duration: 5,
            scrollTrigger: {
                trigger: "#skills",
                scroller: "body",
                start: "top 0%",
                end: "top -100%",
                pin: true,
                scrub: 2,
                markers: true
            }
        });
    }

    if (otherskill.style.display === "flex") {
        gsap.to("#skills_other", {
            transform : `translateX(-60vw)`,
            duration: 5,
            scrollTrigger: {
                trigger: "#skills",
                scroller: "body",
                start: "top 0%",
                end: "top -100%",
                pin: true,
                scrub: 2,
                markers: true
            }
        });
    }
}

// Function to apply animation without scrolling up
function activateSkillsSection() {
    // Removed the scroll behavior to prevent the page from scrolling
    // Just apply the animation without forcing scroll to the section
    setTimeout(applyGSAPAnimation, 1000); // Apply GSAP animation after a slight delay to allow elements to be visible
}

// Click events to switch between skills and reapply animation
tskill.addEventListener("click", () => {
    techskill.style.display = "flex";
    otherskill.style.display = "none";
    activateSkillsSection(); // Scroll and animate without scrolling the page up
});

oskill.addEventListener("click", () => {
    otherskill.style.display = "flex";
    techskill.style.display = "none";
    activateSkillsSection(); // Scroll and animate without scrolling the page up
});

// Apply GSAP animation initially after a delay
setTimeout(() => {
    if (techskill.style.display === "flex") {
        applyGSAPAnimation();
    }
}, 11000);



