gsap.registerPlugin(ScrollTrigger);

window.addEventListener("scroll", () => {
    let scrollAmount = window.scrollY/10 + 100; // Get how much user has scrolled
    console.log("User scrolled:", scrollAmount);
});



setTimeout(() => {
    if (window.getComputedStyle(document.querySelector("#skills_tech")).display === "flex") {
        gsap.to("#skills_tech div", {
            left: `${window.scrollY / 10 - 50}rem`,
            duration: 5,
            scrollTrigger: {
                trigger: "#skills",
                scroller: "body",
                start: "top 0%",
                end: "top -100%",
                pin: true,
                scrub: 3,
                markers: true
            }
        });
    }
}, 1050);

setTimeout(() => {
    if (window.getComputedStyle(document.querySelector("#skills_other")).display === "flex") {
        gsap.to("#skills_other div", {
            left: `${window.scrollY / 10 } - rem`,
            duration: 5,
            scrollTrigger: {
                trigger: "#skills",
                scroller: "body",
                start: "top 0%",
                end: "top -100%",
                pin: true,
                scrub: 3,
                markers: true
            }
        });
    }
}, 1050);
