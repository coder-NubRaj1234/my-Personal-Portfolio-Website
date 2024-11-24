import { formHeightWidthSet } from "./contact.js"
import { liElm, navAceElm, sideBar } from "./header.js"



//whine the user open the mobile line bar stop scrool..
let currScrolPosi = "";
let stopScroll = false;













//add Anamation in page......
const animationElements = Array.from(document.querySelectorAll(".hiddenClass , .text-hidden , .text-opacity-slow , .defult-input-size , .defult-text-area-size"));


const obServer = new IntersectionObserver((enteryElms) => {
    enteryElms.forEach(function (entryElm) {

        if (entryElm.isIntersecting) {
            if (entryElm.target.classList.contains("hiddenClass")) {
                entryElm.target.classList.add("visible");
            };
            if (entryElm.target.classList.contains("text-opacity-slow")) {
                entryElm.target.classList.remove("text-opacity-slow");
                entryElm.target.classList.add("text-opacity-height");
            };
            if (entryElm.target.classList.contains("defult-input-size")) {
                entryElm.target.classList.add("input-size");
            };
            if (entryElm.target.classList.contains("defult-text-area-size")) {
                entryElm.target.classList.add("text-area-size");
            };

        };
    }), {
        root: null,        // Use the viewport as the root
        rootMargin: "0px", // No extra margin
        threshold: 1,     // Trigger when 10% of the element is visible
    };
});


animationElements.forEach(function (items) {
    obServer.observe(items);
});



//whine user click on bamber bar..
const hamBarBtn = document.getElementById("link-bar");
const hamberCon = document.getElementById("hamber-nav-bar");
const backLinkBtn = document.getElementById("ham-back-icon");


//hamer icon..
hamBarBtn.addEventListener("click", function (e) {
    hamberCon.classList.add("hamer-bar-visible");
    // stopScroll = true;
    // currScrolPosi = window.scrollY;
});
//cross icon..
backLinkBtn.addEventListener("click", function (e) {
    hamberCon.classList.remove("hamer-bar-visible");
    // stopScroll = false;
    // currScrolPosi = "";
});


const navLinks = document.querySelectorAll("#h-center>ul>li>a");
const sections = document.querySelectorAll("section");


let sectionDataSet = "home";


//links active color..............
function navLinksAct() {
    navAceElm.forEach(function (item) {

        if (item.dataset.scroll == sectionDataSet) {
            item.classList.add("color-red");
        } else {
            item.classList.remove("color-red");
        };
    });
};
navLinksAct();
//whine user scrool up the header show...........


const header = document.querySelector("#header");

let perviseScrool = "";
let currentScroll = "";

window.addEventListener("scrollend", function (e) {
});


perviseScrool = window.scrollY;
let isActiveHead = true;


//whine user scroll  navs links active 
window.addEventListener("scroll", function (e) {

 


    currentScroll = window.scrollY;


    if (perviseScrool > currentScroll && currentScroll > header.clientHeight && isActiveHead) {
        header.classList.add("herder-sticky");
    } else {
        header.classList.remove("herder-sticky");
    };

    perviseScrool = currentScroll;
    sections.forEach(function (item, index) {


        let itemsTopHeight = item.offsetTop;


        if (itemsTopHeight == currentScroll || currentScroll > itemsTopHeight / 1.5) {
            sectionDataSet = item.dataset.scroll;
            navLinksAct();
        };

    });
});


//whin the user click the nav links the page section select.........


function setLiElmForClickEvn() {
    liElm.forEach(function (items) {
        items.addEventListener("click", function (e) {
            isActiveHead = false;
            if (sideBar) {
                e.currentTarget.parentElement.parentElement.parentElement.classList?.remove("hamer-bar-visible")
            };

            const linkDataSet = e.currentTarget.firstElementChild.dataset.scroll;
            sections.forEach((function (item, index) {
                if (item.dataset.scroll == linkDataSet) {
                    let sectionYHeight = item.getBoundingClientRect().y;

                    if (index === 0) {
                        sectionYHeight = sectionYHeight - header.clientHeight;
                    };

                    if (sectionYHeight < 100 && sectionYHeight > 0) {
                        sectionYHeight = 0;
                    };
                    window.scrollBy({ top: sectionYHeight, behavior: 'smooth' });
                    setTimeout(() => {
                        isActiveHead = true;
                    }, 800);
                };
            }));
        });
    });
};
setLiElmForClickEvn();

export { setLiElmForClickEvn };



