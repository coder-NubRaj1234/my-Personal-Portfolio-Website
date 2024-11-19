const otpCreateBtn = document.querySelector("#create-bnt");
const otpContainer = document.querySelector(".otp-container");

const optLength = 6;


//otp generater function..............
function createOtp() {
    let otp = "";
    for (i = 1; i <= optLength; i++) {
        otp += Math.floor(Math.random() * 10);
    };
    return otp;
};
//data delete function.........................

let filterItems = "";

otpContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const deleteElm = e.target.id;
        console.log(deleteElm)

        let data = JSON.parse(localStorage.getItem("otp"))
        delete data[deleteElm - 1];

        filterItems = data.filter(function (item, index) {
            return item;
        });
        localStorage.setItem("otp", JSON.stringify(filterItems));
        localStorageCall();
    };
});


//otp generate date.........
function currentDate() {
    let data = "";

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay() + 1;
    let hours = date.getHours();
    let minutes = date.getMinutes();

    data = [year, month, day, hours, minutes];

    let fullDate = data.map(function (item) {

        if (item < 10) {
            item = `0${item}`;
        } else {
            item = item;
        };
        return item;
    });
    let returndate = fullDate.map(function (item, index) {
        let date = "";
        if (index < 3) {
            date += item + "-"
        } else if (index < 4) {
            date += item + ":";
        } else {
            date += item;
        }
        return date;

    });
    return returndate;
};
//some code for local storage ..........

function localStorageCall() {
    otpContainer.innerHTML = "";
    let localStorageData = "";
    localStorageData = JSON.parse(localStorage.getItem("otp"));

    if (localStorageData === null) {
        otpContainer.innerHTML = "";
    } else {
        otpContainer.innerHTML = "";
        localStorageData.forEach(function (item, index) {
            otpContainer.innerHTML += `
            <div class="otp-item">
                          <span>${index + 1}</span>
                          <span class="date">Create Date : ${item.planeDate}</span>
                          <span class="otp"> YOUR OTP : <i class="otpNumber">${item.otp}</i><span class="copyText">copy</span></span>
                          <i class="fa-regular fa-copy copy"></i>
                          <i class="fa-solid fa-trash delete" id="${index + 1}"></i>
                      </div>
          `;
        });
    };
};
localStorageCall();

//function for copy icon............

const copy = document.querySelectorAll(".copy");

otpContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("copy")) {

        let otpElm = e.target.previousElementSibling.firstElementChild.innerText;
        navigator.clipboard.writeText(otpElm);
        let copyTextElm = e.target.previousElementSibling.lastElementChild;
        copyTextElm.classList.add("toggle");
        setTimeout(function () {
            copyTextElm.classList.remove("toggle");
        }, 3000);
    };
});

//Event for create btn..........

otpCreateBtn.addEventListener("click", function () {

    let otpDataArray = [];
    let planeDate = "";
    let pushData = "";

    otpDataArray = JSON.parse(localStorage.getItem("otp"));

    if (otpDataArray === null) {
        otpDataArray = [];
    };
    const otp = createOtp();
    const date = currentDate();

    date.forEach(function (items) {
        planeDate += items;
    });

    //set those value in tocal storage............
    pushData = { planeDate, otp };
    otpDataArray.unshift(pushData);

    localStorage.setItem("otp", JSON.stringify(otpDataArray));
    localStorageCall();
});
