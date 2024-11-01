
import { projectsData, projectsTypes } from "./projects-data.js";

//selects some elements here......................
const projectsContainer = document.querySelector("#project-container");

// let projectsTypes = 2;//projects types like {"Game  , simple , API ect."}
// projectsContainer.style.gridTemplateRows = `repeat(${projectsTypes.length}, 60vh)`;



projectsData.map(function (items, index) {
    createElements(items, index);//{{{***first call function***}}}calling the function which are some element like rows...........
    setProjectsItems(items);//{{{***second function call***}}}
});

//set projects items......................
async function setProjectsItems(items, index) {

    const row = document.querySelectorAll(".row");

    let projectText = items.dis;
    projectText = projectText.toLowerCase();


    await row.forEach(function (rowElm) {
        if (rowElm.dataset) {
            if (rowElm.dataset.projecttype == items.id) {
                rowElm.querySelector(".item-container").innerHTML += `
                <div class="item hiddenClass">
                            <div class="project-image" style="background:url('${items.img}') no-repeat">

                            </div>
                            <div class="projects-info">
                                <a href="${items.path}" class="project-name">${items.name}</a>
                                <h2>${projectText} </h2>
                            </div>
                          </div>
                `;
            };

        };
    });
};


function createElements(items, index) {

    if (index < projectsTypes.length) {
        const rowElement = document.createElement("div");
        const projectHeadingElm = document.createElement("div");
        const h1 = document.createElement("h1");
        const p = document.createElement("p");
        const itemsContainerElm = document.createElement("div");



        projectHeadingElm.classList.add("project-type");
        rowElement.setAttribute("data-projecttype", projectsTypes[index]);
        rowElement.classList.add("row");

        let itemId = projectsTypes[index];
        itemId = itemId.replace("-", " ");

        p.classList.add("hiddenClass");

        h1.classList.add("hiddenClass")
        h1.textContent = itemId;




        projectHeadingElm.append(h1, p);
        itemsContainerElm.classList.add("item-container");

        rowElement.append(projectHeadingElm, itemsContainerElm);
        projectsContainer.appendChild(rowElement);

    };
};

//setting the width of heading red line elment.........
const pjHeadingElm = document.querySelectorAll(".project-type")
const pjHeadingPElm = document.querySelectorAll(".project-type>p");

pjHeadingElm.forEach(function (item, index) {
    pjHeadingPElm.forEach(function (pitem, pindex) {
        if (index == pindex) {
            const width = item.clientWidth / 1.5;
            pitem.style.width = `${width}px`;
        };
    });
});


//set some css for item container............
const rowElmWidth = document.querySelector(".row");

const itmeContainer = document.querySelectorAll(".item-container")

itmeContainer.forEach(function (item, index) {
    if (item.scrollWidth === item.offsetWidth) {
        item.style.justifyContent = 'center';
    };
    
});


