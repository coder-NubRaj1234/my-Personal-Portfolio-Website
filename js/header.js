import { clearInputValue, formHeightWidthSet } from "./contact.js";
import { setLiElmForClickEvn } from "./index.js";


const hairBtn = document.querySelector("#hire-me");


const hairFormAmiElm = document.querySelectorAll(".hair-lables , .hair-inputs , .hair-textarea , .hair-bths");

//whine user click on hair Button some Animations Apply.......


// Hair form  Animation.....

const hairFormObsiser = new IntersectionObserver((enteryElms) => {
    enteryElms.forEach(function (elemetns) {
        if (elemetns.isIntersecting) {

            if (elemetns.target.classList.contains("hair-lables")) {
                elemetns.target.classList.add("hair-lables-opacity");
            };
            if (elemetns.target.classList.contains("hair-inputs")) {
                elemetns.target.classList.add("hair-input-aim");
                elemetns.target.classList.add("hair-lables-opacity");
            };
            if (elemetns.target.classList.contains("hair-textarea")) {
                elemetns.target.classList.add("hair-textarea-aim");
                elemetns.target.classList.add("hair-lables-opacity");
            };
            if (elemetns.target.classList.contains("hair-bths")) {
                elemetns.target.classList.add("hair-fome-button-trans");
            };
        } else {
            elemetns.target.classList.remove("hair-lables-opacity");
            elemetns.target.classList.remove("hair-textarea-aim");
            elemetns.target.classList.remove("hair-input-aim");
            elemetns.target.classList.remove("hair-lables-opacity");
            elemetns.target.classList.remove("hair-fome-button-trans");
        };

    }), {
        root: null,        // Use the viewport as the root
        rootMargin: "0px", // No extra margin
        threshold: 1,     // Trigger when 10% of the element is visible
    };
});
hairFormAmiElm.forEach(function (items) {
    if (items.id !== "hair-send-btn" || items.id !== "hair-black-btn") {
        items.style.opacity = 0;
    }
    hairFormObsiser.observe(items);
});


//whine the user lick on hari button................

const body = document.querySelector(".body");
const hairForm = document.querySelector("#hair-me-container");
const form = document.querySelector("#hari-form");

let sideBar = false;
let linkWidth = "";
// some elements 
let liElm = "";
let moodIcon = "";
let navAceElm = "";

//whine wondow size change nav links elms changes..

window.addEventListener("resize", function () {
    if (sideBar = screen.width >= 320 && screen.width <= 480) {
        //whine user resize the page again set new Value.

        checkNavBar();
        setLiWidth();
        moodIconSet();
        setLiElmForClickEvn();
        body.classList.remove("mood-color");
    };
});

function checkNavBar() {
    sideBar = screen.width >= 320 && screen.width <= 480 ? true : false;

    if (sideBar) {

        liElm = Array.from(document.querySelectorAll("#links-list>ul>li"));
        navAceElm = Array.from(document.querySelectorAll("#links-list>ul>li>a"));
        moodIcon = document.querySelector("#ham-mood-icon");
        linkWidth = 0;
    } else {
        liElm = Array.from(document.querySelectorAll("#h-center>ul>li"));
        navAceElm = Array.from(document.querySelectorAll("#h-center>ul>li>a"));
        moodIcon = document.querySelector("#mood");
        linkWidth = 20;
    };
};

checkNavBar();



const inputs = form.querySelectorAll("input, #h-message");
const contactFormElm = document.querySelectorAll("#form input , textarea")

const bodychildrens = Array.from(document.querySelectorAll("header , section , footer"));

//whine the window load the inputs value null.........
window.addEventListener('load', function () {
    inputs.forEach(function (item) {
        item.value = "";
    });
    contactFormElm.forEach(function (items) {
        items.value = "";
    });
});

//is form is none after black display......
hairBtn.addEventListener("click", function (e) {
    hairForm.classList.toggle("from-display-visible");
    hairForm.classList.add("form-show");

    hairForm.classList.add("opacity");



    bodychildrens.forEach(function (items) {
        items.classList.add("low-opacity");
        items.classList.remove("hi-opacity");
    });
});

function setLiWidth() {

    liElm.forEach(function liWidthSet(items, index) {
        if (items.clientWidth > 70) {
            items.style.minWidth = `${items.clientWidth + linkWidth}px`;
        };

        //this code for whine user hover in links............


        items.addEventListener("mouseover", function (e) {
            e.currentTarget.lastElementChild.classList.toggle("link-hover");

        });
        items.addEventListener("mouseout", function (e) {
            e.currentTarget.lastElementChild.classList.toggle("link-hover");
        });
    });
};
setLiWidth();
//whine the user click on from cross icons......

const crossIcon = document.querySelector("#hair-black-btn");
crossIcon.addEventListener("click", function (e) {

    e.preventDefault();

    hairFormElmReSet();

    hairForm.classList.toggle("from-display-visible");
    hairForm.classList.remove("form-show");

    //set the position of form
    hairForm.classList.toggle("form-Animation-left");
    hairForm.classList.toggle("form-Animation-right");

    bodychildrens.forEach(function (items) {
        items.classList.add("hi-opacity");
        items.classList.remove("low-opacity");
    });

    clearInputValue();
    formHeightWidthSet();
});
//funtion for whine user off the hair Form......

function hairFormElmReSet() {

    hairFormAmiElm.forEach(function (items) {
        items.classList.remove("hair-textarea-aim");
        items.classList.remove("hair-input-aim");
        items.classList.remove("hair-lables-opacity");
        items.classList.remove("hair-fome-button-trans");
    });
};

//this code for website night & day mood light mood.......................

let loaderFilePath = '/svg/white-loader.svg';
function moodIconSet() {
    moodIcon.addEventListener("click", function (e) {
        let elm = e.currentTarget.firstElementChild;
        if (elm.textContent == "light_mode") {
            elm.textContent = "dark_mode";
            loaderFilePath = "/svg/black-loader.svg";
        } else if (elm.textContent == "dark_mode") {
            elm.textContent = "light_mode";
            loaderFilePath = "/svg/white-loader.svg";
        };
        body.classList.toggle("mood-color");
    });
};

moodIconSet();



export { loaderFilePath, navAceElm, liElm, sideBar };