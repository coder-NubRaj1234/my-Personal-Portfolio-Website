


const homeText = document.querySelector("#home-text");
const homeH2Text = document.querySelector("#my-self>h2");


let regex = /<br>|Upadhyay/g;

window.addEventListener("load", function (e) {
    if (screen.width <= 480  && screen.width >= 320){
        let homenewText = homeText.textContent.replace(regex, "");
        homenewText = homenewText.replace("JavaScript", "JS")
        homeText.textContent = homenewText;
        homeH2Text.innerHTML = homeH2Text.innerHTML.replace(regex, "");
        console.log(newHomeText);
    };
});


//this code for > if user click on my accouns icons...............
const IconContainer = document.querySelector("#find-icons")
const Contactsicons = Array.from(IconContainer.getElementsByTagName("button"));

const findDataSetLink = {
    "fb-icon": "https://www.facebook.com",
    "github-icn": "https://github.com/coder-NubRaj1234",
    "in-icon": "https://www.linkedin.com/in/nabin-raj-upadhyay-360941330/",
};

Contactsicons.forEach(function (items) {
    items.addEventListener("click", function (e) {
        for (let key in findDataSetLink) {
            if (e.currentTarget.dataset.id == key) {
                // window.location = findDataSetLink[key];
                window.open(findDataSetLink[key], '_blank');
            };
        };
    });
});